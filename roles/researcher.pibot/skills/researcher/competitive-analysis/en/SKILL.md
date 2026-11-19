---
name: competitive-analysis
description: "Use when comparing competitors or alternatives: pick dimensions, gather sourced facts, build a comparison table, conclude with opportunities."
metadata:
  pibot-version: "4"
  pibot-contract: "{\"inputs\":[],\"deliverables\":[{\"id\":\"report\",\"path\":\"report.md\",\"kind\":\"md\",\"sections\":[\"Comparison\",\"Sources\"]},{\"id\":\"dimensions\",\"path\":\"dimensions.xlsx\",\"kind\":\"xlsx\"}],\"acceptance\":[{\"id\":\"exists\",\"check\":\"exists\",\"deliverable\":\"report\"},{\"id\":\"sections\",\"check\":\"sections\",\"deliverable\":\"report\"},{\"id\":\"columns\",\"check\":\"tableColumns\",\"columns\":[\"Dimension\"],\"deliverable\":\"report\"},{\"id\":\"xlsx-exists\",\"check\":\"exists\",\"deliverable\":\"dimensions\"},{\"id\":\"xlsx-columns\",\"check\":\"tableColumns\",\"columns\":[\"Dimension\"],\"deliverable\":\"dimensions\"}],\"maxFixRounds\":2}"
  pibot-name: "Competitive analysis"
  pibot-params: "[{\"name\":\"competitors\",\"description\":\"Products or options to compare, comma separated\"},{\"name\":\"purpose\",\"description\":\"e.g. pricing reference, differentiation, choosing a tool\",\"default\":\"find differences and opportunities\"}]"
---

# Competitive analysis

Subjects: {competitors}
Purpose: {purpose}

## Steps
1. Pick 5–8 dimensions that serve the purpose, e.g. target users, core features, pricing, learning curve, platforms, integrations, reputation, business model.
2. Gather facts per dimension, preferring official sites, docs, pricing pages and changelogs; record the source and date viewed for each. Web access follows current permissions and approval outcomes.
3. If you cannot find something, write "no public information found"; do not guess.
4. Keep facts (sourced) apart from judgement (your analysis); put judgement under Analysis.
5. Return to the purpose: conclusions, opportunities and suggested next steps.

## Template

```
# Competitive analysis: <topic>
Purpose: …  Date: …

## Bottom line

## Comparison
| Dimension | Competitor A | Competitor B | Us / option C |
|---|---|---|---|

## Notes per competitor
### Competitor A
- Positioning: …
- Strengths: …
- Weaknesses: …
- Sources: [1] [2]

## Analysis
- Common ground / industry norms: …
- Differences and gaps: …
- Opportunities: …
- Risks: …

## Suggested next steps

## Sources
[1] Title — link or reference — date viewed
```

## Dimension workbook
Use office_create to write `dimensions.xlsx`. The first sheet header must contain the `Dimension` column; use the actual product names for the remaining columns (the contract does not require fixed names), falling back to "Competitor A"/"Competitor B" only for placeholder options. Keep source references and missing-information notes in cells. Never rename CSV as xlsx.
