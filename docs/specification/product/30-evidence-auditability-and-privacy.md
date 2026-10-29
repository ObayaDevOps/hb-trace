# Evidence, auditability and privacy

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Evidence, auditability and privacy](../../../HB-TRACE-V1-PLAN.md#evidence-auditability-and-privacy)

<a id="prd-30-01"></a>
<!-- requirement:PRD-30-01 -->
- Keep operational records, append-only audit events and asset bytes as separate concerns. Supabase Storage is an asset
  provider, not the system of record for lineage, reviews, retention decisions or audit events.
<!-- /requirement:PRD-30-01 -->

<a id="prd-30-02"></a>
<!-- requirement:PRD-30-02 -->
- Upload through an authorised HB-TRACE backend endpoint; never put a Supabase Storage write/read token in browser code.
  Create a PostgreSQL upload intent first, then stream the asset to Supabase Storage, verify it and complete the provider
  mapping. Interrupted uploads and unreferenced provider assets are reconciled by a job.
<!-- /requirement:PRD-30-02 -->

<a id="prd-30-03"></a>
<!-- requirement:PRD-30-03 -->
- Hash original bytes with SHA-256 and retain media type, byte size, original filename, page count where applicable,
  uploader, times and provider metadata. Provider checksums do not replace the application hash
  or separate evidence-link records.
<!-- /requirement:PRD-30-03 -->

<a id="prd-30-04"></a>
<!-- requirement:PRD-30-04 -->
- Public images and private originals use separate Supabase Storage buckets and access policies. Private
  buckets deny anonymous retrieval. The backend authorizes every signed-download request; credentials remain
  server-only. Signed links are bearer capabilities valid until expiry; use a short policy-defined lifetime.
<!-- /requirement:PRD-30-04 -->

<a id="prd-30-05"></a>
<!-- requirement:PRD-30-05 -->
- Private evidence remains private from initial upload. Publication creates separately approved, sanitized
  derivatives; never change an evidence bucket to public. Test access denial, expiry and exports before go-live.
<!-- /requirement:PRD-30-05 -->

<a id="prd-30-06"></a>
<!-- requirement:PRD-30-06 -->
- Treat new assets as quarantined. Verify allowed type, size, decodability and malware status through the managed
  worker before making them reviewable. Generate safe previews; never transform or replace the original evidence.
<!-- /requirement:PRD-30-06 -->

<a id="prd-30-07"></a>
<!-- requirement:PRD-30-07 -->
- Approved evidence is corrected only through linked superseding records. V1 does not claim WORM/object-lock
  protection from Supabase Storage; any required retention-lock capability needs a separately verified provider decision.
<!-- /requirement:PRD-30-07 -->

<a id="prd-30-08"></a>
<!-- requirement:PRD-30-08 -->
- Log authorised access to sensitive reports and staff records. Confirm encryption, region, subprocessors,
  retention and deletion behavior in the Supabase contract before production use.
<!-- /requirement:PRD-30-08 -->

<a id="prd-30-09"></a>
<!-- requirement:PRD-30-09 -->
- Public QR pages exclude farmer phone numbers, staff signatures, qualification/medical documents, exact private
  home coordinates, internal investigations and unapproved laboratory information.
<!-- /requirement:PRD-30-09 -->

<a id="prd-30-10"></a>
<!-- requirement:PRD-30-10 -->
- Create a field-level data inventory stating purpose, lawful basis, access, public eligibility, retention and
  correction/deletion handling. Operational traceability does not use consent automatically where another lawful
  basis applies. Public profile/story use is separately opt-in and withdrawable.
<!-- /requirement:PRD-30-10 -->

<a id="prd-30-11"></a>
<!-- requirement:PRD-30-11 -->
- Define evidence, account, audit, consent and paper-record retention periods with the quality manager and legal
  adviser. Resolve how lawful erasure or anonymisation interacts with retained transaction and audit evidence.
<!-- /requirement:PRD-30-11 -->

<a id="prd-30-12"></a>
<!-- requirement:PRD-30-12 -->
- Complete Uganda PDPO controller/processor obligations, processor agreements and any cross-border transfer
  assessment for Supabase, hosting, email and analytics before personal data is imported.
<!-- /requirement:PRD-30-12 -->

<a id="prd-30-13"></a>
<!-- requirement:PRD-30-13 -->
- Third-party analytics are prohibited on authenticated staff routes. Public analytics require a separate privacy,
  consent and data-transfer decision and must never receive internal IDs or private batch/farmer attributes.
<!-- /requirement:PRD-30-13 -->
