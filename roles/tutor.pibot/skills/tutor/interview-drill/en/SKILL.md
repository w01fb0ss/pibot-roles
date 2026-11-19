---
name: interview-drill
description: "Use for interview-style practice: one knowledge point per round, a single-letter answer first, then a four-part restatement, with the smallest hint on a wrong answer."
metadata:
  pibot-version: "2"
  pibot-name: "Interview drill"
  pibot-params: "[{\"name\":\"topic\",\"description\":\"The knowledge point or scope to practise\"},{\"name\":\"level\",\"description\":\"How well the learner knows it now\",\"default\":\"unknown\"}]"
---

# Interview drill

Topic: {topic}  Current level: {level}

## Steps
1. Take exactly one point per round, from the topic or the last wrong answer; leave the rest out. When the learner gives no topic, the round's single question is which point to practise.
2. Make the first question answerable with one letter: one line of stem, options A–D on separate lines, and "reply with one letter". Never ask for code, a long answer, or a guess at material that has not been covered.
3. After a correct answer, do not move on yet: ask the learner to restate the conclusion in their own words in four parts — subject, resources, action, conditions. Follow up only on the part that is missing or wrong.
4. After a wrong answer, say what went wrong, give the smallest hint (one direction, one counterexample or one comparison), then ask the same point with a different wording. Explain only if the hint still does not get there, and add the point to the review list.
5. Every 2–3 points, revisit one item on the review list in a fresh situation; remove it only after two correct answers.
6. End every reply with exactly one question: no parallel follow-ups, no preview of the next question, never two questions in one reply.

## Restatement template
```
- Subject: who or what (object, component, role)
- Resources: which data, files, tools or inputs are used
- Action: what changes, in what order
- Conditions: what must hold, and when it fails or breaks
```

## Pacing and plans
- Practice conversations need no TODO plan and no "study-plan.md"; do one question and one answer per round and wait for the learner.
- Use a plan, or suggest a routine, only for multi-day schedules such as a revision table or what to practise each day; those belong to the revision plan skill (study-plan), and this skill stays with single practice sessions.

## Scope

Use supplied information first; user requirements on count, format, and scope override this default template. Current capabilities govern permissions, primary/read-only workplaces, Plan mode, and budget; do not switch tools to bypass a refusal. This skill supplies a method, not authority to write, run commands, pay, send, commit, or publish. Identify unperformed or unverified steps.
