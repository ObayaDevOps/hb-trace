# 17-behavior: Dependable offline PWA — connect behavior

## Outcome

Dependable offline PWA, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 17-contract-01. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 17-behavior`.
Decisions: devices. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/lib/offline/outbox.ts` — queueOfflineCommand
- `src/app/staff/layout.js` — relevant exports only
- `public/manifest.webmanifest` — relevant exports only

## Implementation

1. Prepare an authorized client shell with explicit static cache allowlist and scoped deployment/organization/actor data.
2. Persist draft/envelope/photo bytes before local success; handle quota, expiry, sign-out and account switching without silent loss.
3. Coordinate application, IndexedDB and protocol upgrades without forced destructive reloads; retain a documented N-1 recovery path.
4. Wire application services and versioned API boundaries through the accepted contracts. Keep local mode usable; hosted failures stay explicit until durable adapters are connected. Update only the changed OpenAPI operations.
5. Record exact UI-facing request/result/query symbols, error remediation, permissions and version expectations for the screen workers. No client import from src/server.

## Lightweight verification

Cold-open prepared field work offline and resume a saved draft; verify one failed-save/recovery path.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `src/server/`, `src/domain/`, `src/app/api/v1/`, `src/lib/`, `supabase/migrations/`, `docs/openapi.yaml`, `docs/implementation/state/tasks/17-behavior.md`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/17-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.
