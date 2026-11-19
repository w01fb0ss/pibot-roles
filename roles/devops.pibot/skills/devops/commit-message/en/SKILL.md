---
name: commit-message
description: "Use when writing a Git commit message: match the project's style and explain what changed and why."
metadata:
  pibot-name: "Commit message"
  pibot-params: "[{\"name\":\"summary\",\"description\":\"What this change does\",\"default\":\"summarise the current diff\"}]"
---

# Commit message

Change: {summary}

## Steps
1. Check recent history (git log --oneline -n 20) and match its language, prefixes and format (e.g. `feat:`, `fix(scope):`).
2. Read `git diff --staged` (or `git diff` if nothing is staged) and confirm the change does one thing; if several things are mixed, suggest splitting the commit.
3. Subject: one line, about 50 characters, imperative mood ("Add…", "Fix…"), no trailing period.
4. Body (when the change is not self-explanatory): after a blank line, explain why and what the impact is, wrapping at about 72 characters.
5. For bug fixes, include how to reproduce and the cause; reference related issue numbers.
6. Never include secrets, internal URLs, personal data or local paths.

## Template

```
<prefix>: <what it does>

<Why: the problem or need behind the change>
<How: the key idea, not a line-by-line retelling>
<Impact: compatibility, migrations, things to watch>
```

## Notes
- Git operations follow current permissions. Drafting a commit message does not authorize committing, merging, or pushing.
- Unless the user asks, do not commit, push or rewrite history yourself; just propose the message.

## Scope

Use supplied information first; user requirements on count, format, and scope override this default template. Current capabilities govern permissions, primary/read-only workplaces, Plan mode, and budget; do not switch tools to bypass a refusal. This skill supplies a method, not authority to write, run commands, pay, send, commit, or publish. Identify unperformed or unverified steps.
