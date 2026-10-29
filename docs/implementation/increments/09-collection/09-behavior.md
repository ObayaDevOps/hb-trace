# 09-behavior: Collection and receipts — connect behavior

## Outcome

Collection and receipts, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 09-contract-01. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 09-behavior`.
Decisions: quality. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/domain/purchases.ts` — createPurchase
- `src/domain/purchases.ts` — createReceiptForPurchase
- `src/server/commands/local.ts` — PurchaseCommandResult

## Implementation

1. Record collection and harvest precision separately, preserve occurrence/capture/commit times and source versus receiving location.
2. Validate measurements, money meanings and bucket totals using exact decimals; retain stable collection, contents and receipt references.
3. Issue receipt and independent confirmation/dispute records; retry/reprint keeps original identities.
4. Wire application services and versioned API boundaries through the accepted contracts. Keep local mode usable; hosted failures stay explicit until durable adapters are connected. Update only the changed OpenAPI operations.
5. Record exact UI-facing request/result/query symbols, error remediation, permissions and version expectations for the screen workers. No client import from src/server.

## Lightweight verification

Save one collection with two buckets, then retry without duplicate purchase or receipt.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `src/server/`, `src/domain/`, `src/app/api/v1/`, `src/lib/`, `supabase/migrations/`, `docs/openapi.yaml`, `docs/implementation/state/tasks/09-behavior.md`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/09-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.
