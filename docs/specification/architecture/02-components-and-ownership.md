# Components and ownership

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/architecture-technical-spec.md — Components and ownership](../../architecture-technical-spec.md#components-and-ownership)

<a id="arc-02-01"></a>
<!-- requirement:ARC-02-01 -->
| Component | Selected technology | Responsibility and boundary |
| --- | --- | --- |
| Staff and public web | Next.js App Router, React, TypeScript | Route groups, task screens and public projection rendering; no browser imports from `src/server/`. |
<!-- /requirement:ARC-02-01 -->

<a id="arc-02-02"></a>
<!-- requirement:ARC-02-02 -->
| Component | Selected technology | Responsibility and boundary |
| --- | --- | --- |
| Forms | React Hook Form and shared Zod schemas | Immediate field feedback; server validation is authoritative. Planned dependencies must be reconciled with the repository before implementation. |
<!-- /requirement:ARC-02-02 -->

<a id="arc-02-03"></a>
<!-- requirement:ARC-02-03 -->
| Component | Selected technology | Responsibility and boundary |
| --- | --- | --- |
| Offline persistence | Dexie over IndexedDB | Durable local drafts, immutable outgoing envelopes and attachment bytes; partition by deployment, organization and actor. No backup guarantee. |
<!-- /requirement:ARC-02-03 -->

<a id="arc-02-04"></a>
<!-- requirement:ARC-02-04 -->
| Component | Selected technology | Responsibility and boundary |
| --- | --- | --- |
| PWA shell | Manifest plus versioned service worker | Offline startup and explicit static-resource cache allowlist; select compatible tooling through a production-build proof later. |
<!-- /requirement:ARC-02-04 -->

<a id="arc-02-05"></a>
<!-- requirement:ARC-02-05 -->
| Component | Selected technology | Responsibility and boundary |
| --- | --- | --- |
| Identity | Supabase Auth behind IdentityProvider | Identity/session validation; application-owned actor and role mappings in PostgreSQL. Privileged actions require configured MFA assurance. |
<!-- /requirement:ARC-02-05 -->

<a id="arc-02-06"></a>
<!-- requirement:ARC-02-06 -->
| Component | Selected technology | Responsibility and boundary |
| --- | --- | --- |
| Business rules | Framework-independent TypeScript in `src/domain/` | Quantities, lineage, transitions and permissions; application services orchestrate transactions. |
<!-- /requirement:ARC-02-06 -->

<a id="arc-02-07"></a>
<!-- requirement:ARC-02-07 -->
| Component | Selected technology | Responsibility and boundary |
| --- | --- | --- |
| Persistence | Supabase PostgreSQL; Drizzle and explicit SQL as needed | Reviewed standard SQL migrations; recursive lineage and atomic ledger commands. ORM adoption is planned, not an assertion about current code. |
<!-- /requirement:ARC-02-07 -->

<a id="arc-02-08"></a>
<!-- requirement:ARC-02-08 -->
| Component | Selected technology | Responsibility and boundary |
| --- | --- | --- |
| Object storage | Managed Supabase Storage, S3-compatible interface | Original images/PDFs/import files, previews, exports and approved public image derivatives. PostgreSQL owns their meaning and authorization. |
<!-- /requirement:ARC-02-08 -->

<a id="arc-02-09"></a>
<!-- requirement:ARC-02-09 -->
| Component | Selected technology | Responsibility and boundary |
| --- | --- | --- |
| Jobs | PostgreSQL-backed maintained job runner | Verification, export, reconciliation, receipt sending and infusion reminders; no Redis requirement. Implementation and hosting invocation remain Phase 0 decisions. |
<!-- /requirement:ARC-02-09 -->

<a id="arc-02-10"></a>
<!-- requirement:ARC-02-10 -->
| Component | Selected technology | Responsibility and boundary |
| --- | --- | --- |
| Hosting | Managed Node.js web/API and separately invoked worker | HTTPS, secrets, logs, scheduled execution and rollback; no Docker requirement in V1. |
<!-- /requirement:ARC-02-10 -->

<a id="arc-02-11"></a>
<!-- requirement:ARC-02-11 -->
| Component | Selected technology | Responsibility and boundary |
| --- | --- | --- |
| External delivery | Selected messaging and push adapters | At-least-once attempts, provider callbacks and reconciliation; receipt delivery does not establish farmer agreement. |
<!-- /requirement:ARC-02-11 -->

<a id="arc-02-12"></a>
<!-- requirement:ARC-02-12 -->
Pin supported runtime/dependencies during implementation. Node 24 LTS is the planned baseline. No additional
CMS is required: simple approved story fields and revision history live in application-owned PostgreSQL records.
<!-- /requirement:ARC-02-12 -->
