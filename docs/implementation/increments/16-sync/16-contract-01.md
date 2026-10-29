# 16-contract-01: Field sync and guided recovery — contract slice 1

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by field sync and guided recovery.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
Implement the minimum domain types/validation and reviewed migration definitions for this slice. Do not activate hosted routes or build UI here.

## Prerequisites and decisions

Required tasks: 10-behavior, 12-behavior, 15-behavior. Read their handoff **interface section only**.
Decision records: devices. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [PRD-29-01](../../../specification/product/29-offline-capture-and-synchronization.md#prd-29-01)
- [PRD-29-02](../../../specification/product/29-offline-capture-and-synchronization.md#prd-29-02)
- [PRD-29-03](../../../specification/product/29-offline-capture-and-synchronization.md#prd-29-03)
- [PRD-29-04](../../../specification/product/29-offline-capture-and-synchronization.md#prd-29-04)
- [PRD-29-05](../../../specification/product/29-offline-capture-and-synchronization.md#prd-29-05)
- [PRD-29-06](../../../specification/product/29-offline-capture-and-synchronization.md#prd-29-06)
- [PRD-29-07](../../../specification/product/29-offline-capture-and-synchronization.md#prd-29-07)
- [PRD-29-08](../../../specification/product/29-offline-capture-and-synchronization.md#prd-29-08)
- [PRD-29-09](../../../specification/product/29-offline-capture-and-synchronization.md#prd-29-09)
- [PRD-29-10](../../../specification/product/29-offline-capture-and-synchronization.md#prd-29-10)
- [PRD-29-11](../../../specification/product/29-offline-capture-and-synchronization.md#prd-29-11)
- [PRD-29-12](../../../specification/product/29-offline-capture-and-synchronization.md#prd-29-12)
- [PRD-29-13](../../../specification/product/29-offline-capture-and-synchronization.md#prd-29-13)
- [PRD-29-14](../../../specification/product/29-offline-capture-and-synchronization.md#prd-29-14)
- [PRD-29-15](../../../specification/product/29-offline-capture-and-synchronization.md#prd-29-15)
- [PRD-29-16](../../../specification/product/29-offline-capture-and-synchronization.md#prd-29-16)
- [PRD-29-17](../../../specification/product/29-offline-capture-and-synchronization.md#prd-29-17)
- [PRD-29-18](../../../specification/product/29-offline-capture-and-synchronization.md#prd-29-18)
- [PRD-29-19](../../../specification/product/29-offline-capture-and-synchronization.md#prd-29-19)
- [PRD-29-20](../../../specification/product/29-offline-capture-and-synchronization.md#prd-29-20)
- [PRD-29-21](../../../specification/product/29-offline-capture-and-synchronization.md#prd-29-21)
- [PRD-29-22](../../../specification/product/29-offline-capture-and-synchronization.md#prd-29-22)
- [WF-21-01](../../../specification/workflows/21-7-poor-connection-and-guided-correction.md#wf-21-01)
- [WF-21-02](../../../specification/workflows/21-7-poor-connection-and-guided-correction.md#wf-21-02)
- [WF-23-01](../../../specification/workflows/23-one-problem-one-guided-resolution.md#wf-23-01)
- [WF-23-02](../../../specification/workflows/23-one-problem-one-guided-resolution.md#wf-23-02)
- [WF-23-03](../../../specification/workflows/23-one-problem-one-guided-resolution.md#wf-23-03)
- [WF-23-04](../../../specification/workflows/23-one-problem-one-guided-resolution.md#wf-23-04)
- [WF-23-05](../../../specification/workflows/23-one-problem-one-guided-resolution.md#wf-23-05)
- [WF-23-06](../../../specification/workflows/23-one-problem-one-guided-resolution.md#wf-23-06)
- [WF-23-07](../../../specification/workflows/23-one-problem-one-guided-resolution.md#wf-23-07)
- [ARC-04-09](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-09)
- [ARC-03-13](../../../specification/architecture/03-data-model-contract.md#arc-03-13)

- `src/lib/sync-types.ts` — SyncEnvelope
- `src/lib/offline/outbox.ts` — syncOfflineOperations
- `src/server/commands/local.ts` — LocalCommandService

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Add the required typed contract/domain validation and migration definitions; preserve standard SQL and document backward compatibility or forward repair. Coordinator owns migration numbering. Do not apply migrations to a provider.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: Replay one dependency chain with a partial acknowledgement and corrected rejection; verify identities and pending work.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/16-contract-01.md`.
Allowed write roots: `docs/implementation/state/tasks/16-contract-01.md`, `docs/openapi.yaml`, `src/domain/`, `src/server/persistence/contracts.ts`, `supabase/migrations/`. Narrow these further at dispatch.
