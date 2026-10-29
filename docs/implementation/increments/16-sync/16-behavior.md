# 16-behavior: Field sync and guided recovery — connect behavior

## Outcome

Field sync and guided recovery, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 16-contract-01. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 16-behavior`.
Decisions: devices. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/lib/sync-types.ts` — SyncEnvelope
- `src/lib/offline/outbox.ts` — syncOfflineOperations
- `src/server/commands/local.ts` — LocalCommandService

## Implementation

1. Keep sent envelopes immutable and retain every individually unacknowledged command.
2. Use stable replay identity and explicit dependency results; linked corrections preserve original results and bucket identities.
3. Rebind only never-sent drafts; resolve committed effects before replacements and reconnect waiting HQ arrivals without duplication.
4. Wire application services and versioned API boundaries through the accepted contracts. Keep local mode usable; hosted failures stay explicit until durable adapters are connected. Update only the changed OpenAPI operations.
5. Record exact UI-facing request/result/query symbols, error remediation, permissions and version expectations for the screen workers. No client import from src/server.

## Lightweight verification

Replay one dependency chain with a partial acknowledgement and corrected rejection; verify identities and pending work.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `src/server/`, `src/domain/`, `src/app/api/v1/`, `src/lib/`, `supabase/migrations/`, `docs/openapi.yaml`, `docs/implementation/state/tasks/16-behavior.md`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/16-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.
