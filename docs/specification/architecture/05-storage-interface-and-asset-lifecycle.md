# Storage interface and asset lifecycle

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/architecture-technical-spec.md — Storage interface and asset lifecycle](../../architecture-technical-spec.md#storage-interface-and-asset-lifecycle)

<a id="arc-05-01"></a>
<!-- requirement:ARC-05-01 -->
`AssetStore` exposes application-level upload, read, signed-download, metadata inspection, export and controlled
deletion operations. Its Supabase adapter uses an S3 client with the project's configured endpoint/region and
server-only credentials. Verify supported API operations against the selected service; no AWS-specific lifecycle,
versioning, object-lock or ACL assumption is allowed.
<!-- /requirement:ARC-05-01 -->

<a id="arc-05-02"></a>
<!-- requirement:ARC-05-02 -->
Use private `quarantine` and `evidence` buckets and a separate `public-media` bucket. Names are illustrative;
configuration is environment-specific. Object keys include organization and application asset UUID, never names,
phone numbers or exact locations. New evidence/revisions receive new keys; application writes never overwrite
accepted originals. A database uniqueness constraint and server upload intent own the mapping.
<!-- /requirement:ARC-05-02 -->

<a id="arc-05-03"></a>
<!-- requirement:ARC-05-03 -->
1. Authorize the parent record and create a pending upload intent in PostgreSQL.
<!-- /requirement:ARC-05-03 -->

<a id="arc-05-04"></a>
<!-- requirement:ARC-05-04 -->
2. Stream bounded bytes through the backend to private quarantine storage. Retry under the same intent; never
   report evidence verified because an HTTP upload completed.
<!-- /requirement:ARC-05-04 -->

<a id="arc-05-05"></a>
<!-- requirement:ARC-05-05 -->
3. A durable job reads original bytes, computes SHA-256, validates actual type/size/decodability and scans for
   malware. A failed scan or unavailable scanner leaves the asset quarantined.
<!-- /requirement:ARC-05-05 -->

<a id="arc-05-06"></a>
<!-- requirement:ARC-05-06 -->
4. Copy verified originals to a new private evidence key, verify destination bytes, then commit the evidence
   mapping/state. Originals remain unchanged; generate previews as distinct assets. Review is a separate step.
<!-- /requirement:ARC-05-06 -->

<a id="arc-05-07"></a>
<!-- requirement:ARC-05-07 -->
5. Reconcile interrupted intents, orphan objects and copies through jobs. Use a retention grace period and an
   authorized deletion policy; never delete unresolved evidence merely because a request timed out.
<!-- /requirement:ARC-05-07 -->

<a id="arc-05-08"></a>
<!-- requirement:ARC-05-08 -->
6. Public publication may use separately approved sanitized derivatives. Private originals are never made public.
<!-- /requirement:ARC-05-08 -->

<a id="arc-05-09"></a>
<!-- requirement:ARC-05-09 -->
Signed links grant access to their holder until expiry; use a short configured lifetime and omit links from logs.
If immediate per-request revocation is required, proxy authorized downloads instead of promising signed-link
revocation. Private objects must fail anonymous reads. No service-role or S3 secret enters IndexedDB, browser
bundles, manifests or public projections.
<!-- /requirement:ARC-05-09 -->
