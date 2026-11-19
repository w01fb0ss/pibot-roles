---
name: meeting-minutes
description: "Use when turning meeting notes, transcripts or chat into minutes: decisions, action items with owner and due date, open questions."
metadata:
  pibot-name: "Meeting minutes"
  pibot-params: "[{\"name\":\"materials\",\"description\":\"Notes, transcript or chat content\"},{\"name\":\"meeting\",\"description\":\"Meeting title\",\"default\":\"infer from the material\"}]"
---

# Meeting minutes

Meeting: {meeting}
Materials: {materials}

## Steps
1. Read everything and find what was decided, who does what, and what is still open.
2. Every action item needs an owner and a due date; where the material has none, mark "TBD" rather than assigning someone.
3. Record conclusions and key reasons, not a blow-by-blow of the discussion.
4. Where people disagreed, note the positions and how it was settled (or that it was not).
5. Use names as they appear in the material; leave out private details unrelated to the meeting.
6. Prepare a draft for attendees; actual sending follows user authorization and current permissions. Do not claim delivery before it occurs.

## Template
```
# <Meeting> minutes
Date: …  Attendees: …  Notes by: …

## Decisions
1. …

## Action items
| Item | Owner | Due | Notes |
|---|---|---|---|

## Open questions
- <question> — <who> decides by <when>

## Discussion highlights (optional)
- …

## Next meeting
Date / topics
```

## Scope

Use supplied information first; user requirements on count, format, and scope override this default template. Current capabilities govern permissions, primary/read-only workplaces, Plan mode, and budget; do not switch tools to bypass a refusal. This skill supplies a method, not authority to write, run commands, pay, send, commit, or publish. Identify unperformed or unverified steps.
