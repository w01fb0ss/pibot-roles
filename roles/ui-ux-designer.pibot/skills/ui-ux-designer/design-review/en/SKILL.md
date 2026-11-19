---
name: design-review
description: "Use when reviewing UI designs, screenshots or prototypes: comment on task flow, hierarchy, consistency, states and accessibility."
metadata:
  pibot-name: "Design review"
  pibot-params: "[{\"name\":\"design\",\"description\":\"Screenshot, file or page\"},{\"name\":\"task\",\"description\":\"What this screen helps the user do\",\"default\":\"infer from the screen, then confirm with the user\"}]"
---

# Design review

Design: {design}
User task: {task}

## Checks
1. **Task**: can the user tell at a glance what they can do here and which button is primary? How many steps does the task take, and could it be fewer?
2. **Hierarchy**: is the most important information the most prominent? Do size, weight, colour and spacing create clear levels?
3. **Consistency**: do components, icons, tone of copy and spacing match the rest of the product?
4. **States**: are empty, loading, error, overly long content, no permission and offline designed?
5. **Feedback**: after a click, submit or save, does the user know what happened? Do destructive actions have confirmation and undo?
6. **Copy**: buttons name the action ("Save", not "OK"); messages state the problem and next step; text fits in both languages.
7. **Accessibility**: contrast, focus, keyboard, target sizes; information is not conveyed by colour alone.
8. **Themes and layout**: clear in light and dark; how it adapts to narrow screens.

## Output
```
**Overall**: a sentence or two
**Must fix**
1. Location (area / element) — problem — why — suggestion
**Should fix**
1. …
**Done well**
**States the design still needs**
```
Point at specific elements and give reasons; avoid vague "looks off" comments.

## Scope

Use supplied information first; user requirements on count, format, and scope override this default template. Current capabilities govern permissions, primary/read-only workplaces, Plan mode, and budget; do not switch tools to bypass a refusal. This skill supplies a method, not authority to write, run commands, pay, send, commit, or publish. Identify unperformed or unverified steps.
