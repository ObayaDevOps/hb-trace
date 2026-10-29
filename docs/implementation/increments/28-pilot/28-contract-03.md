# 28-contract-03: Comprehensive validation and pilot — contract slice 3

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by comprehensive validation and pilot.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
This is a governance/evidence task; do not modify application code.

## Prerequisites and decisions

Required tasks: 28-contract-02. Read their handoff **interface section only**.
Decision records: platform, quality, privacy, devices, recovery, public-status, messaging. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [WF-31-24](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-24)
- [WF-31-25](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-25)
- [WF-31-26](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-26)
- [WF-31-27](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-27)
- [WF-31-28](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-28)
- [WF-33-09](../../../specification/workflows/33-accepted-integrity-and-usability-refinement--2026-10-28.md#wf-33-09)

- `src/lib/runtime-config.ts` — runtimeConfig

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Record decisions, ownership, scope and evidence gaps; never mark an unresolved policy approved.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: This increment owns the later comprehensive suite; do not run it during ordinary feature development.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/28-contract-03.md`.
Allowed write roots: `docs/implementation/`, `docs/staff-quick-start.md`. Narrow these further at dispatch.
