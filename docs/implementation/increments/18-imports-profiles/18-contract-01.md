# 18-contract-01: Imports and optional profiles — contract slice 1

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by imports and optional profiles.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
Implement the minimum domain types/validation and reviewed migration definitions for this slice. Do not activate hosted routes or build UI here.

## Prerequisites and decisions

Required tasks: 06-behavior, 08-behavior. Read their handoff **interface section only**.
Decision records: privacy. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [PRD-17-01](../../../specification/product/17-bulk-onboarding-and-import.md#prd-17-01)
- [PRD-17-02](../../../specification/product/17-bulk-onboarding-and-import.md#prd-17-02)
- [PRD-17-03](../../../specification/product/17-bulk-onboarding-and-import.md#prd-17-03)
- [PRD-17-04](../../../specification/product/17-bulk-onboarding-and-import.md#prd-17-04)
- [PRD-17-05](../../../specification/product/17-bulk-onboarding-and-import.md#prd-17-05)
- [PRD-17-06](../../../specification/product/17-bulk-onboarding-and-import.md#prd-17-06)
- [WF-06-01](../../../specification/workflows/06-add-details-when-convenient.md#wf-06-01)
- [WF-06-02](../../../specification/workflows/06-add-details-when-convenient.md#wf-06-02)
- [WF-06-03](../../../specification/workflows/06-add-details-when-convenient.md#wf-06-03)
- [WF-06-04](../../../specification/workflows/06-add-details-when-convenient.md#wf-06-04)
- [WF-06-05](../../../specification/workflows/06-add-details-when-convenient.md#wf-06-05)
- [WF-06-06](../../../specification/workflows/06-add-details-when-convenient.md#wf-06-06)
- [WF-06-07](../../../specification/workflows/06-add-details-when-convenient.md#wf-06-07)
- [WF-06-08](../../../specification/workflows/06-add-details-when-convenient.md#wf-06-08)
- [WF-06-09](../../../specification/workflows/06-add-details-when-convenient.md#wf-06-09)
- [WF-06-10](../../../specification/workflows/06-add-details-when-convenient.md#wf-06-10)
- [WF-06-11](../../../specification/workflows/06-add-details-when-convenient.md#wf-06-11)
- [WF-06-12](../../../specification/workflows/06-add-details-when-convenient.md#wf-06-12)
- [WF-30-01](../../../specification/workflows/30-additional-implementation-records-and-boundaries.md#wf-30-01)
- [ARC-04-09](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-09)
- [ARC-03-13](../../../specification/architecture/03-data-model-contract.md#arc-03-13)

- `src/server/imports/local.ts` — inspect only the relevant exported boundary
- `src/server/imports/fixed-template.ts` — inspect only the relevant exported boundary
- `src/components/v1/ImportPanel.jsx` — inspect only the relevant exported boundary

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Add the required typed contract/domain validation and migration definitions; preserve standard SQL and document backward compatibility or forward repair. Coordinator owns migration numbering. Do not apply migrations to a provider.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: Preview and commit a tiny import with one invalid/duplicate row; verify optional profile omission does not block collection.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/18-contract-01.md`.
Allowed write roots: `docs/implementation/state/tasks/18-contract-01.md`, `docs/openapi.yaml`, `src/domain/`, `src/server/persistence/contracts.ts`, `supabase/migrations/`. Narrow these further at dispatch.
