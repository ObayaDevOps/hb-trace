# 28-contract-01: Comprehensive validation and pilot — contract slice 1

Status: planned; coordinator review is required before dispatch. This packet is not proof of implementation.

## Outcome and boundaries

Translate only the attached requirement slice into the contracts and schema changes needed by comprehensive validation and pilot.
Reconcile existing code first. Do not implement unrelated features or load other source plans.
This is a governance/evidence task; do not modify application code.

## Prerequisites and decisions

Required tasks: 15-behavior, 17-behavior, 18-behavior, 19-behavior, 20-behavior, 24-behavior, 25-behavior, 27-behavior. Read their handoff **interface section only**.
Decision records: platform, quality, privacy, devices, recovery, public-status, messaging. Unresolved decisions block dependent behavior, not unrelated analysis.

## Read and inspect

- [PRD-42-01](../../../specification/product/42-phase-4--pilot-acceptance-and-cut-over.md#prd-42-01)
- [PRD-42-02](../../../specification/product/42-phase-4--pilot-acceptance-and-cut-over.md#prd-42-02)
- [PRD-42-03](../../../specification/product/42-phase-4--pilot-acceptance-and-cut-over.md#prd-42-03)
- [PRD-42-04](../../../specification/product/42-phase-4--pilot-acceptance-and-cut-over.md#prd-42-04)
- [PRD-42-05](../../../specification/product/42-phase-4--pilot-acceptance-and-cut-over.md#prd-42-05)
- [PRD-43-01](../../../specification/product/43-testing-requirements.md#prd-43-01)
- [PRD-43-02](../../../specification/product/43-testing-requirements.md#prd-43-02)
- [PRD-43-03](../../../specification/product/43-testing-requirements.md#prd-43-03)
- [PRD-43-04](../../../specification/product/43-testing-requirements.md#prd-43-04)
- [PRD-43-05](../../../specification/product/43-testing-requirements.md#prd-43-05)
- [PRD-43-06](../../../specification/product/43-testing-requirements.md#prd-43-06)
- [PRD-43-07](../../../specification/product/43-testing-requirements.md#prd-43-07)
- [PRD-43-08](../../../specification/product/43-testing-requirements.md#prd-43-08)
- [PRD-43-09](../../../specification/product/43-testing-requirements.md#prd-43-09)
- [PRD-43-10](../../../specification/product/43-testing-requirements.md#prd-43-10)
- [PRD-43-11](../../../specification/product/43-testing-requirements.md#prd-43-11)
- [PRD-43-12](../../../specification/product/43-testing-requirements.md#prd-43-12)
- [PRD-43-13](../../../specification/product/43-testing-requirements.md#prd-43-13)
- [PRD-43-14](../../../specification/product/43-testing-requirements.md#prd-43-14)
- [PRD-43-15](../../../specification/product/43-testing-requirements.md#prd-43-15)
- [PRD-43-16](../../../specification/product/43-testing-requirements.md#prd-43-16)
- [PRD-43-17](../../../specification/product/43-testing-requirements.md#prd-43-17)
- [PRD-44-01](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-01)
- [PRD-44-02](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-02)
- [PRD-44-03](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-03)
- [PRD-44-04](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-04)
- [PRD-44-05](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-05)
- [PRD-44-06](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-06)
- [PRD-44-07](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-07)
- [PRD-44-08](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-08)
- [PRD-44-09](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-09)
- [PRD-44-10](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-10)
- [PRD-44-11](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-11)
- [PRD-44-12](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-12)
- [PRD-44-13](../../../specification/product/44-pilot-acceptance-criteria.md#prd-44-13)

- `src/lib/runtime-config.ts` — runtimeConfig

## Work

1. Compare the attached requirements with the named code boundaries; classify each as already satisfied, changed or missing.
2. Define only this slice's fields, units, stable identities, versions, permissions and failure results. Reuse accepted predecessor exports. Record exact consumed/produced symbols in the handoff.
3. Record decisions, ownership, scope and evidence gaps; never mark an unresolved policy approved.
4. Map every attached requirement to an implementation symbol or a named follow-on behavior task. Record conflicts explicitly; do not silently choose a new product rule.

## Verification and handoff

Use inspection or one existing focused check for this contract slice. Do not build or run the full suite.
Relevant core behavior: This increment owns the later comprehensive suite; do not run it during ordinary feature development.
Return changed paths, exact exported interfaces/schema, requirement dispositions, one check result and remaining blockers to `state/tasks/28-contract-01.md`.
Allowed write roots: `docs/implementation/`, `docs/staff-quick-start.md`. Narrow these further at dispatch.

## Pilot prerequisite

All core task packets in increments 01–27 must be accepted, including their UI, before pilot acceptance. Increment 26 is separately activated; include its acceptance evidence if enabled. This gate checks evidence by ID without reading all task implementations.
