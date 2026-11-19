---
name: study-plan
description: "Use for revision spread over days or weeks: ask the exam date, daily time and weak spots, then write a spaced-repetition table to a file and suggest a routine."
metadata:
  pibot-version: "1"
  pibot-name: "Revision plan"
  pibot-params: "[{\"name\":\"subject\",\"description\":\"Subject or scope to revise\"},{\"name\":\"deadline\",\"description\":\"Exam date or target date\",\"default\":\"not set\"}]"
---

# Revision plan

Subject: {subject}　Deadline: {deadline}

## When to use
- Only for work spread over days: a revision table for days or weeks. Single practice sessions and one-question drills use the interview drill skill instead; do not apply this table to them.
- When information is missing, ask only what decides the plan: exam date or goal, how long per day, and the one to three weakest spots.

## Steps
1. Confirm three things: exam date or goal (if there really is none, plan one two-week round), time available per day (30 minutes, an hour, more), and known weak spots (which chapters, which kinds of questions go wrong).
2. Build spaced repetition: new material comes back on days 1, 2, 4, 7 and 14; weak spots enter from day 1 with tighter spacing (days 1, 3 and 6).
3. Schedule only what fits each day at the stated time — better to schedule less; keep one buffer day for catch-up.
4. Show the table first (date / content / how to practise / estimated time), then write it to `复习计划.md` in the current working folder; when delivering several plans the same day, add the subject or date to the file name, never an absolute path.
5. Suggest a Pi Bot routine for a daily reminder or questions: call `routine_propose` to propose one daily routine ("what the plan says for today, then set 3 questions and mark them") and let the user confirm; never create it yourself.
6. When the plan changes (exam moved, a day missed), re-plan only the remaining days and do not undo what is already done.

## Table format

```
| Date | Content | How | Estimate |
|---|---|---|---|
| 11-06 | Ch.3 limits | Four-column recall + 2 single-letter questions | 30 min |
```

## Boundaries

Prefer information already available; the user's numbers, format and scope win over these templates. Tool permissions, main/additional read-only folders, Plan mode and budget follow the actual capabilities of the current run; do not switch tools to get around a refusal. This skill only gives a method — it grants no writes, commands, payments, sending, commits or publishing; mark anything not executed or verified as such.
