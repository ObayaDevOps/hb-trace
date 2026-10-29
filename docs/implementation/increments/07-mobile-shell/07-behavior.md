# 07-behavior: Mobile shell and installation — connect behavior

## Outcome

Mobile shell and installation, connected to the accepted contracts. No unrelated screens or subsystem rewrites.

## Prerequisites and bounded reading

Required tasks: 07-contract-01, 07-contract-02. Read only their final interface/schema and unresolved-decision sections.
Required source blocks are appended by `npm run plan:task -- 07-behavior`.
Decisions: devices. The coordinator supplies approved values or blocks dependent activation.
Inspect:
- `src/components/v1/StaffShell.jsx` — relevant exports only
- `src/components/v1/ui.jsx` — relevant exports only
- `src/app/layout.js` — relevant exports only

## Implementation

1. Extract reusable header, stepper, field, status and primary-action components using the reference visual tokens.
2. Connect role-aware Home/Find/My work navigation, in-app back behavior and preserved form values.
3. Repair/link manifest and correctly sized icons; represent installed launch separately from prepared offline readiness.
4. Wire application services and versioned API boundaries through the accepted contracts. Keep local mode usable; hosted failures stay explicit until durable adapters are connected. Update only the changed OpenAPI operations.
5. Record exact UI-facing request/result/query symbols, error remediation, permissions and version expectations for the screen workers. No client import from src/server.

## Lightweight verification

Inspect a representative screen at 320/390 px and check manifest discovery; defer broad device coverage.
Run once after the coherent change. Prefer existing focused checks; add a small regression only for a core invariant or demonstrated defect.
Do not run full builds/suites per task. Broader checks belong to coordinator milestones and increment 28.

## Handoff and ownership

Allowed write roots: `src/server/`, `src/domain/`, `src/app/api/v1/`, `src/lib/`, `supabase/migrations/`, `docs/openapi.yaml`, `docs/implementation/state/tasks/07-behavior.md`, `src/components/ui/`, `src/components/v1/StaffShell.jsx`, `src/app/layout.js`, `public/manifest.webmanifest`, `public/icons/`. Coordinator narrows actual files before dispatch.
Return interfaces, migrations, one main-flow result, important rejection behavior and deferred tests in `state/tasks/07-behavior.md`.
Do not start screen implementation in this packet. A predecessor contract is required reading, not its complete conversation or implementation.
