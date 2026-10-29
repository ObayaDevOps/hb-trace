# Operations dashboard

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Operations dashboard](../../../HB-TRACE-V1-PLAN.md#operations-dashboard)

<a id="prd-18-01"></a>
<!-- requirement:PRD-18-01 -->
The default staff dashboard must answer what needs attention now, not merely display totals. Subject to role, it
shows:
<!-- /requirement:PRD-18-01 -->

<a id="prd-18-02"></a>
<!-- requirement:PRD-18-02 -->
- current honeycomb, honey and beeswax stock with quantities, locations and aging;
<!-- /requirement:PRD-18-02 -->

<a id="prd-18-03"></a>
<!-- requirement:PRD-18-03 -->
- recent purchases, transformations, measurements, packing runs and form submissions;
<!-- /requirement:PRD-18-03 -->

<a id="prd-18-04"></a>
<!-- requirement:PRD-18-04 -->
- held/quarantined batches and unresolved non-conformances;
<!-- /requirement:PRD-18-04 -->

<a id="prd-18-05"></a>
<!-- requirement:PRD-18-05 -->
- batches or scheduled tasks missing required evidence;
<!-- /requirement:PRD-18-05 -->

<a id="prd-18-06"></a>
<!-- requirement:PRD-18-06 -->
- records, documents, claims and forms awaiting review;
<!-- /requirement:PRD-18-06 -->

<a id="prd-18-07"></a>
<!-- requirement:PRD-18-07 -->
- offline devices/submissions with failed or long-pending synchronization; and
<!-- /requirement:PRD-18-07 -->

<a id="prd-18-08"></a>
<!-- requirement:PRD-18-08 -->
- expiring SOP reviews, minimum staff qualification/medical-certificate validity metadata and certification
  actions where permitted. Detailed health information remains outside HB-TRACE unless a documented requirement,
  lawful basis and stricter access policy are approved.
<!-- /requirement:PRD-18-08 -->

<a id="prd-18-09"></a>
<!-- requirement:PRD-18-09 -->
Every dashboard number links to the filtered underlying records. Counts are calculated from operational data and
display a last-updated/synchronization state; they are not separately editable statistics.
<!-- /requirement:PRD-18-09 -->
