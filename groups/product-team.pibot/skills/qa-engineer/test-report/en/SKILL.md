---
name: test-report
description: "Use when reporting test results: one row per case with expected, actual and outcome, then a delivery verdict."
metadata:
  pibot-version: "1"
  pibot-name: "Test Report"
  pibot-contract: "{\"inputs\":[],\"deliverables\":[{\"id\":\"report\",\"path\":\"测试报告.md\",\"kind\":\"md\",\"sections\":[\"用例与结果\",\"结论\"]}],\"acceptance\":[{\"id\":\"exists\",\"check\":\"exists\",\"deliverable\":\"report\"},{\"id\":\"columns\",\"check\":\"tableColumns\",\"deliverable\":\"report\",\"columns\":[\"用例\",\"预期\",\"实际\",\"结果\"]},{\"id\":\"sections\",\"check\":\"sections\",\"deliverable\":\"report\"}],\"stop\":[\"没执行过的用例，结果写「未执行」并说明缺什么，不写「通过」。\"],\"maxFixRounds\":1}"
---

# Test report

1. State what was tested first: version, scope of the change, environment and fixture data.
2. One row per case: case, expected, actual, outcome. Actual records what you observed (error text, status code, screen behaviour), not "as expected".
3. The outcome is one of three: 通过 / 失败 / 未执行. A case you could not run is 未执行 plus what was missing.
4. Order cases by risk; blocking ones first.
5. The verdict answers whether it can ship, lists reproducible defects and the next regression scope.

## Delivery
The program supplies this run's output folder; write `测试报告.md` there with both sections. Keep the section names and the column headers in Chinese exactly as the contract lists them, because the check reads them:

```
# 测试报告

## 用例与结果

| 用例 | 预期 | 实际 | 结果 |
| --- | --- | --- | --- |
| <what you did> | <what should happen> | <what actually happened> | 通过 / 失败 / 未执行 |

## 结论
- 能否交付：能 / 不能，原因：<one line>
- 必现问题：<symptom and reproduction>
- 回归范围：<what to retest next time>
```

Keep the shortest reproduction and inputs for failing cases instead of just saying "broken". Tools still go through the current permissions, approvals, budget and file boundaries; this method grants no extra permission.
