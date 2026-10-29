# Purpose

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Purpose](../../../HB-TRACE-V1-PLAN.md#purpose)

<a id="prd-01-01"></a>
<!-- requirement:PRD-01-01 -->
Build a deployable, offline-capable traceability and production-compliance pilot for Humble Beeing Honey.
Deliver the staff application as an installable Progressive Web App (PWA) that can be added to supported Android
and iPhone/iPad home screens and opened in its own app window. The same application remains usable in a browser;
customer batch lookup requires neither installation nor a staff account.
<!-- /requirement:PRD-01-01 -->

<a id="prd-01-02"></a>
<!-- requirement:PRD-01-02 -->
V1 follows honey and its beeswax co-product from farmer and apiary through collection, processing, storage,
quality review, packaging and public batch verification. It also gives production staff controlled SOPs,
printable forms and a reliable way to preserve completed paperwork as digital audit evidence.
<!-- /requirement:PRD-01-02 -->

<a id="prd-01-03"></a>
<!-- requirement:PRD-01-03 -->
V1 uses managed services to reduce initial delivery and operating cost: Supabase for hosted PostgreSQL and
authentication, managed Node.js hosting for the application and worker, and Supabase Storage for editorial media and
approved evidence assets. V1 does not use Docker or self-host its database or object storage. It remains a
single-producer application rather than a shared multi-tenant SaaS product.
<!-- /requirement:PRD-01-03 -->

<a id="prd-01-04"></a>
<!-- requirement:PRD-01-04 -->
Provider-specific details stay behind narrow adapters. Permanent record identities, business rules, migrations,
audit history and lineage remain application-owned so that the first funded infrastructure iteration can move the
application and worker to Docker, Supabase data to standard PostgreSQL, and Supabase Storage-managed application assets to
another S3-compatible provider without changing logical records or public batch identities.
<!-- /requirement:PRD-01-04 -->
