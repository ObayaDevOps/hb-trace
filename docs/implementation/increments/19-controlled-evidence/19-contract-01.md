# 19-contract-01: Controlled operations evidence — contract slice 1

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by controlled operations evidence.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
Implement the minimum domain types/validation and reviewed migration definitions for this slice. Do not activate hosted routes or build UI here.

## Prerequisites and decisions

Required tasks: 06-behavior, 12-behavior, 14-behavior. Read their handoff **interface section only**.
Decision records: quality, privacy. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [PRD-19-01](../../../specification/product/19-unbs-operational-compliance-workspace.md#prd-19-01)
- [PRD-20-01](../../../specification/product/20-printable-forms-and-completed-records.md#prd-20-01)
- [PRD-20-02](../../../specification/product/20-printable-forms-and-completed-records.md#prd-20-02)
- [PRD-20-03](../../../specification/product/20-printable-forms-and-completed-records.md#prd-20-03)
- [PRD-20-04](../../../specification/product/20-printable-forms-and-completed-records.md#prd-20-04)
- [PRD-20-05](../../../specification/product/20-printable-forms-and-completed-records.md#prd-20-05)
- [PRD-20-06](../../../specification/product/20-printable-forms-and-completed-records.md#prd-20-06)
- [PRD-20-07](../../../specification/product/20-printable-forms-and-completed-records.md#prd-20-07)
- [PRD-20-08](../../../specification/product/20-printable-forms-and-completed-records.md#prd-20-08)
- [PRD-20-09](../../../specification/product/20-printable-forms-and-completed-records.md#prd-20-09)
- [PRD-20-10](../../../specification/product/20-printable-forms-and-completed-records.md#prd-20-10)
- [PRD-20-11](../../../specification/product/20-printable-forms-and-completed-records.md#prd-20-11)
- [PRD-21-01](../../../specification/product/21-sop-and-controlled-document-library.md#prd-21-01)
- [PRD-21-02](../../../specification/product/21-sop-and-controlled-document-library.md#prd-21-02)
- [PRD-21-03](../../../specification/product/21-sop-and-controlled-document-library.md#prd-21-03)
- [PRD-21-04](../../../specification/product/21-sop-and-controlled-document-library.md#prd-21-04)
- [PRD-21-05](../../../specification/product/21-sop-and-controlled-document-library.md#prd-21-05)
- [PRD-22-01](../../../specification/product/22-requirements-register.md#prd-22-01)
- [PRD-22-02](../../../specification/product/22-requirements-register.md#prd-22-02)
- [PRD-22-03](../../../specification/product/22-requirements-register.md#prd-22-03)
- [PRD-22-04](../../../specification/product/22-requirements-register.md#prd-22-04)
- [PRD-22-05](../../../specification/product/22-requirements-register.md#prd-22-05)
- [PRD-22-06](../../../specification/product/22-requirements-register.md#prd-22-06)
- [PRD-22-07](../../../specification/product/22-requirements-register.md#prd-22-07)
- [PRD-22-08](../../../specification/product/22-requirements-register.md#prd-22-08)
- [PRD-22-09](../../../specification/product/22-requirements-register.md#prd-22-09)
- [PRD-22-10](../../../specification/product/22-requirements-register.md#prd-22-10)
- [PRD-22-11](../../../specification/product/22-requirements-register.md#prd-22-11)
- [PRD-22-12](../../../specification/product/22-requirements-register.md#prd-22-12)
- [PRD-22-13](../../../specification/product/22-requirements-register.md#prd-22-13)
- [PRD-22-14](../../../specification/product/22-requirements-register.md#prd-22-14)
- [PRD-22-15](../../../specification/product/22-requirements-register.md#prd-22-15)
- [PRD-23-01](../../../specification/product/23-haccp-and-deviations.md#prd-23-01)
- [PRD-41-01](../../../specification/product/41-phase-3--quality-evidence-and-compliance-operations.md#prd-41-01)
- [PRD-41-02](../../../specification/product/41-phase-3--quality-evidence-and-compliance-operations.md#prd-41-02)
- [PRD-41-03](../../../specification/product/41-phase-3--quality-evidence-and-compliance-operations.md#prd-41-03)
- [PRD-41-04](../../../specification/product/41-phase-3--quality-evidence-and-compliance-operations.md#prd-41-04)
- [ARC-04-09](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-09)
- [ARC-03-13](../../../specification/architecture/03-data-model-contract.md#arc-03-13)

- `src/components/v1/OperationsPage.jsx` — inspect only the relevant exported boundary
- `src/server/persistence/contracts.ts` — AssetMetadataRecord

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Add the required typed contract/domain validation and migration definitions; preserve standard SQL and document backward compatibility or forward repair. Coordinator owns migration numbering. Do not apply migrations to a provider.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: Retrieve a current document and a reviewed two-page form in original order; defer full printer/standards validation.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/19-contract-01.md`.
Allowed write roots: `docs/implementation/state/tasks/19-contract-01.md`, `docs/openapi.yaml`, `src/domain/`, `src/server/persistence/contracts.ts`, `supabase/migrations/`. Narrow these further at dispatch.
