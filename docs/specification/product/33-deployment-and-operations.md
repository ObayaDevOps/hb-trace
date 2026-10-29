# Deployment and operations

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Deployment and operations](../../../HB-TRACE-V1-PLAN.md#deployment-and-operations)

<a id="prd-33-01"></a>
<!-- requirement:PRD-33-01 -->
- Use separate Supabase projects with separate database, Auth and Storage resources for development, test/staging and
  production. Never copy production personal data into a lower environment; use synthetic fixtures.
<!-- /requirement:PRD-33-01 -->

<a id="prd-33-02"></a>
<!-- requirement:PRD-33-02 -->
- Deploy the Next.js application and its worker/scheduled jobs through managed Node.js hosting over HTTPS. Record
  the selected host, region, runtime/connection mode, execution limits, deployment rollback and worker behavior in
  an ADR before implementation. V1 deliberately has no Docker deployment.
<!-- /requirement:PRD-33-02 -->

<a id="prd-33-03"></a>
<!-- requirement:PRD-33-03 -->
- Use pooled Supabase connections for runtime when the host is serverless or connection-limited and a direct or
  session connection for migrations, `pg_dump` and long-lived worker access. Limit database roles and network
  credentials; never expose the service role or database password to clients.
<!-- /requirement:PRD-33-03 -->

<a id="prd-33-04"></a>
<!-- requirement:PRD-33-04 -->
- Apply migrations as a separately authorised deployment step, not automatically on application startup. Make
  migrations backward compatible across the agreed old-client/app-worker deployment window and document rollback
  or forward-repair behavior.
<!-- /requirement:PRD-33-04 -->

<a id="prd-33-05"></a>
<!-- requirement:PRD-33-05 -->
- Use Supabase managed backups according to the selected plan and make an independent, encrypted standard
  PostgreSQL export at the approved interval. Define numeric RPO and RTO values before production and demonstrate
  restoration to an isolated non-production project before acceptance.
<!-- /requirement:PRD-33-05 -->

<a id="prd-33-06"></a>
<!-- requirement:PRD-33-06 -->
- Export editorial records, all original asset bytes and an application-owned asset manifest at the approved interval. A restore drill proves
  that evidence links, publication revisions, page order and hashes reconcile with the database export.
<!-- /requirement:PRD-33-06 -->

<a id="prd-33-07"></a>
<!-- requirement:PRD-33-07 -->
- Monitor the application externally as well as through provider dashboards. Alert on application unavailability,
  database/connection failure, sync lag, job backlog/failure, asset-verification failure and stale backups.
<!-- /requirement:PRD-33-07 -->

<a id="prd-33-08"></a>
<!-- requirement:PRD-33-08 -->
- Keep public verification and authenticated operations in separate route groups and preferably separate hosts,
  with separate security headers, analytics policy and session-cookie scope. Public traffic must not gain a query
  path to private operational tables.
<!-- /requirement:PRD-33-08 -->

<a id="prd-33-09"></a>
<!-- requirement:PRD-33-09 -->
- Document supported Android/iOS devices, browsers, A4 printers and QR/label printers after testing real factory
  equipment. Apply the [PWA installation and reliability requirements](../../../HB-TRACE-V1-PLAN.md#installable-pwa-and-device-reliability)
  before pilot release, including the evidence-based criteria for reconsidering native delivery.
<!-- /requirement:PRD-33-09 -->
