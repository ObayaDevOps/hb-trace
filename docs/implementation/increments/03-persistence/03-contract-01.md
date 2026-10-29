# 03-contract-01: Durable persistence — contract slice 1

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by durable persistence.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
Implement the minimum domain types/validation and reviewed migration definitions for this slice. Do not activate hosted routes or build UI here.

## Prerequisites and decisions

Required tasks: 02-behavior. Read their handoff **interface section only**.
Decision records: platform. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [ARC-04-01](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-01)
- [ARC-04-02](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-02)
- [ARC-04-03](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-03)
- [ARC-04-04](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-04)
- [ARC-04-05](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-05)
- [ARC-04-06](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-06)
- [ARC-04-07](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-07)
- [ARC-04-08](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-08)
- [ARC-04-09](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-09)
- [ARC-04-10](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-10)
- [ARC-04-11](../../../specification/architecture/04-command-and-synchronization-interface.md#arc-04-11)

- `src/server/persistence/contracts.ts` — PersistenceAdapter
- `src/server/persistence/in-memory.ts` — inspect only the relevant exported boundary
- `src/server/commands/local.ts` — PurchaseCommandResult

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Add the required typed contract/domain validation and migration definitions; preserve standard SQL and document backward compatibility or forward repair. Coordinator owns migration numbering. Do not apply migrations to a provider.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: Use a focused transaction exercise for retry idempotency and competing allocation/hold, not a full provider suite.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/03-contract-01.md`.
Allowed write roots: `docs/implementation/state/tasks/03-contract-01.md`, `docs/openapi.yaml`, `src/domain/`, `src/server/persistence/contracts.ts`, `supabase/migrations/`. Narrow these further at dispatch.
