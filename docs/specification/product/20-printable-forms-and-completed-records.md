# Printable forms and completed records

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Printable forms and completed records](../../../HB-TRACE-V1-PLAN.md#printable-forms-and-completed-records)

<a id="prd-20-01"></a>
<!-- requirement:PRD-20-01 -->
The initial controlled form library includes:
<!-- /requirement:PRD-20-01 -->

<a id="prd-20-02"></a>
<!-- requirement:PRD-20-02 -->
- Cleaning Record
<!-- /requirement:PRD-20-02 -->

<a id="prd-20-03"></a>
<!-- requirement:PRD-20-03 -->
- Processing & Blending Form
<!-- /requirement:PRD-20-03 -->

<a id="prd-20-04"></a>
<!-- requirement:PRD-20-04 -->
- Packed Product Record
<!-- /requirement:PRD-20-04 -->

<a id="prd-20-05"></a>
<!-- requirement:PRD-20-05 -->
- Equipment Maintenance Record
<!-- /requirement:PRD-20-05 -->

<a id="prd-20-06"></a>
<!-- requirement:PRD-20-06 -->
- Employee Training Record
<!-- /requirement:PRD-20-06 -->

<a id="prd-20-07"></a>
<!-- requirement:PRD-20-07 -->
- Non-Conforming Materials Record
<!-- /requirement:PRD-20-07 -->

<a id="prd-20-08"></a>
<!-- requirement:PRD-20-08 -->
- Packaging Inventory Record
<!-- /requirement:PRD-20-08 -->

<a id="prd-20-09"></a>
<!-- requirement:PRD-20-09 -->
Staff can open/download the approved A4 PDF and print it. After the paper record is completed and signed,
staff select the form type, photograph one or more pages or upload a PDF, confirm completion date, identify the
responsible person and link the relevant batch/lot where applicable.
<!-- /requirement:PRD-20-09 -->

<a id="prd-20-10"></a>
<!-- requirement:PRD-20-10 -->
For V1, the signed paper remains the authoritative floor record and the uploaded original-resolution image/PDF
is its retrievable evidence copy. The quality manager must define physical storage location and retention. The
system preserves the original upload, capture/upload times, uploader, form/template version, page order, hash,
review state and correction history. A reviewer can verify it, request a clearer upload or link it to corrective
action without overwriting the original. PostgreSQL stores the evidence identity and metadata; Supabase Storage stores the
asset bytes under the private-asset controls in the evidence section.
<!-- /requirement:PRD-20-10 -->

<a id="prd-20-11"></a>
<!-- requirement:PRD-20-11 -->
Before pilot rollout, the quality manager must add document codes, versions, owners, approvals, effective dates
and review dates to any supplied form that lacks controlled-document metadata.
<!-- /requirement:PRD-20-11 -->
