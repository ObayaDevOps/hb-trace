# 14-behavior: Trace, evidence and recall — connect behavior

## Outcome

Trace, evidence and recall, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 14-contract-01. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 14-behavior`.
Decisions: quality, public-status. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/domain/lineage.ts` — traceForward
- `src/domain/batch-impact.ts` — planBatchImpact
- `src/server/commands/batch-impact.ts` — prepareBatchAction

## Implementation

1. Implement scoped backward/forward trace and evidence export with completeness, uncertainties and cutoff.
2. Add minimal dispatch/recipient records or the approved controlled-register linkage, with quantities and contact actions.
3. Apply authorized recall restrictions and active public status consistently; retain attempts, follow-ups and closure evidence.
4. Wire application services and versioned API boundaries through the accepted contracts. Keep local mode usable; hosted failures stay explicit until durable adapters are connected. Update only the changed OpenAPI operations.
5. Record exact UI-facing request/result/query symbols, error remediation, permissions and version expectations for the screen workers. No client import from src/server.

## Lightweight verification

Trace one packaged batch to all inputs and execute a small recipient-based recall with reconciled quantities.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `src/server/`, `src/domain/`, `src/app/api/v1/`, `src/lib/`, `supabase/migrations/`, `docs/openapi.yaml`, `docs/implementation/state/tasks/14-behavior.md`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/14-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.
