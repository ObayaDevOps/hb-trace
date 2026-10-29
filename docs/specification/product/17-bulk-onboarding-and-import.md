# Bulk onboarding and import

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Bulk onboarding and import](../../../HB-TRACE-V1-PLAN.md#bulk-onboarding-and-import)

<a id="prd-17-01"></a>
<!-- requirement:PRD-17-01 -->
- Provide downloadable CSV/XLSX templates for farmers and apiaries with field definitions and examples.
<!-- /requirement:PRD-17-01 -->

<a id="prd-17-02"></a>
<!-- requirement:PRD-17-02 -->
- Use fixed, versioned template columns. Let an authorised user preview normalized data and validate every row
  before committing. Convert exceptional legacy spreadsheets through a reviewed one-off script rather than
  building arbitrary column mapping into V1.
<!-- /requirement:PRD-17-02 -->

<a id="prd-17-03"></a>
<!-- requirement:PRD-17-03 -->
- Validate required fields, identifiers, coordinates, phone formats where collected, relationships and consent
  metadata. Report errors by row and field without importing invalid rows silently.
<!-- /requirement:PRD-17-03 -->

<a id="prd-17-04"></a>
<!-- requirement:PRD-17-04 -->
- Detect likely duplicates using stable external IDs and reviewable combinations of name, phone, location and
  apiary data. Never merge people automatically on a fuzzy name match.
<!-- /requirement:PRD-17-04 -->

<a id="prd-17-05"></a>
<!-- requirement:PRD-17-05 -->
- Support dry runs, idempotent re-submission and an import summary showing created, matched, rejected and skipped
  records with reasons.
<!-- /requirement:PRD-17-05 -->

<a id="prd-17-06"></a>
<!-- requirement:PRD-17-06 -->
- Preserve the original import file privately, its hash, uploader, mapping/version and row-level outcomes in the
  audit history. Apply the same server validation used for individually entered records.
<!-- /requirement:PRD-17-06 -->
