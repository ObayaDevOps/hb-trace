# 28-contract-02: Comprehensive validation and pilot — contract slice 2

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by comprehensive validation and pilot.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
This is a governance/evidence task; do not modify application code.

## Prerequisites and decisions

Required tasks: 28-contract-01. Read their handoff **interface section only**.
Decision records: platform, quality, privacy, devices, recovery, public-status, messaging. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [PRD-44-14](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-14)
- [PRD-44-15](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-15)
- [PRD-44-16](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-16)
- [PRD-44-17](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-17)
- [PRD-44-18](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-18)
- [PRD-44-19](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-19)
- [PRD-44-20](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-20)
- [PRD-44-21](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-21)
- [PRD-44-22](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-22)
- [PRD-44-23](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-23)
- [PRD-44-24](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-24)
- [PRD-47-01](../../../specification/product/47-traceability-proof-and-operational-acceptance--2026-10-28-revision.md#prd-47-01)
- [WF-31-01](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-01)
- [WF-31-02](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-02)
- [WF-31-03](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-03)
- [WF-31-04](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-04)
- [WF-31-05](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-05)
- [WF-31-06](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-06)
- [WF-31-07](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-07)
- [WF-31-08](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-08)
- [WF-31-09](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-09)
- [WF-31-10](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-10)
- [WF-31-11](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-11)
- [WF-31-12](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-12)
- [WF-31-13](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-13)
- [WF-31-14](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-14)
- [WF-31-15](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-15)
- [WF-31-16](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-16)
- [WF-31-17](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-17)
- [WF-31-18](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-18)
- [WF-31-19](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-19)
- [WF-31-20](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-20)
- [WF-31-21](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-21)
- [WF-31-22](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-22)
- [WF-31-23](../../../specification/workflows/31-acceptance-scenarios.md#wf-31-23)

- `src/lib/runtime-config.ts` — runtimeConfig

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Record decisions, ownership, scope and evidence gaps; never mark an unresolved policy approved.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: This increment owns the later comprehensive suite; do not run it during ordinary feature development.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/28-contract-02.md`.
Allowed write roots: `docs/implementation/`, `docs/staff-quick-start.md`. Narrow these further at dispatch.
