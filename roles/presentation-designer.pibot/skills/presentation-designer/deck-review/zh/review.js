const words = {
  zh: {
    title: "幻灯片审阅",
    version: "版本",
    compare: "对比版本",
    off: "不对比",
    page: "第 {n} 页",
    hint: "在图上点击定位，或写整页批注。",
    history: "历史版本 · 批注处理结果",
    whole: "写整页批注",
    submit: "提交批注给小演",
    remove: "删除",
    note: "批注",
    draft: "草稿",
    submitted: "已提交",
    changed: "已改",
    not_changed: "没改",
    saving: "正在保存…",
    saved: "已保存",
    failed: "没有保存。请重试，或先复制批注文字。",
    stale: "另一标签页修改了批注。请先复制未保存的文字，再刷新。",
    done: "批注已提交。若对话没有自动接续，请回原话题让小演继续。",
    unavailable: "暂时无法加载审阅页。",
    missing: "这页图片不可用。",
    retry: "重试保存",
  },
  en: {
    title: "Deck review",
    version: "Version",
    compare: "Compare with",
    off: "Off",
    page: "Slide {n}",
    hint: "Click the slide to pin a note, or write a note for the whole slide.",
    history: "Earlier version · Annotation results",
    whole: "Add slide note",
    submit: "Submit notes to Dex",
    remove: "Delete",
    note: "Annotation",
    draft: "Draft",
    submitted: "Submitted",
    changed: "Changed",
    not_changed: "Not changed",
    saving: "Saving…",
    saved: "Saved",
    failed: "Not saved. Retry or copy your notes first.",
    stale: "Another tab updated the notes. Copy any unsaved text before refreshing.",
    done: "Notes submitted. If the conversation does not continue automatically, ask Dex to resume in the original topic.",
    unavailable: "The review is unavailable.",
    missing: "This slide image is unavailable.",
    retry: "Retry save",
  },
};

const $ = (id) => document.getElementById(id);
const element = (tag, value = "") => {
  const node = document.createElement(tag);
  node.textContent = value;
  return node;
};
const option = (value, label) => {
  const item = element("option", label);
  item.value = value;
  return item;
};
const imageUrl = (v, p) => `/image/${v}/${p}`;
let copy = words[navigator.language.startsWith("zh") ? "zh" : "en"];
let state;
let session;
let drafts;
let page = 1;
let version;
let compared = 0;
let dirty = 0;
let saved = 0;
let timer;
let sending;
let submitting = false;
let conflict = false;

const latest = () => state.versions.at(-1);
const batch = () => state.versions[version - 1];
const editable = () =>
  state.status === "draft" && version === latest().version && !submitting && !conflict;
const pageName = (n) => copy.page.replace("{n}", String(n));
const status = (message) => {
  $("status").textContent = message;
};
function controls() {
  $("whole").disabled = !editable() || drafts.length >= 160;
  $("submit").disabled = !editable() || !drafts.some((note) => note.text.trim());
  $("retry").hidden = conflict || dirty === saved || Boolean(sending) || submitting;
}

async function post(route, data) {
  const res = await fetch(route, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...data, session }),
  });
  if (!res.ok) throw new Error(res.status === 409 ? "stale" : "failed");
  return res.json();
}

async function flush() {
  clearTimeout(timer);
  if (sending) {
    await sending;
    return flush();
  }
  if (conflict) throw new Error("stale");
  if (saved === dirty) return;
  const snapshot = dirty;
  const notes = drafts.filter((note) => note.text.trim());
  status(copy.saving);
  sending = post("/comments", { revision: state.revision, notes });
  controls();
  try {
    state = await sending;
    saved = snapshot;
    status(copy.saved);
  } catch (error) {
    conflict = error.message === "stale";
    status(conflict ? copy.stale : copy.failed);
    throw error;
  } finally {
    sending = undefined;
    controls();
  }
  if (saved !== dirty) return flush();
}

function changed() {
  dirty++;
  controls();
  clearTimeout(timer);
  timer = setTimeout(() => void flush().catch(() => {}), 250);
}

function notes() {
  const shown = (version === latest().version ? drafts : batch().notes).filter(
    (note) => note.page === page,
  );
  $("pins").replaceChildren();
  $("notes").replaceChildren();
  shown.forEach((note, index) => {
    const label = `${index + 1}. ${copy.note}`;
    const item = element("li");
    const id = `note-${note.id}`;
    const heading = element("label", copy.note);
    heading.htmlFor = id;
    item.append(heading);
    if (editable()) {
      const field = element("textarea");
      field.id = id;
      field.maxLength = 2000;
      field.value = note.text;
      field.addEventListener("input", () => {
        note.text = field.value;
        changed();
      });
      const remove = element("button", copy.remove);
      remove.addEventListener("click", () => {
        drafts = drafts.filter((entry) => entry.id !== note.id);
        changed();
        notes();
      });
      item.append(field, remove);
    } else {
      const content = element("p", note.text);
      content.id = id;
      content.tabIndex = -1;
      content.className = "note-text";
      item.append(
        content,
        element("span", copy[note.status] + (note.reason ? ` · ${note.reason}` : "")),
      );
    }
    if (note.x !== null) {
      const pin = element("button", String(index + 1));
      pin.type = "button";
      pin.className = "pin";
      pin.style.left = `${note.x}%`;
      pin.style.top = `${note.y}%`;
      pin.setAttribute("aria-label", label);
      pin.addEventListener("click", () => $(id)?.focus());
      $("pins").append(pin);
    }
    $("notes").append(item);
  });
}

