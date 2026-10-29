# 02-behavior: Shared contracts — connect behavior

## Outcome

Shared contracts, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 02-contract-01, 02-contract-02, 02-contract-03. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 02-behavior`.
Decisions: quality. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/domain/decimal.ts` — Quantity
- `src/domain/identifiers.ts` — relevant exports only
- `src/lib/sync-types.ts` — SyncEnvelope

## Implementation

1. Reconcile existing UUID, decimal, money, time and state types with the selected requirements.
2. Define the minimum typed ports and versioned command results consumed by later tasks; preserve existing reusable domain behavior.
3. Record exact exported symbols and OpenAPI sections in the handoff; keep provider types outside domain and client code.
4. Wire application services and versioned API boundaries through the accepted contracts. Keep local mode usable; hosted failures stay explicit until durable adapters are connected. Update only the changed OpenAPI operations.
5. Record exact UI-facing request/result/query symbols, error remediation, permissions and version expectations for the screen workers. No client import from src/server.

## Lightweight verification

Exercise decimal serialization and a representative invalid transition using existing focused checks.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `src/server/`, `src/domain/`, `src/app/api/v1/`, `src/lib/`, `supabase/migrations/`, `docs/openapi.yaml`, `docs/implementation/state/tasks/02-behavior.md`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/02-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.
