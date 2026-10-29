# Three different references

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/mobile-first-workflow-ui-plan.md — Three different references](../../mobile-first-workflow-ui-plan.md#three-different-references)

<a id="wf-10-01"></a>
<!-- requirement:WF-10-01 -->
| Reference | What it identifies | Where it appears |
| --- | --- | --- |
| Collection reference | The farmer transaction and receipt, including all its buckets. | Receipt and collection history. |
<!-- /requirement:WF-10-01 -->

<a id="wf-10-02"></a>
<!-- requirement:WF-10-02 -->
| Reference | What it identifies | Where it appears |
| --- | --- | --- |
| Bucket code | One recorded physical unit of collected material. | Written on or attached to each bucket; scanned or typed at HQ. |
<!-- /requirement:WF-10-02 -->

<a id="wf-10-03"></a>
<!-- requirement:WF-10-03 -->
| Reference | What it identifies | Where it appears |
| --- | --- | --- |
| Finished batch/lot code | The bottled batch and all contributing source lots. | Jar labels and customer lookup. |
<!-- /requirement:WF-10-03 -->

<a id="wf-10-04"></a>
<!-- requirement:WF-10-04 -->
Create a permanent internal identity and readable code for each bucket, including
offline. Assign a net quantity to each bucket and reconcile bucket quantities
with the collection total before saving. Codes must not encode personal data.
The identifier registry must detect collisions and retain the same logical
record when a label is replaced. Ambiguous or damaged codes need a review path;
never silently associate them with a different bucket.
<!-- /requirement:WF-10-04 -->

<a id="wf-10-05"></a>
<!-- requirement:WF-10-05 -->
Show each code in large type with **Write this on the bucket**. Offer **Print
label** where supported; QR is an optional reading aid. A print retry reprints
the same label. Repeated taps or transport retries must not create extra
collections, buckets or receipts.
<!-- /requirement:WF-10-05 -->

<a id="wf-10-06"></a>
<!-- requirement:WF-10-06 -->
The receipt shows farmer reference, source, relevant dates, material, weight,
grade, price, total, payment status and linked bucket codes. Record farmer
confirmation, unavailable confirmation or a dispute without overwriting the
original transaction. An offline receipt says **Saved on this device; not yet
confirmed by the server**. The practical print/paper/share method remains an
operational setup decision.
<!-- /requirement:WF-10-06 -->
