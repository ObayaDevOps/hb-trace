# 07-contract-02: Mobile shell and installation — contract slice 2

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by mobile shell and installation.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
Implement the minimum domain types/validation and reviewed migration definitions for this slice. Do not activate hosted routes or build UI here.

## Prerequisites and decisions

Required tasks: 07-contract-01. Read their handoff **interface section only**.
Decision records: devices. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [WF-28-10](../../../specification/workflows/28-status-wording.md#wf-28-10)
- [WF-28-11](../../../specification/workflows/28-status-wording.md#wf-28-11)
- [WF-28-12](../../../specification/workflows/28-status-wording.md#wf-28-12)

- `src/components/v1/StaffShell.jsx` — inspect only the relevant exported boundary
- `src/components/v1/ui.jsx` — inspect only the relevant exported boundary
- `src/app/layout.js` — inspect only the relevant exported boundary

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Add the required typed contract/domain validation and migration definitions; preserve standard SQL and document backward compatibility or forward repair. Coordinator owns migration numbering. Do not apply migrations to a provider.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: Inspect a representative screen at 320/390 px and check manifest discovery; defer broad device coverage.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/07-contract-02.md`.
Allowed write roots: `docs/implementation/state/tasks/07-contract-02.md`, `docs/openapi.yaml`, `src/domain/`, `src/server/persistence/contracts.ts`, `supabase/migrations/`. Narrow these further at dispatch.
