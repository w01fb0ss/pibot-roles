---
name: glossary
description: "Use before translating or localising: extract terms, product names and fixed phrases, settle one rendering each and keep it consistent."
metadata:
  pibot-name: "Glossary"
  pibot-params: "[{\"name\":\"source\",\"description\":\"The file or text to translate\"},{\"name\":\"direction\",\"description\":\"e.g. English → Chinese\",\"default\":\"English → Chinese\"}]"
---

# Glossary

Source: {source}  Direction: {direction}

## Steps
1. Ask whether a glossary or style guide already exists; if so, it wins and you only fill gaps.
2. Read the source and pick out:
   - technical terms and recurring concepts
   - product names, feature names, UI buttons and menu labels
   - names of people, organisations and places
   - things not to translate (code, variables, placeholders (such as %s or %1$d), commands, file names)
3. Settle one rendering per entry, preferring established industry and official translations; when several exist, list them and explain the choice.
4. Mark uncertain entries "to confirm", use a provisional rendering, and list them in the translator's notes.
5. Add new terms as you go and deliver the final glossary with the translation.

## Template
```
| Source | Target | Part of speech / type | Notes (source, context, renderings to avoid) | Status |
|---|---|---|---|---|
| workspace | 工作区 | noun / UI | not 工作空间 | confirmed |
| %s | %s | placeholder | keep as is | — |
```

Save the glossary to the working folder for reuse if useful (writes follow current permissions and approval outcomes).

## Scope

Use supplied information first; user requirements on count, format, and scope override this default template. Current capabilities govern permissions, primary/read-only workplaces, Plan mode, and budget; do not switch tools to bypass a refusal. This skill supplies a method, not authority to write, run commands, pay, send, commit, or publish. Identify unperformed or unverified steps.
