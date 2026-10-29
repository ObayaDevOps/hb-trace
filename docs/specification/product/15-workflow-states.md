# Workflow states

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Workflow states](../../../HB-TRACE-V1-PLAN.md#workflow-states)

<a id="prd-15-01"></a>
<!-- requirement:PRD-15-01 -->
Define and test business transitions before implementation. Keep independent state dimensions independent:
<!-- /requirement:PRD-15-01 -->

<a id="prd-15-02"></a>
<!-- requirement:PRD-15-02 -->
| Concern/record | V1 state flow or derivation |
| --- | --- |
| Purchase/harvest | Draft → submitted → accepted or rejected → closed |
<!-- /requirement:PRD-15-02 -->

<a id="prd-15-03"></a>
<!-- requirement:PRD-15-03 -->
| Concern/record | V1 state flow or derivation |
| --- | --- |
| Purchase receipt | Draft → issued → farmer confirmed, confirmation unavailable or disputed; any dispute → resolved/closed |
<!-- /requirement:PRD-15-03 -->

<a id="prd-15-04"></a>
<!-- requirement:PRD-15-04 -->
| Concern/record | V1 state flow or derivation |
| --- | --- |
| Bulk import | Uploaded → validated → correction required or ready → committed → completed/partially rejected |
<!-- /requirement:PRD-15-04 -->

<a id="prd-15-05"></a>
<!-- requirement:PRD-15-05 -->
| Concern/record | V1 state flow or derivation |
| --- | --- |
| Material availability | Derived from produced, adjusted, reserved, allocated, discarded and packaged ledger quantities; it is not a manually edited workflow state. |
<!-- /requirement:PRD-15-05 -->

<a id="prd-15-06"></a>
<!-- requirement:PRD-15-06 -->
| Concern/record | V1 state flow or derivation |
| --- | --- |
| Quality disposition | Pending review → held/quarantined, released or rejected; a released lot may later become held or recalled through an authorised action. |
<!-- /requirement:PRD-15-06 -->

<a id="prd-15-07"></a>
<!-- requirement:PRD-15-07 -->
| Concern/record | V1 state flow or derivation |
| --- | --- |
| Transformation | Draft → committed; correction creates a linked reversal/amendment rather than rewriting committed edges. |
<!-- /requirement:PRD-15-07 -->

<a id="prd-15-08"></a>
<!-- requirement:PRD-15-08 -->
| Concern/record | V1 state flow or derivation |
| --- | --- |
| Packaging run | Draft → committed → released or held → closed/withdrawn/recalled. |
<!-- /requirement:PRD-15-08 -->

<a id="prd-15-09"></a>
<!-- requirement:PRD-15-09 -->
| Concern/record | V1 state flow or derivation |
| --- | --- |
| Laboratory result | Pending → received → reviewed → accepted, disputed or superseded |
<!-- /requirement:PRD-15-09 -->

<a id="prd-15-10"></a>
<!-- requirement:PRD-15-10 -->
| Concern/record | V1 state flow or derivation |
| --- | --- |
| Non-conformance | Open → investigating → corrective action in progress → verified → closed |
<!-- /requirement:PRD-15-10 -->

<a id="prd-15-11"></a>
<!-- requirement:PRD-15-11 -->
| Concern/record | V1 state flow or derivation |
| --- | --- |
| Controlled document | Draft → under review → approved → effective → superseded/withdrawn |
<!-- /requirement:PRD-15-11 -->

<a id="prd-15-12"></a>
<!-- requirement:PRD-15-12 -->
| Concern/record | V1 state flow or derivation |
| --- | --- |
| Completed form | Draft → submitted → under review → verified or correction requested |
<!-- /requirement:PRD-15-12 -->

<a id="prd-15-13"></a>
<!-- requirement:PRD-15-13 -->
| Concern/record | V1 state flow or derivation |
| --- | --- |
| Fixed public claim | Draft → evidence under review → approved → expired/withdrawn/superseded; publication is tracked separately. |
<!-- /requirement:PRD-15-13 -->

<a id="prd-15-14"></a>
<!-- requirement:PRD-15-14 -->
| Concern/record | V1 state flow or derivation |
| --- | --- |
| Farmer dispute | Open → under review → corrected/rejected with reason → acknowledged/closed |
<!-- /requirement:PRD-15-14 -->

<a id="prd-15-15"></a>
<!-- requirement:PRD-15-15 -->
| Concern/record | V1 state flow or derivation |
| --- | --- |
| Public publication | Draft → approved → published → withdrawn/superseded |
<!-- /requirement:PRD-15-15 -->

<a id="prd-15-16"></a>
<!-- requirement:PRD-15-16 -->
| Concern/record | V1 state flow or derivation |
| --- | --- |
| Client operation | Pending locally → sending → acknowledged, rejected or conflicted; this state exists only in the client synchronization log. |
<!-- /requirement:PRD-15-16 -->

<a id="prd-15-17"></a>
<!-- requirement:PRD-15-17 -->
Every transition records who performed it, when, the reason and any supporting evidence. The implementation
must reject invalid transitions on the server even if an offline client submits stale state.
<!-- /requirement:PRD-15-17 -->
