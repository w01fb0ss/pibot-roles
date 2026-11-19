import { randomUUID } from "node:crypto";
import {
  closeSync,
  constants,
  fstatSync,
  lstatSync,
  openSync,
  readSync,
  realpathSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";

export const MAX_PAGES = 200;
export const MAX_JSON = 1024 * 1024;
export const MAX_IMAGE = 8 * 1024 * 1024;
const png = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

export function fail(code: string): never {
  throw new Error(code);
}
export function missing(error: unknown) {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}
export function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) fail("invalid_data");
  return value as Record<string, unknown>;
}
export function integer(value: unknown, min: number, max: number): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < min || value > max)
    fail("invalid_number");
  return value;
}
export function directory(path: string) {
  if (realpathSync(path) !== path || !lstatSync(path).isDirectory()) fail("unsafe_directory");
  return path;
}

export function openBounded(path: string, max: number) {
  directory(dirname(path));
  const stat = lstatSync(path);
  if (!stat.isFile() || stat.nlink !== 1 || stat.size < 1 || stat.size > max) fail("invalid_file");
  const fd = openSync(path, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
  try {
    const live = fstatSync(fd);
    if (
      !live.isFile() ||
      live.nlink !== 1 ||
      live.dev !== stat.dev ||
      live.ino !== stat.ino ||
      live.size !== stat.size
    )
      fail("file_changed");
    directory(dirname(path));
    return { fd, size: live.size };
  } catch (error) {
    closeSync(fd);
    throw error;
  }
}

export function readBounded(path: string, max: number) {
  const { fd, size } = openBounded(path, max);
  try {
    const bytes = Buffer.alloc(size);
    for (let offset = 0; offset < size; ) {
      const n = readSync(fd, bytes, offset, size - offset, offset);
      if (!n) fail("file_changed");
      offset += n;
    }
    return bytes;
  } finally {
    closeSync(fd);
  }
}

export function openImage(root: string, version: number, page: number) {
  directory(root);
  const path = join(root, `v${version}`, `page-${page}.png`);
  const file = openBounded(path, MAX_IMAGE);
  try {
    const header = Buffer.alloc(24);
    if (
      readSync(file.fd, header, 0, header.length, 0) !== header.length ||
      !header.subarray(0, 8).equals(png) ||
      header.toString("ascii", 12, 16) !== "IHDR" ||
      header.readUInt32BE(8) !== 13 ||
      !header.readUInt32BE(16) ||
      !header.readUInt32BE(20) ||
      header.readUInt32BE(16) * header.readUInt32BE(20) > 20_000_000
    )
      fail("invalid_png");
    return file;
  } catch (error) {
    closeSync(file.fd);
    throw error;
  }
}

export function reviewRoot(output: string) {
  const canonical = realpathSync(resolve(output));
  return directory(join(canonical, "审阅"));
}

export function readJson(path: string): unknown {
  return JSON.parse(readBounded(path, MAX_JSON).toString("utf8"));
}

/** The server owns one loopback port; publish only complete snapshots inside its review directory. */
export function saveJson(root: string, value: unknown) {
  directory(root);
  const data = Buffer.from(`${JSON.stringify(value, null, 2)}\n`);
  if (data.length > MAX_JSON) fail("comments_limit");
  const stage = join(root, `.comments-${randomUUID()}.tmp`);
  const fd = openSync(stage, "wx", 0o600);
  let published = false;
  try {
    try {
      writeFileSync(fd, data);
      // Node 26 forbids fsync under --permission. Closing before rename prevents partial reads.
    } finally {
      closeSync(fd);
    }
    directory(root);
    renameSync(stage, join(root, "comments.json"));
    published = true;
  } finally {
    if (!published) unlinkSync(stage);
  }
}
