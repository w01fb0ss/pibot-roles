// Validates every role and group package with Node's standard library only.
// Usage: node scripts/check.mjs   (exit code 1 on any problem)
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const problems = [];
const fail = (where, message) => problems.push(`${where}: ${message}`);
const bilingual = (value) =>
  value && typeof value === "object" && typeof value.zh === "string" && value.zh.trim() &&
  typeof value.en === "string" && value.en.trim();
const hash = (file) => createHash("sha256").update(readFileSync(file)).digest("hex");
const files = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path).map((f) => join(name, f)) : [name];
  });

function checkBot(where, bot, pack) {
  for (const field of ["name", "description", "systemPrompt"])
    if (!bilingual(bot[field])) fail(where, `bot ${bot.ref}: ${field} needs zh and en`);
  if (bot.ref !== bot.role?.id) fail(where, `bot ref ${bot.ref} must equal role.id ${bot.role?.id}`);
  if (!Number.isInteger(bot.role?.version) || bot.role.version < 1)
    fail(where, `bot ${bot.ref}: role.version must be a positive integer`);
  if (bot.model !== null) fail(where, `bot ${bot.ref}: model must be null`);
  for (const skill of bot.skills ?? [])
    for (const lang of ["zh", "en"])
      if (!existsSync(join(pack, "skills", bot.ref, skill.folder, lang, "SKILL.md")))
        fail(where, `bot ${bot.ref}: skills/${bot.ref}/${skill.folder}/${lang}/SKILL.md missing`);
}

function load(kind, id) {
  const pack = join(root, kind, `${id}.pibot`);
  const where = `${kind}/${id}.pibot`;
  let team;
  try {
    team = JSON.parse(readFileSync(join(pack, "team.json"), "utf8"));
  } catch (error) {
    fail(where, `team.json unreadable (${error.message})`);
    return undefined;
  }
  if (team.format !== "pibot-team" || team.version !== 3) fail(where, "format must be pibot-team version 3");
  for (const bot of team.bots ?? []) checkBot(where, bot, pack);
  return { pack, where, team };
}

const roles = new Map();
for (const dir of readdirSync(join(root, "roles")).filter((d) => d.endsWith(".pibot"))) {
  const id = dir.slice(0, -".pibot".length);
  const role = load("roles", id);
  if (!role) continue;
  if (role.team.bots?.length !== 1 || role.team.groups?.length) fail(role.where, "a role has exactly one Bot and no group");
  if (role.team.bots?.[0]?.ref !== id) fail(role.where, "the Bot's ref must equal the folder name");
  roles.set(id, role);
}
for (const dir of readdirSync(join(root, "groups")).filter((d) => d.endsWith(".pibot"))) {
  const id = dir.slice(0, -".pibot".length);
  const group = load("groups", id);
  if (!group) continue;
  const [definition] = group.team.groups ?? [];
  if (group.team.groups?.length !== 1) fail(group.where, "a group package has exactly one group");
  if (!definition) continue;
  if (!bilingual(definition.name) || !bilingual(definition.announcement))
    fail(group.where, "group name and announcement need zh and en");
  if (definition.template?.id !== id) fail(group.where, "template.id must equal the folder name");
  const members = definition.members ?? [];
  if (members.length < 2 || members.length > 6) fail(group.where, "a group has 2 to 6 members");
  if (!members.includes(definition.coordinator)) fail(group.where, "the coordinator must be a member");
  for (const bot of group.team.bots ?? []) {
    const role = roles.get(bot.ref);
    if (!role) {
      fail(group.where, `member ${bot.ref} has no role in roles/`);
      continue;
    }
    // A member's skill files are copies of its role's files.
    for (const skill of bot.skills ?? []) {
      const own = join(group.pack, "skills", bot.ref, skill.folder);
      const source = join(role.pack, "skills", bot.ref, skill.folder);
      if (!existsSync(own) || !existsSync(source)) continue;
      for (const file of files(source))
        if (!existsSync(join(own, file)) || hash(join(own, file)) !== hash(join(source, file)))
          fail(group.where, `skills/${bot.ref}/${skill.folder}/${file} differs from roles/${bot.ref}.pibot`);
    }
  }
}
if (problems.length) {
  console.error(problems.join("\n"));
  console.error(`\n${problems.length} problem(s)`);
  process.exit(1);
}
console.log(`ok: ${roles.size} roles, ${readdirSync(join(root, "groups")).length} groups`);
