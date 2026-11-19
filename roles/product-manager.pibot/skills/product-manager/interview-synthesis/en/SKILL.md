---
name: interview-synthesis
description: "Use when synthesising user interviews, surveys or feedback: pull quotes, group themes, derive requirement leads."
metadata:
  pibot-name: "Interview synthesis"
  pibot-params: "[{\"name\":\"materials\",\"description\":\"Where the interview notes, transcripts or feedback are\"}]"
---

# Interview synthesis

Materials: {materials}

## Steps
1. Read everything and give each participant an ID (U1, U2…); keep real names, phone numbers and other personal details out of the output.
2. Pull out useful snippets: the quote (meaning intact, filler words can go) + participant ID + context.
3. Tag snippets: goals, pain points, current workarounds, wishes, concerns, willingness to pay.
4. Group similar snippets into themes, noting how many participants raised each (e.g. 4/6).
5. Separate what users said from what you infer; with a small sample, say the findings are leads, not proof.
6. Derive requirement leads and assumptions to validate.

## Template

```
# Interview synthesis: <topic>
Sample: N participants (brief makeup)  Dates: …

## Key findings (most important first)
1. <Theme> — mentioned by 4/6
   - "Quote" — U2, context
   - "Quote" — U5
   - Inference: …

## Current workarounds and alternatives
## Surprises
## Requirement leads
| Lead | Basis (theme / quotes) | Suggested priority | Assumption to validate |
## Questions for the next round
```

## Scope

Use supplied information first; user requirements on count, format, and scope override this default template. Current capabilities govern permissions, primary/read-only workplaces, Plan mode, and budget; do not switch tools to bypass a refusal. This skill supplies a method, not authority to write, run commands, pay, send, commit, or publish. Identify unperformed or unverified steps.
