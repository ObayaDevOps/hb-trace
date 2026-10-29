# 06-contract-01: Private assets — contract slice 1

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by private assets.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
Implement the minimum domain types/validation and reviewed migration definitions for this slice. Do not activate hosted routes or build UI here.

## Prerequisites and decisions

Required tasks: 05-behavior. Read their handoff **interface section only**.
Decision records: privacy, platform. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [PRD-30-01](../../../specification/product/30-evidence-auditability-and-privacy.md#prd-30-01)
- [PRD-30-02](../../../specification/product/30-evidence-auditability-and-privacy.md#prd-30-02)
- [PRD-30-03](../../../specification/product/30-evidence-auditability-and-privacy.md#prd-30-03)
- [PRD-30-04](../../../specification/product/30-evidence-auditability-and-privacy.md#prd-30-04)
- [PRD-30-05](../../../specification/product/30-evidence-auditability-and-privacy.md#prd-30-05)
- [PRD-30-06](../../../specification/product/30-evidence-auditability-and-privacy.md#prd-30-06)
- [PRD-30-07](../../../specification/product/30-evidence-auditability-and-privacy.md#prd-30-07)
- [PRD-30-08](../../../specification/product/30-evidence-auditability-and-privacy.md#prd-30-08)
- [PRD-30-09](../../../specification/product/30-evidence-auditability-and-privacy.md#prd-30-09)
- [PRD-30-10](../../../specification/product/30-evidence-auditability-and-privacy.md#prd-30-10)
- [PRD-30-11](../../../specification/product/30-evidence-auditability-and-privacy.md#prd-30-11)
- [PRD-30-12](../../../specification/product/30-evidence-auditability-and-privacy.md#prd-30-12)
- [PRD-30-13](../../../specification/product/30-evidence-auditability-and-privacy.md#prd-30-13)
- [ARC-05-01](../../../specification/architecture/05-storage-interface-and-asset-lifecycle.md#arc-05-01)
- [ARC-05-02](../../../specification/architecture/05-storage-interface-and-asset-lifecycle.md#arc-05-02)
- [ARC-05-03](../../../specification/architecture/05-storage-interface-and-asset-lifecycle.md#arc-05-03)
- [ARC-05-04](../../../specification/architecture/05-storage-interface-and-asset-lifecycle.md#arc-05-04)
- [ARC-05-05](../../../specification/architecture/05-storage-interface-and-asset-lifecycle.md#arc-05-05)
- [ARC-05-06](../../../specification/architecture/05-storage-interface-and-asset-lifecycle.md#arc-05-06)
- [ARC-05-07](../../../specification/architecture/05-storage-interface-and-asset-lifecycle.md#arc-05-07)
- [ARC-05-08](../../../specification/architecture/05-storage-interface-and-asset-lifecycle.md#arc-05-08)
- [ARC-05-09](../../../specification/architecture/05-storage-interface-and-asset-lifecycle.md#arc-05-09)

- `src/server/persistence/contracts.ts` — AssetMetadataRecord

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Add the required typed contract/domain validation and migration definitions; preserve standard SQL and document backward compatibility or forward repair. Coordinator owns migration numbering. Do not apply migrations to a provider.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: Check one verified upload/retrieval and anonymous denial; defer malicious-file matrices.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/06-contract-01.md`.
Allowed write roots: `docs/implementation/state/tasks/06-contract-01.md`, `docs/openapi.yaml`, `src/domain/`, `src/server/persistence/contracts.ts`, `supabase/migrations/`. Narrow these further at dispatch.
