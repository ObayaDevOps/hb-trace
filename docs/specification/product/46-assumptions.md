# Assumptions

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Assumptions](../../../HB-TRACE-V1-PLAN.md#assumptions)

<a id="prd-46-01"></a>
<!-- requirement:PRD-46-01 -->
- V1 is a single-producer application using shared managed-service infrastructure with logically isolated projects;
  it is not an application-level multi-tenant SaaS database.
<!-- /requirement:PRD-46-01 -->

<a id="prd-46-02"></a>
<!-- requirement:PRD-46-02 -->
- Supabase hosts standard PostgreSQL and Supabase Auth for V1; Supabase Storage hosts the approved asset classes. Docker,
  self-hosted PostgreSQL and self-hosted object storage are not used until the first funded iteration.
<!-- /requirement:PRD-46-02 -->

<a id="prd-46-03"></a>
<!-- requirement:PRD-46-03 -->
- Honey and beeswax share one lineage model, but only honey has a supplied product specification in the current
  document set; the quality owner will obtain and assess the currently listed beeswax specification.
<!-- /requirement:PRD-46-03 -->

<a id="prd-46-04"></a>
<!-- requirement:PRD-46-04 -->
- Durable QR bucket labels are standard practice, with provenance-complete offline fallback identifiers.
<!-- /requirement:PRD-46-04 -->

<a id="prd-46-05"></a>
<!-- requirement:PRD-46-05 -->
- Laboratory failures flag batches and contributors for investigation but do not automatically assign source fault.
<!-- /requirement:PRD-46-05 -->

<a id="prd-46-06"></a>
<!-- requirement:PRD-46-06 -->
- Authorised humans control holds, release, corrective action, publication and final compliance decisions.
<!-- /requirement:PRD-46-06 -->

<a id="prd-46-07"></a>
<!-- requirement:PRD-46-07 -->
- V1 supports batch/lot codes, not a unique serial for every jar.
<!-- /requirement:PRD-46-07 -->

<a id="prd-46-08"></a>
<!-- requirement:PRD-46-08 -->
- V1 preserves migration seams through stable IDs, standard SQL and provider adapters without implementing Docker,
  self-hosted object storage, self-hosted services, a runtime plugin SDK or other speculative platform infrastructure.
<!-- /requirement:PRD-46-08 -->
