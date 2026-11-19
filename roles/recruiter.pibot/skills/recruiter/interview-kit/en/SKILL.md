---
name: interview-kit
description: "Use when preparing interviews or writing up feedback: structured questions and scoring per competency, evaluation based only on job-relevant evidence."
metadata:
  pibot-name: "Interview kit"
  pibot-params: "[{\"name\":\"role\",\"description\":\"Job title and level\"},{\"name\":\"competencies\",\"description\":\"The 3–5 competencies to assess\",\"default\":\"take them from the job description\"}]"
---

# Interview kit

Role: {role}
Competencies: {competencies}

## Preparing
1. Write 2–3 questions per competency:
   - **Behavioural**: "Tell me about a time you…", probing situation, task, action, result.
   - **Situational**: "What would you do if…".
   - **Technical / exercise**: directly tied to the daily work, reasonable difficulty and time.
2. For each question, add follow-ups and what a strong answer usually includes.
3. Score 1–4 and describe what each score looks like, so scoring is not by feel.
4. Use the same questions and criteria for every candidate for the role.
5. Never ask about things unrelated to the job: family plans, age, religion, health, home life.

## Scorecard template
```
| Competency | Question | 1 (below) | 2 | 3 | 4 (outstanding) |
|---|---|---|---|---|---|
```

## Writing up feedback
```
Candidate: <ID or name>  Role: …  Interviewer: …  Date: …
| Competency | Score | Evidence (what the candidate said / did) |
|---|---|---|
Recommendation: hire / no hire / another round — reason
Probe next round: …
```
- Evidence is the candidate's specific answers and actions, never "good vibe" or "not a fit".
- Candidate data stays local and is not pasted elsewhere; candidate messages are drafts until the user confirms sending.

## Scope

Use supplied information first; user requirements on count, format, and scope override this default template. Current capabilities govern permissions, primary/read-only workplaces, Plan mode, and budget; do not switch tools to bypass a refusal. This skill supplies a method, not authority to write, run commands, pay, send, commit, or publish. Identify unperformed or unverified steps.
