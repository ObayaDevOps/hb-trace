# 07-contract-01: Mobile shell and installation — contract slice 1

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by mobile shell and installation.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
Implement the minimum domain types/validation and reviewed migration definitions for this slice. Do not activate hosted routes or build UI here.

## Prerequisites and decisions

Required tasks: 04-behavior. Read their handoff **interface section only**.
Decision records: devices. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [PRD-24-01](../../../specification/product/24-installable-pwa-and-device-reliability.md#prd-24-01)
- [PRD-25-01](../../../specification/product/25-installation-and-navigation.md#prd-25-01)
- [PRD-25-02](../../../specification/product/25-installation-and-navigation.md#prd-25-02)
- [PRD-25-03](../../../specification/product/25-installation-and-navigation.md#prd-25-03)
- [PRD-25-04](../../../specification/product/25-installation-and-navigation.md#prd-25-04)
- [PRD-25-05](../../../specification/product/25-installation-and-navigation.md#prd-25-05)
- [WF-26-01](../../../specification/workflows/26-navigation-and-home.md#wf-26-01)
- [WF-26-02](../../../specification/workflows/26-navigation-and-home.md#wf-26-02)
- [WF-26-03](../../../specification/workflows/26-navigation-and-home.md#wf-26-03)
- [WF-26-04](../../../specification/workflows/26-navigation-and-home.md#wf-26-04)
- [WF-27-01](../../../specification/workflows/27-screens-and-obvious-next-actions.md#wf-27-01)
- [WF-27-02](../../../specification/workflows/27-screens-and-obvious-next-actions.md#wf-27-02)
- [WF-27-03](../../../specification/workflows/27-screens-and-obvious-next-actions.md#wf-27-03)
- [WF-27-04](../../../specification/workflows/27-screens-and-obvious-next-actions.md#wf-27-04)
- [WF-27-05](../../../specification/workflows/27-screens-and-obvious-next-actions.md#wf-27-05)
- [WF-27-06](../../../specification/workflows/27-screens-and-obvious-next-actions.md#wf-27-06)
- [WF-27-07](../../../specification/workflows/27-screens-and-obvious-next-actions.md#wf-27-07)
- [WF-27-08](../../../specification/workflows/27-screens-and-obvious-next-actions.md#wf-27-08)
- [WF-27-09](../../../specification/workflows/27-screens-and-obvious-next-actions.md#wf-27-09)
- [WF-27-10](../../../specification/workflows/27-screens-and-obvious-next-actions.md#wf-27-10)
- [WF-27-11](../../../specification/workflows/27-screens-and-obvious-next-actions.md#wf-27-11)
- [WF-27-12](../../../specification/workflows/27-screens-and-obvious-next-actions.md#wf-27-12)
- [WF-27-13](../../../specification/workflows/27-screens-and-obvious-next-actions.md#wf-27-13)
- [WF-27-14](../../../specification/workflows/27-screens-and-obvious-next-actions.md#wf-27-14)
- [WF-27-15](../../../specification/workflows/27-screens-and-obvious-next-actions.md#wf-27-15)
- [WF-27-16](../../../specification/workflows/27-screens-and-obvious-next-actions.md#wf-27-16)
- [WF-27-17](../../../specification/workflows/27-screens-and-obvious-next-actions.md#wf-27-17)
- [WF-28-01](../../../specification/workflows/28-status-wording.md#wf-28-01)
- [WF-28-02](../../../specification/workflows/28-status-wording.md#wf-28-02)
- [WF-28-03](../../../specification/workflows/28-status-wording.md#wf-28-03)
- [WF-28-04](../../../specification/workflows/28-status-wording.md#wf-28-04)
- [WF-28-05](../../../specification/workflows/28-status-wording.md#wf-28-05)
- [WF-28-06](../../../specification/workflows/28-status-wording.md#wf-28-06)
- [WF-28-07](../../../specification/workflows/28-status-wording.md#wf-28-07)
- [WF-28-08](../../../specification/workflows/28-status-wording.md#wf-28-08)
- [WF-28-09](../../../specification/workflows/28-status-wording.md#wf-28-09)

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
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/07-contract-01.md`.
Allowed write roots: `docs/implementation/state/tasks/07-contract-01.md`, `docs/openapi.yaml`, `src/domain/`, `src/server/persistence/contracts.ts`, `supabase/migrations/`. Narrow these further at dispatch.
