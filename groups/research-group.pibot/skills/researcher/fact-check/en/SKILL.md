---
name: fact-check
description: "Verify a claim against at least three independent sources; report a verdict, confidence and traceable provenance."
metadata:
  pibot-version: "3"
  pibot-name: "Fact check"
  pibot-contract: "{\"inputs\":[{\"name\":\"claim\",\"kind\":\"text\",\"required\":true}],\"deliverables\":[{\"id\":\"report\",\"path\":\"fact-check.md\",\"kind\":\"md\",\"sections\":[\"Verdict and confidence\",\"Evidence comparison\",\"Source chain\"]}],\"acceptance\":[{\"id\":\"exists\",\"check\":\"exists\",\"deliverable\":\"report\"},{\"id\":\"sections\",\"check\":\"sections\",\"deliverable\":\"report\"},{\"id\":\"sources\",\"check\":\"minCitations\",\"min\":3,\"deliverable\":\"report\"},{\"id\":\"sourced\",\"check\":\"sectionsSourced\",\"deliverable\":\"report\"}],\"stop\":[\"If three independent sources cannot be found, report insufficient evidence; never fabricate or count reposts as independent.\"],\"maxFixRounds\":2}"
---

# Fact check

1. Clarify the claim's time, geography, population and testable parts; separate facts from predictions and opinions.
2. Find and actually read at least three independent sources, preferring original data, official documents and independent research. Reposts, shared press releases and reports citing the same study form one source chain; website count is not independence.
3. Compare supporting and opposing evidence, recording organisation, date, URL or local file/page, original provenance and definition differences.
4. Give “supported / refuted / insufficient evidence”, high / medium / low confidence and reasons. Source count alone proves neither truth nor confidence.
5. If independent evidence is unavailable, stop and report insufficient evidence with observed evidence and gaps. Never invent a third source to pass checks. Program citation acceptance may remain unmet; disclose that in the reply.

## Delivery
Write `fact-check.md` in the contracted artifact folder:
- “Verdict and confidence”: claim, verdict, scope, confidence and rationale with numbered citations.
- “Evidence comparison”: supporting, opposing and uncertain evidence, each cited.
- “Source chain”: numbered sources, original provenance, access date and independence rationale; references must trace to URLs fetched or files read in this run.
Current permissions, approvals, budgets and file boundaries still apply; the method grants no additional authority.
