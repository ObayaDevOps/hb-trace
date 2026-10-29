# 28-behavior: Comprehensive validation and pilot — connect behavior

## Outcome

Comprehensive validation and pilot, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 28-contract-01, 28-contract-02, 28-contract-03. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 28-behavior`.
Decisions: platform, quality, privacy, devices, recovery, public-status, messaging. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/lib/runtime-config.ts` — runtimeConfig

## Implementation

1. Collect deferred feature checks and run broad validation only in this explicitly later phase.
2. Exercise actual phones/printers, provider outages, concurrent graph changes, recipient recall and provider-inaccessible restore.
3. Record approved thresholds, observed task success and unresolved activation blockers; obtain owner cut-over approval.
4. Record owners and observable evidence without claiming readiness from a mockup.
5. Prepare the next coordinator checkpoint.

## Lightweight verification

This increment owns the later comprehensive suite; do not run it during ordinary feature development.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `docs/implementation/`, `docs/staff-quick-start.md`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/28-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.
