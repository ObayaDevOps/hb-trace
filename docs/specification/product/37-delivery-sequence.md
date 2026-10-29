# Delivery sequence

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Delivery sequence](../../../HB-TRACE-V1-PLAN.md#delivery-sequence)

<a id="prd-37-01"></a>
<!-- requirement:PRD-37-01 -->
The PWA work follows three delivery stages within the phases below. Completing installation does not mark field
reliability or device acceptance complete.
<!-- /requirement:PRD-37-01 -->

<a id="prd-37-02"></a>
<!-- requirement:PRD-37-02 -->
| PWA stage | Deliverable | Phase gate |
| --- | --- | --- |
| Installation | HTTPS, linked manifest, verified icons, staff launch/sign-in, standalone navigation and installation guidance. | Phase 1; installed launch demonstrated on supported Android and iPhone/iPad devices. |
<!-- /requirement:PRD-37-02 -->

<a id="prd-37-03"></a>
<!-- requirement:PRD-37-03 -->
| PWA stage | Deliverable | Phase gate |
| --- | --- | --- |
| Dependable field operation | Prepared offline shell, account-scoped records/attachments, storage limits, bounded offline session, sync recovery and safe upgrades. | Phase 2; cold offline restart and pending-work recovery pass on actual phones. |
<!-- /requirement:PRD-37-03 -->

<a id="prd-37-04"></a>
<!-- requirement:PRD-37-04 -->
| PWA stage | Deliverable | Phase gate |
| --- | --- | --- |
| Operational validation | Server-owned due tasks, optional push, printer/device validation and complete outage/update/recovery exercises. | Reminder integration in Phase 3; real-device release-candidate acceptance in Phase 4. |
<!-- /requirement:PRD-37-04 -->
