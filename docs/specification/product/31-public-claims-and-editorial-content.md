# Public claims and editorial content

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Public claims and editorial content](../../../HB-TRACE-V1-PLAN.md#public-claims-and-editorial-content)

<a id="prd-31-01"></a>
<!-- requirement:PRD-31-01 -->
Compliance controls and consumer-facing claims are separate records. Passing an internal control or uploading a
certificate never publishes a marketing claim automatically.
<!-- /requirement:PRD-31-01 -->

<a id="prd-31-02"></a>
<!-- requirement:PRD-31-02 -->
V1 implements a reviewed fixed vocabulary rather than a customer-authored methodology engine. Each `PublicClaim`
records:
<!-- /requirement:PRD-31-02 -->

<a id="prd-31-03"></a>
<!-- requirement:PRD-31-03 -->
- exact consumer-facing wording and optional plain-language explanation;
<!-- /requirement:PRD-31-03 -->

<a id="prd-31-04"></a>
<!-- requirement:PRD-31-04 -->
- claim type, owner, approver and applicable product/batches;
<!-- /requirement:PRD-31-04 -->

<a id="prd-31-05"></a>
<!-- requirement:PRD-31-05 -->
- one or more links to the exact transactions, measurements, reviews or approved evidence that support it;
<!-- /requirement:PRD-31-05 -->

<a id="prd-31-06"></a>
<!-- requirement:PRD-31-06 -->
- evidence sufficiency decision and any limitations or qualifications;
<!-- /requirement:PRD-31-06 -->

<a id="prd-31-07"></a>
<!-- requirement:PRD-31-07 -->
- valid-from, expiry/review and withdrawal dates;
<!-- /requirement:PRD-31-07 -->

<a id="prd-31-08"></a>
<!-- requirement:PRD-31-08 -->
- approval status and a versioned history of wording/evidence changes; and
<!-- /requirement:PRD-31-08 -->

<a id="prd-31-09"></a>
<!-- requirement:PRD-31-09 -->
- which supporting details may be shown publicly versus only to staff/auditors.
<!-- /requirement:PRD-31-09 -->

<a id="prd-31-10"></a>
<!-- requirement:PRD-31-10 -->
Claims such as “organic,” “fair price,” “raw,” “unheated,” “traceable” or “UNBS certified” require their own
approved definitions and evidence rules. Do not infer one from another, and do not claim certification from
internal readiness records alone. When support expires, is superseded or is disputed, affected claims are queued
for review and can be withdrawn without deleting the underlying batch history.
<!-- /requirement:PRD-31-10 -->

<a id="prd-31-11"></a>
<!-- requirement:PRD-31-11 -->
Maintain two actor-content layers:
<!-- /requirement:PRD-31-11 -->

<a id="prd-31-12"></a>
<!-- requirement:PRD-31-12 -->
1. **Operational actor profile:** private identity, contact, consent, apiary/location and transaction data used to
   run traceability.
<!-- /requirement:PRD-31-12 -->

<a id="prd-31-13"></a>
<!-- requirement:PRD-31-13 -->
2. **Public actor profile:** separately consented and approved display name/pseudonym, approximate location,
   photograph and biography used in consumer storytelling.
<!-- /requirement:PRD-31-13 -->

<a id="prd-31-14"></a>
<!-- requirement:PRD-31-14 -->
PostgreSQL holds application-owned editorial revisions, approval, consent and links to operational subjects.
Supabase Storage holds image bytes. Quantitative statements require a defined source/calculation. Editorial
changes cannot modify quantities, source attribution, dates, payments, quality decisions or lineage.
<!-- /requirement:PRD-31-14 -->
