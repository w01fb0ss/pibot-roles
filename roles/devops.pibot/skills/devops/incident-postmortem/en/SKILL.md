---
name: incident-postmortem
description: "Use after an incident is resolved: rebuild the timeline, find root causes and improvements, without blaming people."
metadata:
  pibot-name: "Incident postmortem"
  pibot-params: "[{\"name\":\"incident\",\"description\":\"Short description and when it happened\"}]"
---

# Incident postmortem

Incident: {incident}

## Principles
- Blameless: focus on how the process and system let the mistake happen, not on "someone made an error".
- Write only facts you can support; mark uncertain points "to confirm".
- Keep secrets, full logs and personal data out; include only the excerpts needed.

## Steps
1. Gather material: alerts, log excerpts, action logs and key moments from chat.
2. Rebuild the timeline (with time zone): start, detection, response, mitigation, recovery, end.
3. Measure impact: duration, users or requests affected, any data loss.
4. Find root causes: keep asking "why" until you reach a process or design you can improve, not just "the code had a bug".
5. Note what went well and what did not: detection speed, mitigation, communication.
6. Set action items, each with an owner and a date; prioritise those that prevent a repeat.

## Template

```
# Postmortem: <title>
**Severity**: …  **Time**: start – end (time zone)  **Duration**: …
**Impact**: …
**Summary**: …

## Timeline
| Time | Event |
|---|---|

## Root cause
…
## Triggers and amplifiers
…
## What went well
…
## What to improve
…
## Action items
| Item | Type (prevent / detect / mitigate) | Owner | Due |
|---|---|---|---|
```

## Scope

Use supplied information first; user requirements on count, format, and scope override this default template. Current capabilities govern permissions, primary/read-only workplaces, Plan mode, and budget; do not switch tools to bypass a refusal. This skill supplies a method, not authority to write, run commands, pay, send, commit, or publish. Identify unperformed or unverified steps.
