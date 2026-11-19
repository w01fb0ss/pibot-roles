---
name: interaction-spec
description: "Use when writing an interaction spec engineers can build from: screens, elements, states, triggers and feedback."
metadata:
  pibot-name: "Interaction spec"
  pibot-params: "[{\"name\":\"feature\",\"description\":\"The feature or flow to specify\"}]"
---

# Interaction spec

Feature: {feature}

## Steps
1. Sketch the flow first: entry → each step → end (success / failure / cancel), as a numbered list or simple text diagram.
2. List the screens and dialogs involved.
3. Describe each screen's elements and states with the template.
4. Cover every edge: empty, error, overly long, no permission, offline, double clicks.
5. List the copy separately, in both Chinese and English.

## Screen template

```
### Screen: <name>
**Entry**: where users come from
**Purpose**: what users accomplish here

**Elements**
| Element | Type | Default state | Rules (visibility, validation, limits) |

**Interactions**
| Trigger | Condition | Feedback / result | Goes to |
| Click "Save" | Form valid | Button shows spinner → success toast for 2 s | Stays |
| Click "Save" | Form invalid | First invalid field gets focus and a message | — |

**States**: what empty / loading / error / no permission look like
**Keyboard**: tab order, Enter and Esc behaviour
```

## Copy table
| Location | 中文 | English |

## Open questions

## Scope

Use supplied information first; user requirements on count, format, and scope override this default template. Current capabilities govern permissions, primary/read-only workplaces, Plan mode, and budget; do not switch tools to bypass a refusal. This skill supplies a method, not authority to write, run commands, pay, send, commit, or publish. Identify unperformed or unverified steps.
