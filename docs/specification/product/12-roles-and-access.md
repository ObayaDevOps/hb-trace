# Roles and access

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Roles and access](../../../HB-TRACE-V1-PLAN.md#roles-and-access)

<a id="prd-12-01"></a>
<!-- requirement:PRD-12-01 -->
| Role | Primary permissions |
| --- | --- |
| Production staff | Capture permitted production records, print forms, upload completed forms and read current SOPs. |
<!-- /requirement:PRD-12-01 -->

<a id="prd-12-02"></a>
<!-- requirement:PRD-12-02 -->
| Role | Primary permissions |
| --- | --- |
| Collection/procurement staff | Register or select farmers/apiaries, capture purchases offline, issue receipts and record farmer confirmation or disputes. |
<!-- /requirement:PRD-12-02 -->

<a id="prd-12-03"></a>
<!-- requirement:PRD-12-03 -->
| Role | Primary permissions |
| --- | --- |
| Supervisor | Review production/form records, request corrections and oversee daily completion. |
<!-- /requirement:PRD-12-03 -->

<a id="prd-12-04"></a>
<!-- requirement:PRD-12-04 -->
| Role | Primary permissions |
| --- | --- |
| Quality manager | Control templates/SOPs, review results, place holds, release batches and close corrective actions. |
<!-- /requirement:PRD-12-04 -->

<a id="prd-12-05"></a>
<!-- requirement:PRD-12-05 -->
| Role | Primary permissions |
| --- | --- |
| Administrator | Manage users, deployment configuration, backups and technical operations; no automatic quality authority. |
<!-- /requirement:PRD-12-05 -->

<a id="prd-12-06"></a>
<!-- requirement:PRD-12-06 -->
| Role | Primary permissions |
| --- | --- |
| Auditor | Time-limited, read-only access to approved evidence packs and document history. |
<!-- /requirement:PRD-12-06 -->

<a id="prd-12-07"></a>
<!-- requirement:PRD-12-07 -->
| Role | Primary permissions |
| --- | --- |
| Public visitor | View only the approved, privacy-safe verification fields for a valid public code. |
<!-- /requirement:PRD-12-07 -->

<a id="prd-12-08"></a>
<!-- requirement:PRD-12-08 -->
Enforce permissions on the server for every operation. Interface visibility is not an access-control mechanism.
Use least privilege and keep administrative actions in the audit history.
<!-- /requirement:PRD-12-08 -->
