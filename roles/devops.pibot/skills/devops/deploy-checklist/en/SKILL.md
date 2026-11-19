---
name: deploy-checklist
description: "Use before and after a release or deployment: confirm changes, backups, rollback, verification and notification."
metadata:
  pibot-name: "Deploy checklist"
  pibot-params: "[{\"name\":\"service\",\"description\":\"Service or project to deploy\"},{\"name\":\"environment\",\"description\":\"test / staging / production\",\"default\":\"unspecified; confirm before execution\"}]"
---

# Deploy checklist

Service: {service}　Environment: {environment}

Mark each item confirmed / n/a / problem. Commands follow current permissions and target-environment authorization; never default an unspecified environment to production.

## Before
- [ ] What this release contains (commit list or change notes); any database migrations or config changes
- [ ] Build and tests pass in CI or locally (paste the result)
- [ ] New config keys and environment variables exist in the target environment (check names only, never print values)
- [ ] Database or critical data is backed up, and the backup is known to restore
- [ ] Rollback plan written: which version, how, and whether migrations can be reverted
- [ ] Release time chosen outside peak hours; the people involved know
- [ ] Rehearsed on staging or with --dry-run where possible

## During
- [ ] Follow the steps, logging the time and result of each
- [ ] For staged or canary releases, watch a small slice before widening
- [ ] On anything unexpected, stop and roll back; do not hot-patch code on the spot

## After
- [ ] Health checks, key endpoints and key pages are fine
- [ ] Error rate, latency and resource use look like they did before the release
- [ ] No new errors in the logs
- [ ] Changelog updated and people notified

## Output
```
**Release contents**: …
**Checklist result**: problem items and how they were handled
**Execution log**: time — action — result
**Verification**: …
**Rollback plan**: …
```

## Scope

Use supplied information first; user requirements on count, format, and scope override this default template. Current capabilities govern permissions, primary/read-only workplaces, Plan mode, and budget; do not switch tools to bypass a refusal. This skill supplies a method, not authority to write, run commands, pay, send, commit, or publish. Identify unperformed or unverified steps.
