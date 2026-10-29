# 13-contract-01: Packaging and factual publication — contract slice 1

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by packaging and factual publication.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
Implement the minimum domain types/validation and reviewed migration definitions for this slice. Do not activate hosted routes or build UI here.

## Prerequisites and decisions

Required tasks: 12-behavior. Read their handoff **interface section only**.
Decision records: quality, public-status. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [PRD-32-01](../../../specification/product/32-public-verification.md#prd-32-01)
- [PRD-32-02](../../../specification/product/32-public-verification.md#prd-32-02)
- [PRD-32-03](../../../specification/product/32-public-verification.md#prd-32-03)
- [PRD-32-04](../../../specification/product/32-public-verification.md#prd-32-04)
- [PRD-32-05](../../../specification/product/32-public-verification.md#prd-32-05)
- [PRD-32-06](../../../specification/product/32-public-verification.md#prd-32-06)
- [PRD-32-07](../../../specification/product/32-public-verification.md#prd-32-07)
- [PRD-32-08](../../../specification/product/32-public-verification.md#prd-32-08)
- [PRD-32-09](../../../specification/product/32-public-verification.md#prd-32-09)
- [PRD-32-10](../../../specification/product/32-public-verification.md#prd-32-10)
- [PRD-32-11](../../../specification/product/32-public-verification.md#prd-32-11)
- [WF-20-01](../../../specification/workflows/20-6-customer-batch-lookup.md#wf-20-01)
- [WF-20-02](../../../specification/workflows/20-6-customer-batch-lookup.md#wf-20-02)
- [WF-20-03](../../../specification/workflows/20-6-customer-batch-lookup.md#wf-20-03)
- [WF-20-04](../../../specification/workflows/20-6-customer-batch-lookup.md#wf-20-04)
- [WF-20-05](../../../specification/workflows/20-6-customer-batch-lookup.md#wf-20-05)
- [WF-20-06](../../../specification/workflows/20-6-customer-batch-lookup.md#wf-20-06)
- [WF-20-07](../../../specification/workflows/20-6-customer-batch-lookup.md#wf-20-07)
- [ARC-06-01](../../../specification/architecture/06-publication-jobs-and-recovery.md#arc-06-01)
- [WF-33-07](../../../specification/workflows/33-accepted-integrity-and-usability-refinement--2026-10-28.md#wf-33-07)
- [ARC-04-09](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-09)
- [ARC-03-13](../../../specification/architecture/03-data-model-contract.md#arc-03-13)
- [ARC-04-10](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-10)

- `src/domain/packaging.ts` — commitPackagingRun
- `src/app/api/v1/public/batches/[code]/route.ts` — inspect only the relevant exported boundary

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Add the required typed contract/domain validation and migration definitions; preserve standard SQL and document backward compatibility or forward repair. Coordinator owns migration numbering. Do not apply migrations to a provider.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: Package and publish a released batch; inspect public response for private fields and correct withdrawal status.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/13-contract-01.md`.
Allowed write roots: `docs/implementation/state/tasks/13-contract-01.md`, `docs/openapi.yaml`, `src/domain/`, `src/server/persistence/contracts.ts`, `supabase/migrations/`. Narrow these further at dispatch.
