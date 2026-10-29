# 01-behavior: Baseline and decisions — connect behavior

## Outcome

Baseline and decisions, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 01-contract-01, 01-contract-02, 01-contract-03, 01-contract-04, 01-contract-05. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 01-behavior`.
Decisions: platform, quality, privacy, devices. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/lib/runtime-config.ts` — runtimeConfig

## Implementation

1. Record which routes use local fixtures or fail closed in hosted mode; reconcile historical notes against current code.
2. Record host, quality, privacy and device decision owners without inventing operational settings.
3. Preserve the dirty worktree baseline and assign unsupported features an explicit activation blocker.
4. Record owners and observable evidence without claiming readiness from a mockup.
5. Prepare the next coordinator checkpoint.

## Lightweight verification

Demonstrate that a local start needs no provider credentials and that hosted persistence is not falsely reported ready.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `docs/implementation/`, `docs/staff-quick-start.md`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/01-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.
