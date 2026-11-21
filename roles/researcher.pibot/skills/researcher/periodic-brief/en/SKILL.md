---
name: periodic-brief
description: "Use for a weekly or monthly brief written from one folder of material and compared with last period."
metadata:
  pibot-name: "Periodic brief"
  pibot-version: "6"
  pibot-verified: "2026-10-23 · 真实资料两期 / two real periods"
  pibot-params: "[{\"name\":\"topic\",\"description\":\"What the brief tracks\",\"default\":\"progress this period\"},{\"name\":\"audience\",\"description\":\"Who reads it\",\"default\":\"the owner\"}]"
  pibot-contract: "{\"inputs\":[{\"name\":\"material\",\"kind\":\"folder\",\"required\":true},{\"name\":\"previous\",\"kind\":\"previous\",\"required\":false},{\"name\":\"definitions\",\"kind\":\"text\",\"required\":false}],\"prechecks\":[{\"check\":\"nonEmpty\",\"input\":\"material\"}],\"deliverables\":[{\"id\":\"brief\",\"path\":\"brief.md\",\"kind\":\"md\",\"sections\":[\"Key findings\",\"What changed\",\"Versus last period\",\"Data notes\",\"Sources\",\"To confirm\"]}],\"acceptance\":[{\"id\":\"a1\",\"check\":\"exists\",\"deliverable\":\"brief\"},{\"id\":\"a2\",\"check\":\"sections\",\"deliverable\":\"brief\"},{\"id\":\"a3\",\"check\":\"citations\",\"deliverable\":\"brief\"},{\"id\":\"source-count\",\"check\":\"minCitations\",\"min\":1,\"deliverable\":\"brief\"}],\"stop\":[\"If the material or definitions contradict each other, ask instead of choosing\",\"Never invent numbers; anything you cannot compute goes under To confirm\"],\"maxFixRounds\":2,\"state\":{\"readPrevious\":true},\"approvals\":[\"send_out\"],\"budget\":{\"costUsd\":1},\"model\":{\"tier\":\"main\",\"thinking\":\"low\"}}"
---

# Periodic brief

Topic: {topic}　Audience: {audience}

## Steps
1. The material input is the folder the user names (not necessarily "material"); skim its list, read text material with `read_file` and spreadsheets (xlsx / xls / csv) with `office_read`, note the definitions and key numbers yourself, then continue.
2. Write this period's findings and changes; if there is a previous result, compare point by point: new, changed, no longer true.
3. Tag every finding with a source number [n] and list file names or links under Sources.
4. If something is ambiguous, state the assumption and continue; ask only when the material contradicts itself.

## Deliverable
`brief.md` with sections: Key findings (3–5), What changed, Versus last period, Data notes, Sources, To confirm.
