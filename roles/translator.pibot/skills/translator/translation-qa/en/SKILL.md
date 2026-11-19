---
name: translation-qa
description: "Use after translating and before delivering: check omissions, mistranslations, terms, numbers, formatting and naturalness."
metadata:
  pibot-name: "Translation QA"
  pibot-params: "[{\"name\":\"source\",\"description\":\"Source file or text\"},{\"name\":\"translation\",\"description\":\"Translated file or text\"}]"
---

# Translation QA

Source: {source}
Translation: {translation}

## Checks
1. **Complete**: paragraph, sentence, list item and table cell counts match; nothing missing or added.
2. **Accurate**: meaning, tone, positives / negatives, conditions and ranges ("at least", "no more than") are not reversed or skewed.
3. **Terms**: match the glossary; one rendering per term throughout.
4. **Numbers and units**: numbers, dates, amounts, units and percentages match the source, formatted for the target locale.
5. **Do-not-translate**: code, variables, placeholders (such as %s or %1$d), links and file names unchanged; placeholder count matches.
6. **Formatting**: heading levels, lists, bold, tables, Markdown and line breaks match.
7. **Natural**: reads as if written by a native speaker, without translationese (Chinese: avoid stacked 的 and passive 被; English: avoid word-for-word word order).
8. **Consistent address**: 你 / 您 and the tone of "you" are consistent; UI capitalisation rules are consistent.
9. **Length**: UI strings are not much longer than the source (buttons and labels may not fit); offer a short version when needed.

## Output
```
**Verdict**: ready / ready after fixes
**Issues**
| Location | Type | Source | Current | Suggested |
**Fixed**: (if you edited the translation directly, list the changes)
**To confirm**: …
```

## Scope

Use supplied information first; user requirements on count, format, and scope override this default template. Current capabilities govern permissions, primary/read-only workplaces, Plan mode, and budget; do not switch tools to bypass a refusal. This skill supplies a method, not authority to write, run commands, pay, send, commit, or publish. Identify unperformed or unverified steps.
