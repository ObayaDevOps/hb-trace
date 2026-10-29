# 09-contract-01: Collection and receipts — contract slice 1

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by collection and receipts.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
Implement the minimum domain types/validation and reviewed migration definitions for this slice. Do not activate hosted routes or build UI here.

## Prerequisites and decisions

Required tasks: 08-behavior. Read their handoff **interface section only**.
Decision records: quality. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [WF-07-01](../../../specification/workflows/07-3-collection-dates-payment-and-bucket-labels.md#wf-07-01)
- [WF-08-01](../../../specification/workflows/08-dates.md#wf-08-01)
- [WF-08-02](../../../specification/workflows/08-dates.md#wf-08-02)
- [WF-08-03](../../../specification/workflows/08-dates.md#wf-08-03)
- [WF-08-04](../../../specification/workflows/08-dates.md#wf-08-04)
- [WF-09-01](../../../specification/workflows/09-quantity-and-payment.md#wf-09-01)
- [WF-09-02](../../../specification/workflows/09-quantity-and-payment.md#wf-09-02)
- [WF-10-01](../../../specification/workflows/10-three-different-references.md#wf-10-01)
- [WF-10-02](../../../specification/workflows/10-three-different-references.md#wf-10-02)
- [WF-10-03](../../../specification/workflows/10-three-different-references.md#wf-10-03)
- [WF-10-04](../../../specification/workflows/10-three-different-references.md#wf-10-04)
- [WF-10-05](../../../specification/workflows/10-three-different-references.md#wf-10-05)
- [WF-10-06](../../../specification/workflows/10-three-different-references.md#wf-10-06)
- [PRD-16-01](../../../specification/product/16-honey-and-beeswax-workflow.md#prd-16-01)
- [PRD-16-02](../../../specification/product/16-honey-and-beeswax-workflow.md#prd-16-02)
- [PRD-16-03](../../../specification/product/16-honey-and-beeswax-workflow.md#prd-16-03)
- [PRD-16-04](../../../specification/product/16-honey-and-beeswax-workflow.md#prd-16-04)
- [PRD-16-05](../../../specification/product/16-honey-and-beeswax-workflow.md#prd-16-05)
- [PRD-16-06](../../../specification/product/16-honey-and-beeswax-workflow.md#prd-16-06)
- [PRD-16-07](../../../specification/product/16-honey-and-beeswax-workflow.md#prd-16-07)
- [PRD-16-08](../../../specification/product/16-honey-and-beeswax-workflow.md#prd-16-08)
- [PRD-16-09](../../../specification/product/16-honey-and-beeswax-workflow.md#prd-16-09)
- [PRD-16-10](../../../specification/product/16-honey-and-beeswax-workflow.md#prd-16-10)
- [PRD-16-11](../../../specification/product/16-honey-and-beeswax-workflow.md#prd-16-11)
- [PRD-16-12](../../../specification/product/16-honey-and-beeswax-workflow.md#prd-16-12)
- [PRD-16-13](../../../specification/product/16-honey-and-beeswax-workflow.md#prd-16-13)
- [PRD-16-14](../../../specification/product/16-honey-and-beeswax-workflow.md#prd-16-14)
- [ARC-04-09](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-09)
- [ARC-03-13](../../../specification/architecture/03-data-model-contract.md#arc-03-13)

- `src/domain/purchases.ts` — createPurchase
- `src/domain/purchases.ts` — createReceiptForPurchase
- `src/server/commands/local.ts` — PurchaseCommandResult

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Add the required typed contract/domain validation and migration definitions; preserve standard SQL and document backward compatibility or forward repair. Coordinator owns migration numbering. Do not apply migrations to a provider.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: Save one collection with two buckets, then retry without duplicate purchase or receipt.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/09-contract-01.md`.
Allowed write roots: `docs/implementation/state/tasks/09-contract-01.md`, `docs/openapi.yaml`, `src/domain/`, `src/server/persistence/contracts.ts`, `supabase/migrations/`. Narrow these further at dispatch.
