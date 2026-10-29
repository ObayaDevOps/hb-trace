# Data model contract

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/architecture-technical-spec.md — Data model contract](../../architecture-technical-spec.md#data-model-contract)

<a id="arc-03-01"></a>
<!-- requirement:ARC-03-01 -->
This is a logical model, not executable DDL or a claim that current migrations are complete.
<!-- /requirement:ARC-03-01 -->

<a id="arc-03-02"></a>
<!-- requirement:ARC-03-02 -->
| Record group | Required relationships and constraints |
| --- | --- |
| Actor/source | Application UUID, organization, farmer/apiary/location, external auth mapping, role and consent history. |
<!-- /requirement:ARC-03-02 -->

<a id="arc-03-03"></a>
<!-- requirement:ARC-03-03 -->
| Record group | Required relationships and constraints |
| --- | --- |
| Collection/receipt | Source, occurred/captured/committed times, measurements, money meanings, receipt revision and independent confirmation/dispute state. |
<!-- /requirement:ARC-03-03 -->

<a id="arc-03-04"></a>
<!-- requirement:ARC-03-04 -->
| Record group | Required relationships and constraints |
| --- | --- |
| Material/container | Material lot and reusable container are distinct; contents occupancy and movements retain time/history. Source resolution, quantity and quality are separate dimensions. |
<!-- /requirement:ARC-03-04 -->

<a id="arc-03-05"></a>
<!-- requirement:ARC-03-05 -->
| Record group | Required relationships and constraints |
| --- | --- |
| Transformation | Inputs with exact decimal allocations, outputs, operator/facility, losses and variance review; no cycles, no over-allocation, explicit attribution method. |
<!-- /requirement:ARC-03-05 -->

<a id="arc-03-06"></a>
<!-- requirement:ARC-03-06 -->
| Record group | Required relationships and constraints |
| --- | --- |
| Exposure/ancestry | Every relevant input remains an ancestor, including removed ingredients; calculated mass attribution never removes exposure relationships. |
<!-- /requirement:ARC-03-06 -->

<a id="arc-03-07"></a>
<!-- requirement:ARC-03-07 -->
| Record group | Required relationships and constraints |
| --- | --- |
| Quality | Measurements/samples/results, applicable rule version, reviews, restrictions and authorized release for the permitted next step. |
<!-- /requirement:ARC-03-07 -->

<a id="arc-03-08"></a>
<!-- requirement:ARC-03-08 -->
| Record group | Required relationships and constraints |
| --- | --- |
| Corrections | Original event, before/after values, reason, author, expected version, affected descendants and approved reconciliation. |
<!-- /requirement:ARC-03-08 -->

<a id="arc-03-09"></a>
<!-- requirement:ARC-03-09 -->
| Record group | Required relationships and constraints |
| --- | --- |
| Evidence | Asset UUID, immutable bucket/key mapping, SHA-256, size/type, page order, state, retention, evidence links and supersession. |
<!-- /requirement:ARC-03-09 -->

<a id="arc-03-10"></a>
<!-- requirement:ARC-03-10 -->
| Record group | Required relationships and constraints |
| --- | --- |
| Publication | Immutable factual/editorial snapshot, supporting record/revision references, public code and active revision pointer. |
<!-- /requirement:ARC-03-10 -->

<a id="arc-03-11"></a>
<!-- requirement:ARC-03-11 -->
| Record group | Required relationships and constraints |
| --- | --- |
| Recall/dispatch | Affected scope, recipient register or external-register reference, quantities/actions/contact history and closure evidence. |
<!-- /requirement:ARC-03-11 -->

<a id="arc-03-12"></a>
<!-- requirement:ARC-03-12 -->
| Record group | Required relationships and constraints |
| --- | --- |
| Reliability | Unique operation ID/hash/result, audit rows, durable job/outbox rows, attempt history and backup manifests. |
<!-- /requirement:ARC-03-12 -->

<a id="arc-03-13"></a>
<!-- requirement:ARC-03-13 -->
Use exact decimals serialized as strings across JSON boundaries. Preserve entered units and normalized mass.
Application UUIDs remain stable across provider changes. Readable codes and object keys are mappings, not
business identities. Occurrence, capture and server commit times are separate; operational display uses
Africa/Kampala. The quality owner approves precision, tolerances and stage-specific release requirements.
<!-- /requirement:ARC-03-13 -->
