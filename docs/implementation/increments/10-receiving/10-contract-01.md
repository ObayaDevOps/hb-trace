# 10-contract-01: Receiving and reconciliation — contract slice 1

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by receiving and reconciliation.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
Implement the minimum domain types/validation and reviewed migration definitions for this slice. Do not activate hosted routes or build UI here.

## Prerequisites and decisions

Required tasks: 09-behavior. Read their handoff **interface section only**.
Decision records: quality. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [WF-13-01](../../../specification/workflows/13-arrival-is-always-recorded-first.md#wf-13-01)
- [WF-13-02](../../../specification/workflows/13-arrival-is-always-recorded-first.md#wf-13-02)
- [WF-13-03](../../../specification/workflows/13-arrival-is-always-recorded-first.md#wf-13-03)
- [WF-13-04](../../../specification/workflows/13-arrival-is-always-recorded-first.md#wf-13-04)
- [WF-13-05](../../../specification/workflows/13-arrival-is-always-recorded-first.md#wf-13-05)
- [WF-14-01](../../../specification/workflows/14-simple-display-separate-underlying-states.md#wf-14-01)
- [WF-14-02](../../../specification/workflows/14-simple-display-separate-underlying-states.md#wf-14-02)
- [WF-14-03](../../../specification/workflows/14-simple-display-separate-underlying-states.md#wf-14-03)
- [WF-14-04](../../../specification/workflows/14-simple-display-separate-underlying-states.md#wf-14-04)
- [WF-14-05](../../../specification/workflows/14-simple-display-separate-underlying-states.md#wf-14-05)
- [WF-14-06](../../../specification/workflows/14-simple-display-separate-underlying-states.md#wf-14-06)
- [WF-14-07](../../../specification/workflows/14-simple-display-separate-underlying-states.md#wf-14-07)
- [WF-14-08](../../../specification/workflows/14-simple-display-separate-underlying-states.md#wf-14-08)
- [ARC-04-09](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-09)
- [ARC-03-13](../../../specification/architecture/03-data-model-contract.md#arc-03-13)

- `src/server/persistence/contracts.ts` — TraceableLotRecord
- `src/server/commands/local.ts` — PurchaseCommandResult

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Add the required typed contract/domain validation and migration definitions; preserve standard SQL and document backward compatibility or forward repair. Coordinator owns migration numbering. Do not apply migrations to a provider.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: Receive before sync, link later, and verify one stock quantity with quality blocker unchanged.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/10-contract-01.md`.
Allowed write roots: `docs/implementation/state/tasks/10-contract-01.md`, `docs/openapi.yaml`, `src/domain/`, `src/server/persistence/contracts.ts`, `supabase/migrations/`. Narrow these further at dispatch.
