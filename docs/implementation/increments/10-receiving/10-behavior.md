# 10-behavior: Receiving and reconciliation — connect behavior

## Outcome

Receiving and reconciliation, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 10-contract-01. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 10-behavior`.
Decisions: quality. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/server/persistence/contracts.ts` — TraceableLotRecord
- `src/server/commands/local.ts` — PurchaseCommandResult

## Implementation

1. Record an online HQ arrival with its own identity even when source is missing; show stock immediately but blocked.
2. Link an unambiguous later collection to the same arrival without double-counting; preserve both measured weights.
3. Route ambiguous labels, duplicate matches and discrepancies to review; source resolution must retain independent quality holds.
4. Wire application services and versioned API boundaries through the accepted contracts. Keep local mode usable; hosted failures stay explicit until durable adapters are connected. Update only the changed OpenAPI operations.
5. Record exact UI-facing request/result/query symbols, error remediation, permissions and version expectations for the screen workers. No client import from src/server.

## Lightweight verification

Receive before sync, link later, and verify one stock quantity with quality blocker unchanged.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `src/server/`, `src/domain/`, `src/app/api/v1/`, `src/lib/`, `supabase/migrations/`, `docs/openapi.yaml`, `docs/implementation/state/tasks/10-behavior.md`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/10-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.
