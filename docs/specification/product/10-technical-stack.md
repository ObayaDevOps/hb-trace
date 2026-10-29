# Technical stack

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Technical stack](../../../HB-TRACE-V1-PLAN.md#technical-stack)

<a id="prd-10-01"></a>
<!-- requirement:PRD-10-01 -->
- **Application:** Next.js with the App Router, React and TypeScript in strict mode, deployed to managed Node.js
  hosting without a Docker image in V1. Route Handlers expose the API; domain and application code do not import
  Next.js so that the web and worker can share it.
<!-- /requirement:PRD-10-01 -->

<a id="prd-10-02"></a>
<!-- requirement:PRD-10-02 -->
- **PWA delivery:** an application-linked web app manifest, installation guidance and a versioned service worker
  with explicit cache rules and a prepared client shell for supported offline tasks. Keep the browser service
  worker separate from the server's background-job worker. Select and pin compatible service-worker tooling in
  an ADR against the actual Next.js production build; installation and offline restart have separate acceptance gates.
<!-- /requirement:PRD-10-02 -->

<a id="prd-10-03"></a>
<!-- requirement:PRD-10-03 -->
- **Forms and validation:** React Hook Form with shared Zod schemas validated again on the server.
<!-- /requirement:PRD-10-03 -->

<a id="prd-10-04"></a>
<!-- requirement:PRD-10-04 -->
- **Database:** Supabase-hosted PostgreSQL. Core identities, quantities, states and relationships use ordinary
  PostgreSQL relational columns; `jsonb` is limited to justified, versioned payloads.
<!-- /requirement:PRD-10-04 -->

<a id="prd-10-05"></a>
<!-- requirement:PRD-10-05 -->
- **Data access:** Drizzle ORM with reviewed, repository-owned standard SQL migrations and direct SQL for
  transactions and recursive lineage. Runtime traffic uses the Supabase connection mode appropriate to the
  selected managed host; migrations, `pg_dump` and administration use a direct or session connection. Production
  schema changes are never made manually in the Supabase dashboard.
<!-- /requirement:PRD-10-05 -->

<a id="prd-10-06"></a>
<!-- requirement:PRD-10-06 -->
- **Offline storage:** Dexie over IndexedDB, using an application-owned outbox and sync protocol.
<!-- /requirement:PRD-10-06 -->

<a id="prd-10-07"></a>
<!-- requirement:PRD-10-07 -->
- **Assets:** managed Supabase Storage through its S3-compatible API behind `AssetStore`. Use separate
  private quarantine/evidence buckets and an explicitly public bucket for approved publication images.
  Original bytes, previews and public derivatives have distinct immutable keys. PostgreSQL owns metadata,
  evidence links, retention, reviews and application-owned editorial revisions. No external CMS is required.
<!-- /requirement:PRD-10-07 -->

<a id="prd-10-08"></a>
<!-- requirement:PRD-10-08 -->
- **Authentication:** Supabase Auth for V1, behind an `IdentityProvider` adapter. Application-owned actors and
  roles map to an external auth subject; no domain record uses a Supabase Auth user ID as its permanent identity.
  MFA is required for quality, administration and other privileged actions.
<!-- /requirement:PRD-10-08 -->

<a id="prd-10-09"></a>
<!-- requirement:PRD-10-09 -->
- **Background work:** a PostgreSQL-backed worker or bounded scheduled invocation on managed Node.js hosting for
  asset verification, previews, exports, company receipt delivery and infusion due-task/reminder delivery. Use a
  maintained job implementation and do not add Redis solely for V1. Server jobs own reminder timing and retries;
  browser timers and periodic background execution are not scheduling dependencies.
<!-- /requirement:PRD-10-09 -->

<a id="prd-10-10"></a>
<!-- requirement:PRD-10-10 -->
- **API:** versioned REST/JSON endpoints with an OpenAPI description, idempotency support and consistent errors.
<!-- /requirement:PRD-10-10 -->

<a id="prd-10-11"></a>
<!-- requirement:PRD-10-11 -->
- **Deployment:** separate managed development, test/staging and production environments. V1 has no Dockerfile,
  Compose stack, self-hosted PostgreSQL, reverse-proxy operations or self-hosted object store.
<!-- /requirement:PRD-10-11 -->

<a id="prd-10-12"></a>
<!-- requirement:PRD-10-12 -->
- **Testing:** unit and property tests for domain rules, integration tests against isolated non-production
  Supabase and Supabase Storage environments, and Playwright tests across desktop and representative production phones.
<!-- /requirement:PRD-10-12 -->

<a id="prd-10-13"></a>
<!-- requirement:PRD-10-13 -->
- **Observability:** structured privacy-safe logs, correlation IDs, health checks and focused metrics for sync lag,
  job backlog, failed jobs, asset verification, backup age and application errors. Full telemetry infrastructure
  is deferred until justified.
<!-- /requirement:PRD-10-13 -->

<a id="prd-10-14"></a>
<!-- requirement:PRD-10-14 -->
- **Documentation:** repository-owned Markdown/MDX plus a concise root `AGENTS.md`; derive API reference from the
  OpenAPI contract. A simple in-app staff help area may render selected pages.
<!-- /requirement:PRD-10-14 -->

<a id="prd-10-15"></a>
<!-- requirement:PRD-10-15 -->
Pin Node 24 LTS, the package manager and direct dependencies, use the lockfile in CI, and record significant
choices as short Architecture Decision Records.
<!-- /requirement:PRD-10-15 -->
