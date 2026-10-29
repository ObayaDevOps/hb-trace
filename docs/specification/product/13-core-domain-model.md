# Core domain model

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Core domain model](../../../HB-TRACE-V1-PLAN.md#core-domain-model)

<a id="prd-13-01"></a>
<!-- requirement:PRD-13-01 -->
The shared model owns:
<!-- /requirement:PRD-13-01 -->

<a id="prd-13-02"></a>
<!-- requirement:PRD-13-02 -->
- organisation, facility, actor, role, consent, farmer, apiary and location;
<!-- /requirement:PRD-13-02 -->

<a id="prd-13-03"></a>
<!-- requirement:PRD-13-03 -->
- traceable unit, container, identifier, measurement and custody event;
<!-- /requirement:PRD-13-03 -->

<a id="prd-13-04"></a>
<!-- requirement:PRD-13-04 -->
- transformation, input allocation, output, batch and packaging run;
<!-- /requirement:PRD-13-04 -->

<a id="prd-13-05"></a>
<!-- requirement:PRD-13-05 -->
- sample, laboratory result, quality review, disposition and non-conformance;
<!-- /requirement:PRD-13-05 -->

<a id="prd-13-06"></a>
<!-- requirement:PRD-13-06 -->
- requirement, control, evidence attachment and corrective action;
<!-- /requirement:PRD-13-06 -->

<a id="prd-13-07"></a>
<!-- requirement:PRD-13-07 -->
- controlled document, form template, document version, staff acknowledgement and completed-form evidence;
<!-- /requirement:PRD-13-07 -->

<a id="prd-13-08"></a>
<!-- requirement:PRD-13-08 -->
- purchase receipt, farmer acknowledgement, farmer dispute and bulk import job;
<!-- /requirement:PRD-13-08 -->

<a id="prd-13-09"></a>
<!-- requirement:PRD-13-09 -->
- operational actor profile and separately approved public actor profile;
<!-- /requirement:PRD-13-09 -->

<a id="prd-13-10"></a>
<!-- requirement:PRD-13-10 -->
- fixed public claim, claim-evidence link, approved editorial revision reference and public-verification publication
  revision;
<!-- /requirement:PRD-13-10 -->

<a id="prd-13-11"></a>
<!-- requirement:PRD-13-11 -->
- batch withdrawal/recall and downstream-impact assessment; and
<!-- /requirement:PRD-13-11 -->

<a id="prd-13-12"></a>
<!-- requirement:PRD-13-12 -->
- immutable audit event.
<!-- /requirement:PRD-13-12 -->

<a id="prd-13-13"></a>
<!-- requirement:PRD-13-13 -->
Honey-specific record shapes, labels, validation, permitted states, quality checks and evidence mappings live in a
versioned compile-time honey module. It is an internal organization seam, not a runtime plugin SDK. Historical
records retain the schema/rule version under which they were accepted. A general `CommodityModule` contract is
designed only after a funded second commodity tests the boundary.
<!-- /requirement:PRD-13-13 -->
