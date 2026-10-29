# 01-contract-05: Baseline and decisions — contract slice 5

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by baseline and decisions.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
This is a governance/evidence task; do not modify application code.

## Prerequisites and decisions

Required tasks: 01-contract-04. Read their handoff **interface section only**.
Decision records: platform, quality, privacy, devices. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [WF-33-01](../../../specification/workflows/33-accepted-integrity-and-usability-refinement--2026-10-28.md#wf-33-01)
- [WF-33-10](../../../specification/workflows/33-accepted-integrity-and-usability-refinement--2026-10-28.md#wf-33-10)

- `src/lib/runtime-config.ts` — runtimeConfig

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Record decisions, ownership, scope and evidence gaps; never mark an unresolved policy approved.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: Demonstrate that a local start needs no provider credentials and that hosted persistence is not falsely reported ready.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/01-contract-05.md`.
Allowed write roots: `docs/implementation/`, `docs/staff-quick-start.md`. Narrow these further at dispatch.
