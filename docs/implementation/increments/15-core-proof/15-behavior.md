# 15-behavior: Core operational integration — connect behavior

## Outcome

Core operational integration, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 15-contract-01. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 15-behavior`.
Decisions: platform, recovery. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/lib/runtime-config.ts` — runtimeConfig
- `src/server/persistence/contracts.ts` — PersistenceAdapter

## Implementation

1. Connect the core collection-to-recall flow against durable services and record demo versus hosted evidence separately.
2. Implement independent SQL/original-byte export and manifest with a consistent cutoff; fail incomplete backups.
3. Prepare isolated restore and compare a small representative record/asset sample; full provider-inaccessible drill remains an activation gate.
4. Wire application services and versioned API boundaries through the accepted contracts. Keep local mode usable; hosted failures stay explicit until durable adapters are connected. Update only the changed OpenAPI operations.
5. Record exact UI-facing request/result/query symbols, error remediation, permissions and version expectations for the screen workers. No client import from src/server.

## Lightweight verification

Smoke the complete online journey once; record restore proof still missing rather than running a broad suite now.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `src/server/`, `src/domain/`, `src/app/api/v1/`, `src/lib/`, `supabase/migrations/`, `docs/openapi.yaml`, `docs/implementation/state/tasks/15-behavior.md`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/15-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.

## Usable-journey integration prerequisite

The manifest additionally requires the core screen packets in increments 07–14 (except the later offline-save variant). Verify those accepted results before claiming the journey works. Read only their interface summaries; do not load all screens into context.
