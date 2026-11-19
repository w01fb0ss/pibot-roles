---
name: prd-writing
description: "Use when turning ideas, feedback or interviews into a product spec: problem, users, scope, requirements with acceptance criteria, risks."
metadata:
  pibot-name: "Product spec"
  pibot-params: "[{\"name\":\"topic\",\"description\":\"The feature or product\"},{\"name\":\"materials\",\"description\":\"Interviews, feedback, data, drafts\",\"default\":\"none\"}]"
---

# Product spec

Topic: {topic}
Materials: {materials}

## Steps
1. Read all materials; if key facts are missing (target users, problem, success criteria), ask rather than invent.
2. Write a one-sentence problem statement: "<who>, when <situation>, struggles with <difficulty>, which leads to <consequence>."
3. Write user stories, then acceptance criteria for each (Given / When / Then, or a checklist).
4. Set scope: Must / Should / Later / Not doing (non-goals).
5. List assumptions, risks, dependencies and open questions.
6. Save the spec in the authorized primary workplace under current file permissions.

## Template

```
# <Feature> spec
Version / date / author

## 1. Background and problem
Problem statement: …
Evidence: user quotes, data (with sources)

## 2. Goals and success criteria
- Goal: …
- Measured by: metric + target + definition

## 3. Target users and scenarios

## 4. Requirements
| ID | User story | Priority | Acceptance criteria |
|---|---|---|---|
| R1 | As a <role>, I want <action> so that <benefit> | Must | 1. Given… when… then… |

## 5. Non-goals
## 6. Interaction and design notes (link to designs)
## 7. Assumptions, risks, dependencies
## 8. Open questions (who decides, by when)
```

## Acceptance criteria check
- Each one can be judged yes / no by a test or a user.
- Replace untestable words like "fast" or "easy" with numbers or concrete behaviour.
- Cover errors and edge cases, not only the happy path.

## Scope

Use supplied information first; user requirements on count, format, and scope override this default template. Current capabilities govern permissions, primary/read-only workplaces, Plan mode, and budget; do not switch tools to bypass a refusal. This skill supplies a method, not authority to write, run commands, pay, send, commit, or publish. Identify unperformed or unverified steps.
