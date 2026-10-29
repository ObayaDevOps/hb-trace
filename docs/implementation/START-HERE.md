# HB-TRACE implementation entry point

Status: planning package, 2026-10-29. Application implementation has not started under this plan.

**Coordinator:** read [coordinator.md](coordinator.md), then [the current checkpoint](state/current.md). Select one task from [the roadmap](roadmap.md). Do not load the full manifest or all increments into an agent prompt.

**Worker:** receive one task ID and the coordinator's bounded dispatch record. Run:

```bash
npm run plan:task -- 08-ui-register-farmer
```

This prints common instructions, the task, exact requirement blocks and only its assigned screen. Code is referenced by path/symbol for incremental inspection rather than dumped into the briefing. Output for a planned task is a planning preview; prerequisites must be accepted before execution.

## Authority

- [V1 product index](../../HB-TRACE-V1-PLAN.md): scope and invariants.
- [Workflow index](../mobile-first-workflow-ui-plan.md): staff/customer interactions.
- [Architecture index](../architecture-technical-spec.md): technical boundaries.

Those indexes forward to small authoritative fragments under `docs/specification/`. Later refinements are explicit task references; workers do not need to discover appendices. Stable requirement IDs identify exact blocks. Original screen examples remain design evidence, not operational code or quality policy.

## Scheduling and testing

One coordinator, one fresh implementation worker at a time. Use a fresh coordinator context at increment boundaries, restoring only the checkpoint and selected task. Never inherit the complete conversation into a worker.

Use [lightweight verification](testing-policy.md) during development. Full suites run at meaningful integration milestones and final code handoff, not after every edit or worker task. Comprehensive coverage belongs to increment 28.

## Planning tools

```bash
npm run plan:check
npm run plan:task -- 10-ui-receive-arrival
npm run plan:impact -- ARC-04-09
```

`plan:impact` also accepts a task ID, decision ID, screen ID, code path or symbol. It returns direct and transitive dependants. These tools do not mutate files or run application tests.

[Coverage and freshness maintenance](maintenance.md) explains fingerprints and dispatch records. [Deferred testing](deferred-testing.md) distinguishes incomplete coverage from production activation gates. The manifest is machine data, not required worker reading.