function slide() {
  $("page").textContent = pageName(page);
  $("image").alt = pageName(page);
  $("image").src = imageUrl(version, page);
  $("comparison").hidden = !compared;
  if (compared) {
    $("comparison").alt = `v${compared} · ${pageName(page)}`;
    $("comparison").src = imageUrl(compared, page);
  } else $("comparison").removeAttribute("src");
  $("hint").textContent = version === latest().version ? copy.hint : copy.history;
  for (const button of $("thumbnails").children) {
    if (Number(button.dataset.page) === page) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  }
  updateEditor();
}

function updateEditor() {
  $("slide").toggleAttribute("data-editable", editable());
  $("editor").hidden = version !== latest().version || state.status !== "draft";
  notes();
  controls();
}

function thumbnails() {
  $("thumbnails").replaceChildren();
  for (let p = 1; p <= batch().pages; p++) {
    const button = element("button");
    const image = element("img");
    button.dataset.page = String(p);
    image.alt = "";
    image.loading = "lazy";
    image.src = imageUrl(version, p);
    button.append(image, element("span", pageName(p)));
    button.addEventListener("click", () => {
      page = p;
      slide();
    });
    $("thumbnails").append(button);
  }
}

function add(x, y) {
  if (!editable() || drafts.length >= 160) return;
  const id = crypto.randomUUID();
  drafts.push({ id, page, x, y, text: "", status: "draft" });
  notes();
  controls();
  $(`note-${id}`)?.focus();
}

async function initialize() {
  const res = await fetch("/state");
  if (!res.ok) throw new Error("unavailable");
  const data = await res.json();
  state = data.state;
  session = data.session;
  copy = words[data.language];
  document.documentElement.lang = data.language === "zh" ? "zh-CN" : "en";
  document.title = copy.title;
  for (const [id, label] of Object.entries({
    title: copy.title,
    versionLabel: copy.version,
    compareLabel: copy.compare,
    whole: copy.whole,
    submit: copy.submit,
    retry: copy.retry,
  }))
    $(id).textContent = label;
  $("thumbnails").setAttribute("aria-label", copy.page.replace(" {n}", "").replace("{n} ", ""));
  drafts = latest().notes.map((note) => ({ ...note }));
  version = latest().version;
  const choices = state.versions.map((item) => item.version);
  $("version").replaceChildren(...choices.map((v) => option(v, `v${v}`)));
  $("compare").replaceChildren(option(0, copy.off), ...choices.map((v) => option(v, `v${v}`)));
  $("version").value = version;
  $("version").addEventListener("change", () => {
    version = Number($("version").value);
    page = Math.min(page, batch().pages);
    if (compared === version) {
      compared = 0;
      $("compare").value = "0";
    }
    thumbnails();
    slide();
  });
  $("compare").addEventListener("change", () => {
    compared = Number($("compare").value);
    if (compared === version) {
      compared = 0;
      $("compare").value = "0";
    }
    slide();
  });
  $("image").addEventListener("error", () => status(copy.missing));
  $("comparison").addEventListener("error", () => status(copy.missing));
  $("image").addEventListener("click", (event) => {
    if (!$("image").naturalWidth) return;
    const rect = $("image").getBoundingClientRect();
    const percent = (delta, size) => Math.max(0, Math.min(100, (delta / size) * 100));
    if (rect.width && rect.height)
      add(
        percent(event.clientX - rect.left, rect.width),
        percent(event.clientY - rect.top, rect.height),
      );
  });
  $("whole").addEventListener("click", () => add(null, null));
  $("retry").addEventListener("click", () => void flush().catch(() => {}));
  $("submit").addEventListener("click", async () => {
    if (!editable()) return;
    submitting = true;
    updateEditor();
    try {
      await flush();
      state = await post("/submit", { revision: state.revision });
      drafts = latest().notes;
      status(copy.done);
    } catch (error) {
      conflict = error.message === "stale";
      status(conflict ? copy.stale : copy.failed);
    } finally {
      submitting = false;
      updateEditor();
    }
  });
  addEventListener("beforeunload", (event) => {
    if (dirty !== saved) {
      event.preventDefault();
      event.returnValue = "";
    }
  });
  thumbnails();
  slide();
}
void initialize().catch(() => status(copy.unavailable));
