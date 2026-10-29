# 17-contract-01: Dependable offline PWA — contract slice 1

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by dependable offline pwa.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
Implement the minimum domain types/validation and reviewed migration definitions for this slice. Do not activate hosted routes or build UI here.

## Prerequisites and decisions

Required tasks: 07-behavior, 16-behavior. Read their handoff **interface section only**.
Decision records: devices. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [PRD-26-01](../../../specification/product/26-offline-startup-storage-and-caching.md#prd-26-01)
- [PRD-26-02](../../../specification/product/26-offline-startup-storage-and-caching.md#prd-26-02)
- [PRD-26-03](../../../specification/product/26-offline-startup-storage-and-caching.md#prd-26-03)
- [PRD-26-04](../../../specification/product/26-offline-startup-storage-and-caching.md#prd-26-04)
- [PRD-26-05](../../../specification/product/26-offline-startup-storage-and-caching.md#prd-26-05)
- [PRD-26-06](../../../specification/product/26-offline-startup-storage-and-caching.md#prd-26-06)
- [PRD-26-07](../../../specification/product/26-offline-startup-storage-and-caching.md#prd-26-07)
- [PRD-26-08](../../../specification/product/26-offline-startup-storage-and-caching.md#prd-26-08)
- [PRD-27-01](../../../specification/product/27-updates-and-device-capabilities.md#prd-27-01)
- [PRD-27-02](../../../specification/product/27-updates-and-device-capabilities.md#prd-27-02)
- [PRD-27-03](../../../specification/product/27-updates-and-device-capabilities.md#prd-27-03)
- [PRD-27-04](../../../specification/product/27-updates-and-device-capabilities.md#prd-27-04)
- [PRD-40-01](../../../specification/product/40-phase-2--restricted-offline-collection.md#prd-40-01)
- [PRD-40-02](../../../specification/product/40-phase-2--restricted-offline-collection.md#prd-40-02)
- [PRD-40-03](../../../specification/product/40-phase-2--restricted-offline-collection.md#prd-40-03)
- [PRD-40-04](../../../specification/product/40-phase-2--restricted-offline-collection.md#prd-40-04)
- [PRD-40-05](../../../specification/product/40-phase-2--restricted-offline-collection.md#prd-40-05)
- [WF-24-01](../../../specification/workflows/24-save-and-recovery-behavior.md#wf-24-01)
- [WF-24-02](../../../specification/workflows/24-save-and-recovery-behavior.md#wf-24-02)

- `src/lib/offline/outbox.ts` — queueOfflineCommand
- `src/app/staff/layout.js` — inspect only the relevant exported boundary
- `public/manifest.webmanifest` — inspect only the relevant exported boundary

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Add the required typed contract/domain validation and migration definitions; preserve standard SQL and document backward compatibility or forward repair. Coordinator owns migration numbering. Do not apply migrations to a provider.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: Cold-open prepared field work offline and resume a saved draft; verify one failed-save/recovery path.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/17-contract-01.md`.
Allowed write roots: `docs/implementation/state/tasks/17-contract-01.md`, `docs/openapi.yaml`, `src/domain/`, `src/server/persistence/contracts.ts`, `supabase/migrations/`. Narrow these further at dispatch.
