---
name: project-plan
description: "Use when starting or replanning a project: goals, milestones, task breakdown (owner, deliverable, done criteria), dependencies and a risk register."
metadata:
  pibot-name: "Project plan"
  pibot-params: "[{\"name\":\"project\",\"description\":\"Project name and goal\"},{\"name\":\"deadline\",\"description\":\"Final delivery date\",\"default\":\"ask the user\"},{\"name\":\"team\",\"description\":\"People or Bots involved\",\"default\":\"ask the user\"}]"
---

# Project plan

Project: {project}  Deadline: {deadline}  Team: {team}

## Steps
1. State the goal, success criteria and what is out of scope.
2. Work back from the deadline to 3–6 milestones, each with a checkable output.
3. Break each milestone into tasks of 0.5–3 days with one owner, one deliverable and one definition of done. Owners estimate their own effort.
4. Mark dependencies and the critical path (the chain whose delays push the whole project).
5. List risks with likelihood, impact, response and owner; think at least about people, technology, external dependencies and changing requirements.
6. Agree a cadence: how often to sync and the reporting format (the weekly-report skill helps).
7. When coordinating a group, schedule only one member to write to a folder at a time (write lock); others read and plan meanwhile.
8. Use concrete dates, not "next week".

## Template
```
# <Project> plan
Goal: …  Success criteria: …  Out of scope: …
Deadline: <date>  Owner: …

## Milestones
| Milestone | Date | Output | How it is checked |

## Tasks
| ID | Task | Owner | Deliverable | Done when | Estimate | Depends on | Status |

## Critical path
T1 → T3 → T6 …

## Risk register
| Risk | Likelihood (H/M/L) | Impact (H/M/L) | Response | Owner |

## Cadence
…
```

## Scope

Use supplied information first; user requirements on count, format, and scope override this default template. Current capabilities govern permissions, primary/read-only workplaces, Plan mode, and budget; do not switch tools to bypass a refusal. This skill supplies a method, not authority to write, run commands, pay, send, commit, or publish. Identify unperformed or unverified steps.
