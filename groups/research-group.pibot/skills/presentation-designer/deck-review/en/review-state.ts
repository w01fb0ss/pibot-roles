import { join } from "node:path";
import { fail, integer, MAX_PAGES, missing, readJson, record, saveJson } from "./review-files.ts";

const MAX_NOTES = 160;
export const MAX_VERSION = 50;
type NoteStatus = "draft" | "submitted" | "changed" | "not_changed";
export type Note = {
  id: string;
  page: number;
  x: number | null;
  y: number | null;
  text: string;
  status: NoteStatus;
  reason?: string;
};
type Batch = { version: number; pages: number; notes: Note[] };
export type State = { revision: number; status: "draft" | "submitted"; versions: Batch[] };

function noteText(value: unknown, max: number) {
  if (typeof value !== "string" || !value.trim() || value.length > max || value.includes("\0"))
    fail("invalid_text");
  return value;
}

function percent(value: unknown) {
  if (value === null) return null;
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 100)
    fail("invalid_position");
  return Math.round(value * 100) / 100;
}

function parseNote(raw: unknown, pages: number, mode: "stored" | "draft"): Note {
  const { id, page, x, y, text, status, reason } = record(raw);
  if (typeof id !== "string" || !/^[a-f0-9-]{36}$/u.test(id)) fail("invalid_note_id");
  const px = percent(x);
  const py = percent(y);
  if ((px === null) !== (py === null)) fail("invalid_position");
  const base = { id, page: integer(page, 1, pages), x: px, y: py, text: noteText(text, 2000) };
  if (mode === "draft") return { ...base, status: "draft" };
  if (status === "not_changed") return { ...base, status, reason: noteText(reason, 500) };
  if (status !== "draft" && status !== "submitted" && status !== "changed") fail("invalid_status");
  return { ...base, status };
}

function notes(raw: unknown, pages: number, mode: "stored" | "draft") {
  if (!Array.isArray(raw) || raw.length > MAX_NOTES) fail("comments_limit");
  const items = raw.map((item) => parseNote(item, pages, mode));
  if (new Set(items.map((note) => note.id)).size !== items.length) fail("duplicate_note");
  return items;
}

function load(root: string): State | undefined {
  let data: unknown;
  try {
    data = readJson(join(root, "comments.json"));
  } catch (error) {
    if (missing(error)) return;
    throw error;
  }
  const { revision, status, versions } = record(data);
  if (
    (status !== "draft" && status !== "submitted") ||
    !Array.isArray(versions) ||
    !versions.length ||
    versions.length > MAX_VERSION
  )
    fail("invalid_comments");
  const batches = versions.map((raw, index) => {
    const { version, pages, notes: rawNotes } = record(raw);
    if (version !== index + 1) fail("invalid_version");
    const count = integer(pages, 1, MAX_PAGES);
    const items = notes(rawNotes, count, "stored");
    const current = index === versions.length - 1;
    if (
      items.some((item) =>
        current
          ? item.status !== status
          : item.status !== "changed" && item.status !== "not_changed",
      )
    )
      fail("invalid_status");
    if (current && status === "submitted" && !items.length) fail("invalid_status");
    return { version, pages: count, notes: items };
  });
  return { revision: integer(revision, 0, Number.MAX_SAFE_INTEGER - 1), status, versions: batches };
}

function outcomes(root: string, version: number, batch: Batch) {
  const results = readJson(join(root, `v${version}`, "results.json"));
  if (!Array.isArray(results) || results.length !== batch.notes.length) fail("invalid_results");
  const byId = new Map<string, { status: "changed" } | { status: "not_changed"; reason: string }>(
    results.map((raw) => {
      const { id, status, reason } = record(raw);
      if (typeof id !== "string") fail("invalid_results");
      if (status === "changed") return [id, { status }] as const;
      if (status === "not_changed") return [id, { status, reason: noteText(reason, 500) }] as const;
      return fail("invalid_results");
    }),
  );
  return batch.notes.map((item) => {
    const result = byId.get(item.id);
    if (!result) fail("invalid_results");
    return { ...item, ...result };
  });
}

export function begin(root: string, version: number, pages: number): State {
  const existing = load(root);
  const current = existing?.versions.at(-1);
  if (existing && current && version === current.version) {
    if (existing.status !== "draft" || pages !== current.pages) fail("version_not_editable");
    return existing;
  }
  const batch = { version, pages, notes: [] };
  if (!existing && version === 1) {
    const first: State = { revision: 0, status: "draft", versions: [batch] };
    saveJson(root, first);
    return first;
  }
  if (
    !existing ||
    !current ||
    existing.status !== "submitted" ||
    version !== current.version + 1 ||
    pages !== current.pages
  )
    fail("version_not_ready");
  const next: State = {
    revision: existing.revision + 1,
    status: "draft",
    versions: [
      ...existing.versions.slice(0, -1),
      { ...current, notes: outcomes(root, version, current) },
      batch,
    ],
  };
  saveJson(root, next);
  return next;
}

export function update(root: string, state: State, body: unknown, submit: boolean): State {
  const current = state.versions.at(-1);
  const request = record(body);
  if (!current || state.status !== "draft" || request.revision !== state.revision)
    fail("stale_revision");
  const items = submit ? current.notes : notes(request.notes, current.pages, "draft");
  if (submit && !items.length) fail("no_comments");
  const next: State = {
    revision: state.revision + 1,
    status: submit ? "submitted" : "draft",
    versions: [
      ...state.versions.slice(0, -1),
      {
        ...current,
        notes: submit ? items.map((note) => ({ ...note, status: "submitted" })) : items,
      },
    ],
  };
  saveJson(root, next);
  return next;
}
