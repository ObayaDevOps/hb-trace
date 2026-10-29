# Current repository transition

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Current repository transition](../../../HB-TRACE-V1-PLAN.md#current-repository-transition)

<a id="prd-36-01"></a>
<!-- requirement:PRD-36-01 -->
Treat the existing Pages Router JavaScript site as a visual/marketing prototype, not as an implementation of this
architecture. Before adding domain features:
<!-- /requirement:PRD-36-01 -->

<a id="prd-36-02"></a>
<!-- requirement:PRD-36-02 -->
- move routing to `src/app`, introduce a strict `tsconfig.json` and convert maintained code to TypeScript;
<!-- /requirement:PRD-36-02 -->

<a id="prd-36-03"></a>
<!-- requirement:PRD-36-03 -->
- create framework-independent domain/application modules and server-only Supabase database/Auth/Storage adapters before route
  handlers or UI components start accumulating business rules;
<!-- /requirement:PRD-36-03 -->

<a id="prd-36-04"></a>
<!-- requirement:PRD-36-04 -->
- add `lint`, `typecheck`, unit, integration, end-to-end, migration and documentation checks to the package scripts
  and CI; pin Node 24 LTS and the package-manager version;
<!-- /requirement:PRD-36-04 -->

<a id="prd-36-05"></a>
<!-- requirement:PRD-36-05 -->
- remove sample API routes and do not expose service/database/Supabase Storage secrets to client components;
<!-- /requirement:PRD-36-05 -->

<a id="prd-36-06"></a>
<!-- requirement:PRD-36-06 -->
- replace unapproved **raw**, **organic**, **pure**, **authentic** or certification wording in page metadata,
  crawler files and content with neutral factual wording until an applicable approved claim exists;
<!-- /requirement:PRD-36-06 -->

<a id="prd-36-07"></a>
<!-- requirement:PRD-36-07 -->
- change **Unique Jar Code** to **Batch/Lot Code**, because individual jar serialization is out of V1 scope; and
<!-- /requirement:PRD-36-07 -->

<a id="prd-36-08"></a>
<!-- requirement:PRD-36-08 -->
- isolate any approved public analytics to public route layouts. Authenticated staff routes have no third-party
  analytics by default.
<!-- /requirement:PRD-36-08 -->
