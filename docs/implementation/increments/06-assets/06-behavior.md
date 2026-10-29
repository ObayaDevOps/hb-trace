# 06-behavior: Private assets — connect behavior

## Outcome

Private assets, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 06-contract-01. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 06-behavior`.
Decisions: privacy, platform. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/server/persistence/contracts.ts` — AssetMetadataRecord

## Implementation

1. Implement AssetStore and private upload intents with server-side bounded streaming.
2. Keep bytes quarantined until type, size, hash and scan verification; create immutable evidence mappings and separate derivatives.
3. Authorize signed retrieval and reconcile interrupted copies without deleting unresolved evidence.
4. Wire application services and versioned API boundaries through the accepted contracts. Keep local mode usable; hosted failures stay explicit until durable adapters are connected. Update only the changed OpenAPI operations.
5. Record exact UI-facing request/result/query symbols, error remediation, permissions and version expectations for the screen workers. No client import from src/server.

## Lightweight verification

Check one verified upload/retrieval and anonymous denial; defer malicious-file matrices.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `src/server/`, `src/domain/`, `src/app/api/v1/`, `src/lib/`, `supabase/migrations/`, `docs/openapi.yaml`, `docs/implementation/state/tasks/06-behavior.md`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/06-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.
