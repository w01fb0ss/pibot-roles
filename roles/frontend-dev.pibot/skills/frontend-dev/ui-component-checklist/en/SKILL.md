---
name: ui-component-checklist
description: "Use after building or changing a page or component: check states, responsiveness, accessibility, theming and i18n."
metadata:
  pibot-name: "UI component checklist"
  pibot-params: "[{\"name\":\"target\",\"description\":\"Page or component name / path to check\"}]"
---

# UI component checklist

Target: {target}

Go through each item and mark it pass / problem (describe) / not applicable.

## States
- [ ] Normal, empty, loading, error and no-permission states are all handled
- [ ] Errors show an understandable message and a next step (retry, go back)
- [ ] Long text, very long words and many items do not overflow or misalign

## Responsiveness
- [ ] Works from narrow (~360px) to wide screens with no horizontal scrolling
- [ ] Touch targets are big enough (~44px); hover is never the only way to act

## Accessibility
- [ ] Main tasks can be done with the keyboard alone; focus order is logical and focus is visible
- [ ] Images and icon buttons have alt text / aria-label; form controls have associated labels
- [ ] Text contrast is sufficient (about 4.5:1 for body text)

## Theming and i18n
- [ ] Colours, spacing and type use theme variables and read clearly in light and dark
- [ ] Copy goes through the i18n setup, not hard-coded; layout survives longer translations

## Quality
- [ ] No console errors or warnings
- [ ] Lists have stable keys; no obvious redundant re-renders or requests
- [ ] User input is never rendered as raw HTML

## Output
```
**Target**: …
**Problems**:
1. Item — symptom — suggested fix (file:line)
**Passed**: brief list
**Could not check**: why (e.g. needs a real device or screen reader)
```

## Scope

Use supplied information first; user requirements on count, format, and scope override this default template. Current capabilities govern permissions, primary/read-only workplaces, Plan mode, and budget; do not switch tools to bypass a refusal. This skill supplies a method, not authority to write, run commands, pay, send, commit, or publish. Identify unperformed or unverified steps.
