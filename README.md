# Pi Bot Roles

The official roles and group templates for [Pi Bot](https://pibot.space) — named Bots that work on your own computer.

[中文说明](#中文说明)

## What is here

| Folder | Contents |
|---|---|
| `roles/<id>.pibot/` | One role: a single Bot (name, persona, working norms, permissions, quick prompts) and its skills |
| `groups/<id>.pibot/` | One group template: the group (members, coordinator, announcement) and its member Bots with their skills |
| `professions.json` | The welcome guide's professions and the groups and roles it recommends |
| `history.json` | Content fingerprints of earlier versions, so the app can tell an untouched Bot from one you changed |

Every package is a version 3 `.pibot` team file, unpacked into a folder: `team.json` plus `skills/<roleId>/<skillId>/{zh,en}/SKILL.md`. All user-facing text is written in both Chinese and English.

## Using them in Pi Bot

- **Browse** every role and group at [roles.pibot.space](https://roles.pibot.space) and choose **Open in Pi Bot**. The app downloads it from the official library, checks its signature and asks you before adding it.
- **Download** a `.pibot` file from the [releases](https://github.com/w01fb0ss/pibot-roles/releases) and drag it into Pi Bot. Packages from an official release show as *verified*; anything else (a fork, an edited copy) still imports, marked *unverified*, with its permissions and skills listed for you to confirm.

## Contributing

1. Change a role only under `roles/<id>.pibot/`. When a group includes that role, copy the same skill files into the group's folder.
2. Raise `role.version` (or the group's `template.version`) for every change users should be offered.
3. Run `node scripts/check.mjs` (Node 22, no dependencies). CI runs the same check.

Official releases are built, signed and published by the maintainers; the signing key never lives in this repository or its CI.

## License

[Apache License 2.0](LICENSE)

---

## 中文说明

[Pi Bot](https://pibot.space) 的官方角色和群组模板。

### 内容

| 目录 | 内容 |
|---|---|
| `roles/<id>.pibot/` | 一个角色：一个 Bot（名字、人设、工作规范、权限、快捷提问）及其技能 |
| `groups/<id>.pibot/` | 一个群组模板：群（成员、统筹、公告）和成员 Bot 及其技能 |
| `professions.json` | 欢迎向导里的职业，以及各职业推荐的群组和角色 |
| `history.json` | 历次版本的内容指纹，让应用分辨「没改过的 Bot」和「你改过的 Bot」 |

每个包都是第 3 版 `.pibot` 团队文件解开后的目录：`team.json` 加 `skills/<角色>/<技能>/{zh,en}/SKILL.md`。所有给用户看的文字都有中英文。

### 在 Pi Bot 里使用

- 在 [roles.pibot.space](https://roles.pibot.space) **浏览**全部角色和群组，点「在 Pi Bot 中打开」：应用从官方角色库下载、校验签名，确认后才添加。
- 从 [Releases](https://github.com/w01fb0ss/pibot-roles/releases) **下载** `.pibot` 文件，拖进 Pi Bot。官方发布的包显示「官方已验证」；其他来源（分叉、改过的副本）也能导入，但显示「未验证来源」，并列出权限和技能让你确认。

### 参与改进

1. 改角色只改 `roles/<id>.pibot/`；有群组包含这个角色时，把相同的技能文件复制进群组目录。
2. 每个需要推送给用户的改动都要提高 `role.version`（群组是 `template.version`）。
3. 运行 `node scripts/check.mjs`（Node 22，无依赖）；CI 跑同样的检查。

正式版本由维护者构建、签名并发布；签名私钥不在这个仓库，也不在 CI 里。

### 许可证

[Apache License 2.0](LICENSE)
