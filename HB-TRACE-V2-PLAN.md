# HB-TRACE V2 — Platform and Capability Upgrades

## Purpose

V2 begins by moving the proven managed-service honey-and-beeswax pilot to a portable funded deployment: Dockerized
web and worker processes, standard PostgreSQL and S3-compatible application storage. It then evolves the product
into a reusable, separately deployable traceability platform. It contains capabilities deliberately removed from
V1 so that the pilot can ship with lower cost and risk. V2 is a roadmap, not a commitment to deliver every item
simultaneously.

Every upgrade must preserve permanent V1 identities, lineage, audit events, controlled-document history, public
batch links, publication revisions and evidence. Moving from Supabase to PostgreSQL or from Sanity assets to S3 is
a provider migration, not permission to redesign domain records. V2 must upgrade historical records in place or
continue to interpret them through their original schema/rule versions; it must never silently reinterpret
accepted V1 data.

## Entry criteria

Begin V2 only after:

- V1 pilot acceptance criteria have been met or remaining exceptions are explicitly accepted;
- staff have completed at least one full operating cycle using the system;
- backup restoration and a production upgrade/rollback have been demonstrated;
- actual offline, storage, query and support metrics are available;
- domain and compliance owners have reviewed V1 audit findings;
- a standard Supabase `pg_dump`, Sanity content export and complete application asset manifest have been produced;
- the target PostgreSQL, S3-compatible provider, container host, secrets/ingress model, RPO/RTO and named operator
  are funded and approved;
- data-processing/transfer, retention, encryption and provider-exit implications have been reviewed;
- there is a named customer or operational need for each selected V2 capability; and
- a V2 data migration and compatibility test suite has been approved.

## Upgrade principles

- Extract services only to solve an observed ownership, scaling, resilience or deployment problem.
- Add commodities through versioned modules while retaining the shared traceability vocabulary.
- Keep regulatory/compliance logic separate from commodity biology and processing logic.
- Prefer additive identifiers, events and schemas; never rewrite historic lineage to fit a new feature.
- Treat analysis as decision support, not proof of source fault or regulatory compliance.
- Keep customer deployments independently operable even when optional central services are introduced.
- Keep domain/application code independent of Supabase, Sanity, S3 and container orchestration. Provider adapters
  may change; domain IDs and API contracts do not.
- Migrate one stateful concern at a time with counts, hashes, reconciliation and rollback evidence. Do not combine
  database, assets, authentication and major domain-schema redesign in one untestable cutover.

## V2 capability roadmap

### 0. First funded infrastructure iteration

Containerize the V1 modular monolith without splitting it into microservices:

- Build version-pinned web/API and worker images from the same repository and run them with Docker Compose behind
  a secured ingress/reverse proxy.
- Provision a supported standard PostgreSQL release with separate least-privilege migration, application, worker,
  backup and read-only roles. Apply the existing repository-owned migrations; do not fork a new schema for the
  self-hosted target.
- Restore a final Supabase standard dump during an approved write freeze or use an explicitly designed incremental
  reconciliation process. Verify migration history, row counts, constraints, material balances, lineage samples,
  publication revisions, auth-subject mappings and audit continuity.
- Introduce an S3-compatible `AssetStore` for evidence and application-managed media. Copy from Sanity using the V1
  asset manifest, preserve application asset IDs, write stable non-sensitive object keys, compare SHA-256 for every
  original and only then activate the new provider mapping.
- Configure bucket encryption, private access, short-lived signed URLs, lifecycle/retention rules, versioning or
  object lock where approved, malware quarantine, independent backups and restore drills. A single-node object
  store is not represented as high availability.
- Keep Sanity as an optional editorial CMS if it remains useful, but material facts, approval state and publication
  snapshots stay in PostgreSQL. S3-compatible storage is the default for application evidence and application-
  managed media after migration.
- Initially keep Supabase Auth to reduce simultaneous cutover risk or replace it through the V1 `IdentityProvider`
  mapping with an approved OIDC provider such as Keycloak. Never change application actor IDs or historical audit
  attribution during identity migration.
- Add container health checks, secrets management, resource limits, schema migration/rollback orchestration,
  encrypted database/object backups, external monitoring and documented disaster recovery.
- Run the full N-1/offline synchronization, permissions, recall, evidence retrieval, public verification and
  restore suites against the target before cutover. Retain the managed V1 environment for the approved rollback
  window, then dispose of redundant provider data according to retention and processor-exit obligations.

This infrastructure iteration improves portability and control but does not by itself justify microservices,
Kubernetes, multi-tenancy or a general plugin platform.

### 1. Production-scale analytics and investigations

- Add backward and forward lineage visualisations for large mixed batches.
- Build quality cohorts by contributor, apiary, region, season and processing method.
- Weight outcomes by exact contributed quantity rather than simple presence in a batch.
- Show repeated passed/failed associations and missing evidence while distinguishing correlation from confirmed
  individual-source findings.
- Add sourcing-candidate views for groups repeatedly represented in good outcomes, clearly labelled as decision
  support rather than verified source quality.
- Extend failed-batch investigations with targeted sample plans, sample custody, follow-up results and confirmed
  source-level findings only after evidence supports attribution.
- Add configurable dashboards for yield variance, stock aging, missing records, unresolved holds, training and
  compliance readiness.

### 2. Individual package serialisation

- Create optional individual package units under a packaging run without changing existing sale-batch identities.
- Support product + lot and product + serial identifier mappings, with room for approved GS1 identifiers.
- Generate individual QR/2D codes, printing jobs, reprint controls and duplicate-code detection.
- Trace every serialised jar backward through its packaging run and source batches.
- Preserve all V1 batch-level public links indefinitely.
- Add controlled withdrawal/recall workflows at batch, packaging-run or individual-unit granularity.
- Introduce serialisation only when its label cost and operational burden are justified by market or customer need.

### 3. Device and hardware adapters

Define a versioned `DeviceAdapter` contract that converts device output into normalized measurements, identifiers
or evidence events. Candidate adapters include:

- weighing scales;
- honey/coffee moisture meters;
- barcode and QR scanners;
- desktop, mobile and industrial label printers;
- GPS receivers;
- temperature loggers; and
- future factory or laboratory instruments.

Each adapter declares supported devices/firmware, connection method, units, accuracy metadata, calibration
requirements, offline behavior, raw-reading retention and error states. Device readings remain distinguishable
from manual entries. Simulated-adapter contract tests are mandatory before adding physical-device certification.

### 4. Additional commodity modules

Use the first customer-justified additional commodity to test and evolve V1's compile-time honey-module seam into
a documented `CommodityModule` development kit containing schemas, form-layout metadata, workflow states, quality
rules, evidence mappings, translations, icons, upgrade hooks, fixtures and contract tests. Do not freeze the SDK
before two real commodity implementations demonstrate the shared and commodity-specific boundaries.

#### Coffee reference module

- Farm plot, variety, harvest and buyer/collection records.
- Cherry, parchment and green-bean traceable units.
- Washed/natural/other processing transformations and drying stages.
- Grade, moisture, defects, storage, milling, blending and export lot evidence.
- Coffee-specific scale and moisture-meter declarations.

#### Shea-butter reference module

- Collection areas, collectors and nut/kernel units.
- Drying, roasting, milling, kneading/extraction and clarification transformations.
- Kernel/butter yield, quality, storage, blending and packaging evidence.

These become executable reference modules only after authoritative standards, real workflows and qualified domain
owners are available. Passing generic traceability tests is not sufficient to claim commodity compliance.

### 5. Compliance and jurisdiction packs

Introduce a versioned `JurisdictionPack` interface that consumes normalized evidence capabilities from a commodity
module and produces reviewer checklists and evidence packs.

A pack defines:

- jurisdiction, market, regulatory source and effective dates;
- applicability rules and exclusions;
- required normalized evidence and thresholds;
- reviewer questions, decisions and exception handling;
- controlled output/export templates; and
- migration behavior when rules change.

Candidate packs include Uganda/UNBS expansions and customer-driven EU or UAE market packs. Honey must not be
described as EUDR-compliant because honey is not a currently listed EUDR commodity. If coffee or another listed
commodity is implemented, EUDR assessment belongs in the jurisdiction pack rather than the commodity module.

Contract tests must show that one commodity record set can be assessed by different jurisdiction packs without
changing ledger history, and that a changed pack does not silently alter an earlier reviewer decision.

### 6. Organic certification and chain of custody

Organic is a regulated or scheme-controlled production and labelling claim, not a quality grade that HB-TRACE
can award. V2 supports certification readiness, inspection evidence, chain of custody and certificate-status
verification. Only the selected, authorised certification/control body can certify an operator or product.

Before building the first organic pack:

- select the intended market, organic standard/scheme, certification body and exact operator/product scope;
- obtain the licensed current edition of Uganda's organic production standard, US EAS 456:2019 or its successor,
  and any market-specific production, control, import and labelling rules;
- confirm that the chosen certification body is accredited or recognised for the intended market, country,
  operator type and product category;
- decide whether farmers are certified individually or through a group and Internal Control System (ICS); and
- complete a clause-level gap assessment with the certification body rather than assuming that existing UNBS
  honey/product-certification evidence is sufficient for organic certification.

Add a versioned `CertificationSchemePack` and records for scheme/rule version, operator or operator group,
certification body, recognition/accreditation evidence, sites, activities, products, group membership, inspection,
non-conformity, corrective action, certificate scope and validity. Keep these states distinct: **readiness only**,
**in conversion**, **application submitted**, **inspected**, **certified**, **suspended**, **expired** and
**withdrawn**. None except an applicable current certificate permits an organic public claim.

The managed certification journey is: select scheme and scope → perform gap assessment → create the required
management plan/registers → complete any required conversion period → apply → undergo inspection → resolve
findings → verify and record the issued certificate → monitor scope and chain of custody → complete surveillance
and renewal. HB-TRACE records each step and evidence item but never records “certified” from a self-assessment.

The organic evidence workspace must support, as required by the selected scheme:

- an organic management/production plan, responsible people, site/facility register and change history;
- for group certification, the ICS member register, eligibility/risk status, training, internal inspections,
  findings, sanctions, approvals/removals and reconciliation with the external certificate scope;
- stable farmer, apiary, hive/colony and site identities, apiary maps or coordinates, movement periods and
  scheme-specific forage/contamination-risk assessments;
- colony origin and conversion evidence, hive and foundation-wax materials, feeding, veterinary/pest treatments,
  cleaning agents, hive operations, super removal, extraction, harvest date and harvested amount;
- approved/prohibited input and material registers with supplier evidence and use records;
- organic supplier and incoming-certificate checks, segregation from non-organic/in-conversion material,
  cleaning/changeover, storage, transport and subcontractor controls;
- quantity reconciliation and mass-balance reports from certified intake through processing, losses, packaging,
  sale and any downgrade to non-organic status;
- organic label/artwork approval, mark/logo usage, certificate references and market-specific wording;
- inspection plans, auditor evidence requests, findings, corrective actions, closure and annual renewal; and
- expiry, suspension, scope-change and non-conformity alerts that immediately identify affected stock, batches,
  labels, sales documents and public claims.

For an EU-targeted organic-honey pack, evidence mapping must cover the applicable current beekeeping and import
rules, including the scheme's apiary-siting/forage assessment, hive register, feeding and treatment records,
materials and wax controls, extraction/harvest records, segregation and traceability. If exported to the EU, add
consignment and Certificate of Inspection support only after its TRACES workflow, recognised control body and
responsible roles have been confirmed. Other markets receive separate scheme packs; one market's certificate is
never silently treated as valid in another.

Authoritative discovery starting points, to be rechecked before implementation, are the
[UNBS US EAS 456:2019 catalogue entry](https://webstore.unbs.go.ug/store.php?preview=&src=4025),
[EU Regulation 2018/848](https://eur-lex.europa.eu/eli/reg/2018/848/oj?locale=en) and, for EU imports,
[Delegated Regulation 2021/2306](https://eur-lex.europa.eu/eli/reg_del/2021/2306/oj/eng).

### 7. Governed social, environmental and economic claims

Extend V1's controlled `PublicClaim` into reusable, versioned claim definitions and batch/transaction-specific
assertions. Companies may associate approved claims with a product, batch, purchase transaction, farmer group or
project, but the public wording must resolve to the exact records and evidence assessed for that scope.

Add `ClaimDefinition`, `ClaimMethodology`, `ClaimAssessment` and `ClaimAssertion` records. Every assertion states:

- claim category, exact wording, subject, scope, geography and measurement/reporting period;
- methodology/version, eligibility rules, units, thresholds, calculation inputs and reproducible result;
- source records, evidence, data-quality limitations, uncertainty and qualifications;
- owner, reviewer and optional independent assurer/verifier;
- valid-from, review, expiry, suspension and withdrawal status; and
- the approved public summary, with private evidence remaining access-controlled.

Initial governed claim families are:

- **Organic production:** certification-backed only. Link the assertion to the current certificate, covered
  operator/group, product, activity, sites and exact eligible batches; never convert readiness into certification.
- **Fair price:** link each asserted transaction to contracted and paid amounts, premiums, currency/exchange rate,
  deductions, farmer receipt/confirmation and a named, dated benchmark or rule. Distinguish “price paid,” “above
  benchmark” and “fair price”; they are not interchangeable.
- **Living income:** record the benchmark provider, location, household assumptions, reference period, population,
  sampling and calculation method. Distinguish a contribution toward, a measured gap to and verified achievement
  of a living income; a single purchase price must not imply a household outcome.
- **Carbon/climate:** record organisational/product boundary, baseline, reporting period, activity data, emission
  factors, allocation, land-use assumptions, reductions, removals, insetting/offsets and assurance. Keep footprint,
  reduction, carbon-neutral and offset claims distinct.

Claim review must propagate material source corrections, farmer disputes, expired certificates and changed
methodologies to every affected assertion. A claim may be suspended or withdrawn without deleting the underlying
transaction, calculation, evidence or previously published version.

### 8. Farmer QR identity cards

- Issue an optional durable QR card against the permanent V1 farmer identity; card replacement never creates a
  new farmer.
- Encode only an opaque, non-sequential credential or signed lookup token with issuer/key version and checksum,
  never the farmer's name, phone, coordinates, balances or transaction history.
- Allow authorised collection staff to scan online or offline, confirm the person through the approved local
  procedure and open a new purchase, receipt, consent or support workflow with minimal data entry.
- Keep farmer-card QR credentials separate from public consumer batch QR codes and require server authorization
  before private information is returned.
- Track requested, printed, issued, activated, replaced, lost, revoked and expired states, including issuer,
  recipient acknowledgement, reason and complete audit history.
- Support reprint/replacement, duplicate-active-card warnings, key rotation, revocation synchronization and a
  manual farmer-search fallback when a card is absent or damaged.
- Design the credential registry so the same farmer can later receive an NFC credential without changing their
  identity or transaction history; NFC hardware remains optional.

### 9. Digital-first forms and OCR assistance

- Add fully digital structured versions of selected production forms after the quality owner approves their legal
  and operational equivalence to paper.
- Support signatures/approvals appropriate to deployment policy while retaining who performed each action.
- Add OCR as an optional transcription assistant for uploaded handwriting and printed text.
- Always preserve the original image/PDF and display OCR confidence and source location.
- Require human confirmation before OCR text becomes operational metadata or affects a quality decision.
- Add image-quality checks for blur, glare, cropping, missing pages and unreadable fields.
- Detect likely duplicate uploads through content hashes/perceptual comparison, with human resolution.
- Allow configurable paperless workflows only after retention, signature and audit requirements are approved.

### 10. Native field application option

Evaluate a native Android/iOS application when V1 evidence shows that the PWA cannot safely meet offline needs,
particularly for multi-day offline periods, large photo queues, background uploads, managed devices, Bluetooth
hardware or reliable background location.

The native client must use the same versioned APIs, module schemas, identifiers and idempotency protocol as the
PWA. It must not become a separate traceability implementation. Candidate technology should be selected through
a proof of concept using actual staff phones and the hardest field workflow; React Native/Expo is the initial
TypeScript-aligned option, not a predetermined final choice.

### 11. Service extraction and event platform

The modular monolith remains acceptable in V2. Extract a module only when documented evidence shows a need such as
independent team ownership, materially different scaling, fault isolation, regulated deployment separation or a
different release cadence.

Likely extraction order if required:

1. Public verification/read model
2. File ingestion and evidence processing
3. Integrations/export worker
4. Identity provider integration
5. Compliance assessment
6. Traceability ledger only if its load or ownership justifies separation

Use versioned APIs and a durable event broker only after the first extraction. Apply transactional outbox/inbox,
idempotent consumers, event schema compatibility and replay tests. Do not split databases while business
transactions still require synchronous cross-service consistency. Document ownership, recovery and observability
for every new service.

NestJS is a candidate TypeScript service framework if extraction occurs. The selection should be validated against
measured needs rather than adopted solely because the architecture is called a platform.

### 12. High availability and larger deployments

- Add external/managed PostgreSQL or a tested high-availability configuration where downtime requirements justify
  it.
- Add redundant object storage, replicated backups and disaster-recovery exercises.
- Separate worker capacity for image processing, exports and integrations.
- Add an ingress/load-balancing layer and horizontally scalable stateless application instances.
- Adopt Kubernetes only where an operator can support it and the availability/scale requirement cannot be met by
  a simpler deployment.
- Define per-deployment telemetry export and privacy controls.
- Add capacity tests for large lineage graphs, serialised packages, long evidence histories and concurrent public
  verification traffic.

### 13. Optional deployment fleet management

If HB-TRACE operates many separate customer installations, add an optional control plane for release metadata,
licensing, signed update discovery, health summaries and support bundles. It must not receive customer production
data by default or become required for a customer installation to operate.

- Customer data remains within the separate deployment unless a specific, consented integration is configured.
- Updates are signed, versioned, reversible and compatible with supported database/module versions.
- Central health data is minimized and documented.
- Air-gapped/manual update workflows remain available.

This is not conversion to a shared multi-tenant traceability database.

### 14. Advanced evidence integrity and optional blockchain anchoring

- Add configurable object-lock/WORM retention for approved evidence.
- Create daily tamper-evident hash-chain or Merkle checkpoints over audit events and evidence hashes.
- Store checkpoint attestations separately from the primary database where policy warrants it.
- Add legal-hold and retention-expiry workflows with approval and audit evidence.
- Verify attachment hashes and audit-chain continuity during backup restoration.
- Define an optional `IntegrityAnchor` interface so deployments can use no external anchor, an independent
  timestamp/notary service, or a public/permissioned blockchain without changing trace records.
- In the preferred **hash-stamp mode**, periodically anchor only a signed Merkle root/checkpoint. Retain network,
  chain ID, transaction ID, block/time, signing key, submission/retry state and a proof path that verifies selected
  records against the anchor. Do not place personal data or evidence files on-chain.
- Treat the chain as an external integrity witness in V2: PostgreSQL plus object storage remains the operational
  source of truth, and blockchain downtime queues an idempotent later anchor rather than stopping production.
- Evaluate **full ledger replication/storage** as a V3 or separately approved mode only. If justified, limit it to
  selected pseudonymous event envelopes and content hashes; define whether it is co-authoritative, how conflicts,
  corrections and chain reorganisation are handled, and how off-chain files resolve from hashes.
- Require a documented multi-party trust problem, node/network governance, privacy and data-residency review,
  key custody/recovery, fee model, throughput/latency targets, outage behavior, smart-contract upgrade process,
  independent verification and exit/migration plan before selecting a blockchain.
- Never imply that anchoring proves an input was truthful, certifies organic production or validates a claim; it
  proves only that anchored content has or has not changed since the recorded checkpoint.

### 15. Reporting, data exchange and external integrations

Provide a permission-aware report catalogue for:

- stock, movements, aging, yield, mass balance and reconciliation;
- farmer purchases, receipts, confirmed/disputed payments, premiums and price-benchmark comparisons;
- farmer/apiary coverage, organic readiness/certification scope and certificate expiry;
- claim coverage, supporting transactions/evidence, methodology version and withdrawn/expired assertions;
- traceability, processing, packaging, quality, laboratory, holds, non-conformance and corrective action;
- document/training completion, audit readiness, certification inspections and evidence packs; and
- integration delivery, rejections, retries, reconciliation and data-freshness exceptions.

Every report must show its filters, reporting period/timezone, units/currency and exchange-rate source, generated
time, data-freshness cutoff and report/query version. Totals must drill down or reconcile to authorised source
records. Support PDF for human review and CSV/XLSX/JSON for controlled exchange, plus saved filters, scheduled
generation, expiry-controlled links and an immutable hash/snapshot for reports used as submitted evidence.
Configurable reports may select approved dimensions and measures; V2 does not expose arbitrary production SQL.

Integration capabilities include:

- versioned FCI4Africa import/export once its authoritative schemas, validation and governance are confirmed;
- laboratory result exchange with explicit units, methods, sample identity and signed report attachment;
- accounting/payment references and reconciliation without turning HB-TRACE into a full accounting system;
- certifier-approved evidence packages and certificate-status import where an official interface exists;
- supplier/customer/ERP exports, approved GS1 identifier mappings and consignment/export records;
- versioned REST APIs, scoped service accounts and outbound webhooks for approved business events; and
- email/SMS/push connectors with delivery audit, consent and privacy controls.

Each connector requires explicit field mapping, source ownership, schema/version, authentication, least-privilege
credentials, idempotency, retry/backoff, replay, dead-letter review, reconciliation and a data-minimization/retention
assessment. An integration dashboard shows last success, lag, failures and the records affected; external success
is never inferred merely because HB-TRACE queued a message.

## Platform contracts

### AssetStore

An asset provider accepts an application asset ID plus bytes/metadata and returns a replaceable provider reference.
It supports private ingestion, authorized short-lived retrieval, integrity verification, deletion/retention status,
export and health reporting. PostgreSQL retains authoritative evidence links, hashes, visibility and review state.
Provider migration updates only the provider mapping after byte-for-byte verification; it never changes evidence or
domain IDs. V2's default implementation is S3-compatible, while a Sanity adapter may remain for editorial media.

### IdentityProvider

An identity provider authenticates a replaceable external subject and reports session/MFA assurance. Application
actors, roles and permissions remain application-owned. Moving from Supabase Auth to Keycloak or another OIDC
provider maps subjects to existing actors and never rewrites operational authorship or audit history.

### CommodityModule

A module supplies:

- versioned record schemas and server validation;
- permitted unit types and state transitions;
- mobile/PWA form layouts and low-literacy guidance;
- labels, translations and icons;
- quality calculations and evidence requirements;
- normalized traceability/evidence mappings;
- supported adapter declarations; and
- deterministic upgrade functions for its own payloads.

The platform executes only reviewed and signed module packages. Customer configuration may select approved
options but may not inject arbitrary executable schemas or rules into production.

### JurisdictionPack

A pack consumes normalized evidence, never private commodity database internals. It returns an assessment with
rule version, applicability, passes, gaps, exceptions and human-review state. Its output is evidence for review,
not an automatic legal guarantee.

### CertificationSchemePack

A certification-scheme pack defines the licensed standard/rule references, target market, eligible operator and
product scopes, conversion and certification states, required plans/registers, inspection evidence, certificate
fields, label controls, mass-balance tests and renewal rules. It composes with a `JurisdictionPack` but does not
replace it. Its output is readiness and evidence status; only a certificate record verified against the issuing
body can establish certified status.

### ClaimMethodology

A methodology supplies versioned eligibility rules, inputs, calculations, thresholds, evidence requirements,
review roles, public wording constraints and expiry/invalidation triggers. The same evaluated assertion must be
reproducible from an immutable input snapshot. Methodologies cannot publish themselves or silently reinterpret
previous assertions after a benchmark, emission factor or rule changes.

### DeviceAdapter

An adapter returns normalized readings plus device identity, timestamp, unit, calibration/accuracy metadata, raw
payload reference and confidence/error state. Core services never embed device-protocol logic.

### IntegrityAnchor

An anchor receives a deterministically encoded checkpoint and returns a verifiable attestation. It declares the
network/notary, finality assumptions, privacy mode, cost, retry behavior and independent verification procedure.
Core traceability remains usable when an anchor is unavailable.

### Report and IntegrationConnector

Report definitions use approved dimensions, measures, filters and access rules and produce a versioned,
reproducible snapshot. An integration connector declares direction, schema versions, field mappings, credentials,
idempotency/reconciliation behavior, data classification and operational ownership. Neither contract grants
direct database access.

### Event and API compatibility

- Use semantic versions for contracts and record the producer version on every event.
- Prefer additive changes; define supported compatibility windows before removing fields.
- Preserve unknown fields during relay and replay where safe.
- Maintain consumer-driven contract tests and historic event fixtures.
- Provide migration, rollback and replay procedures for every breaking version.

## Proposed V2 releases

### V2.0 — Portable funded deployment

- Dockerized web/API and worker from the unchanged modular-monolith codebase.
- Migration from Supabase to supported standard PostgreSQL with full reconciliation and rollback evidence.
- Migration of application evidence/media from Sanity to S3-compatible storage using stable application asset IDs
  and verified hashes; Sanity may remain only as an optional editorial CMS.
- Production ingress, secrets, least-privilege database/object access, monitoring, backups and disaster recovery.
- Supabase Auth retained temporarily or migrated independently through the `IdentityProvider` mapping.

### V2.1 — Operational intelligence and governed claims

- Quality cohorts, investigation tooling, dashboards and improved evidence retrieval.
- Versioned social, environmental and economic claim methodologies, assessments and assertions.
- Core operational, traceability, claim and compliance report catalogue.
- Extensions to V1 batch recall where investigations demonstrate a need.
- OCR-assisted form indexing with mandatory human verification.
- Expanded UNBS requirements and applicable licensed beeswax specification.

### V2.2 — Organic certification and farmer identity

- `CertificationSchemePack` contract and the first licensed, certifier-reviewed organic pack for the selected
  market.
- Organic production plan/registers, inspection findings, certificate scope/status, chain-of-custody segregation,
  mass balance, label controls and claim invalidation.
- Farmer QR card issuance, offline authorised lookup, loss/revocation and replacement workflows.

### V2.3 — Platform modules and field capability

- Formal module SDK and contract-test harness.
- First customer-justified additional commodity module.
- First additional jurisdiction pack.
- Selected scale/scanner/printer adapters based on real hardware.
- Optional individual jar/package serialisation.
- Native application if PWA evidence meets its decision trigger.
- Advanced offline device management and larger attachment queues.

### V2.4 — Scale, integration and integrity

- Service extraction where metrics justify it.
- High-availability deployment profile.
- External integration/API/webhook catalogue, scheduled reporting and optional fleet-management control plane.
- Stronger evidence-integrity and long-term retention controls, with a blockchain hash-anchor pilot only where
  the trust case and governance gates are satisfied.

### V3 candidate — Full blockchain ledger mode

Full storage or co-authoritative replication of selected trace events to a public or permissioned blockchain is a
separate decision after hash anchoring is proven. It requires multi-party governance, privacy/legal approval,
canonical event and correction semantics, key/node operations, sustainable fees/performance and a tested exit
path. Raw evidence files, personal data, secrets and private commercial terms remain off-chain.

Release numbering may change after discovery; capability dependencies and entry criteria matter more than the
labels.

## V2 verification additions

- Infrastructure migration tests restore the Supabase dump to the target standard PostgreSQL version, apply the
  same migration history and reconcile every domain table, material balance, lineage sample, publication revision,
  external-auth mapping and audit sequence.
- Asset migration tests export application-managed Sanity originals to S3-compatible storage, compare every
  SHA-256/size/media type and evidence link, exercise signed access and prove that retry/restart creates neither
  missing nor duplicate application asset records.
- Container tests cover non-root/runtime hardening, immutable versions, health/readiness, web/worker shutdown,
  migration ordering, secret absence from images/logs, resource exhaustion, backup/restore and rollback.
- V1 and N-1 offline clients synchronize against the containerized target without new duplicates, silent loss or
  protocol reinterpretation.
- Certification-scheme fixtures cover readiness, conversion, valid certification, scope mismatch, suspension,
  expiry, renewal and batch downgrade without allowing the software to self-certify an operator or product.
- Organic chain-of-custody tests reconcile certified intake, processing loss, stock, packaged output and sales and
  prevent mixing, labelling or publishing material whose status/scope is inapplicable.
- Claim-methodology tests reproduce fair-price, living-income and carbon results from frozen inputs and prove that
  disputes, evidence corrections, certificate changes and methodology supersession identify affected assertions.
- Farmer-card tests cover offline scanning, authorization, forged/altered tokens, duplicate issuance, lost-card
  revocation, delayed revocation sync, key rotation and replacement without creating a second farmer.
- Report tests reconcile aggregates and drill-down records across permissions, timezones, units, currencies and
  versioned data cutoffs; connector contract tests cover duplicate, reordered, rejected and replayed messages.
- Integrity-anchor tests prove deterministic encoding, Merkle proof verification, key rotation, delayed anchoring,
  duplicate submission and recovery from provider/network outage without blocking operational capture.

## V2 acceptance themes

- Every V1 internal/public identifier still resolves to the same logical record and lineage.
- Every V1 database record is reconciled after the Supabase-to-PostgreSQL migration; no domain table requires a
  Supabase-specific runtime API or extension without an approved portable replacement.
- Every migrated Sanity application asset resolves through the same application asset ID from S3-compatible
  storage, matches its original hash and retains visibility, evidence links, page order, retention and access log.
- Public batch URLs and immutable publication revisions remain valid across the provider cutover. Sanity editorial
  content, if retained, cannot mutate an already approved publication revision.
- Authentication-provider changes preserve application actor IDs, roles subject to reapproval, and historical
  audit attribution. Supabase Auth and target OIDC subjects remain replaceable mappings.
- V1 records render and validate according to their original honey schema, document and rule versions.
- New commodity modules pass the same lineage, offline, evidence, permissions and upgrade contract suite.
- Jurisdiction packs can change without rewriting traceability records or earlier reviewer decisions.
- Organic readiness is never displayed as certification; every organic claim resolves to a current certificate
  whose operator, product, activity, site and batch scope apply.
- Suspending, expiring or narrowing a certificate identifies and blocks every affected organic stock state, label
  approval and claim until authorised review.
- Fair-price, living-income and carbon assertions reproduce from their recorded methodology version and exact
  transaction/evidence snapshot, including stated qualifications.
- Every farmer card uses an opaque credential, works in the agreed offline field flow and can be revoked/replaced
  without exposing private data or changing the farmer identity.
- Serialised packages trace to V1-era batch sources while legacy batch QR pages continue to work.
- Device readings retain raw provenance and remain distinguishable from manual entries.
- OCR never silently changes authoritative metadata or disposition.
- Report totals reconcile to their authorised source records, and generated evidence reports retain their exact
  filters, data cutoff, version and hash.
- Integrations tolerate duplicate delivery and temporary failure, expose reconciliation state and never mark an
  external operation successful before receiving appropriate acknowledgement.
- A hash-anchored record verifies through its Merkle proof, while anchor outages neither corrupt nor halt core
  traceability and are backfilled idempotently.
- Extracted services tolerate duplicate delivery, replay and temporary unavailability without corrupting lineage.
- Backup/restore, migration and rollback are demonstrated at production-scale data volumes.
- Analytics label correlation, inference and confirmed findings distinctly and reproducibly.

## V2 decisions to make from V1 evidence

- Which capability has a funded customer or regulatory need?
- Does a second commodity validate or challenge the V1 compile-time honey-module seam, and is there now enough
  evidence to formalize a `CommodityModule` SDK?
- Which supported PostgreSQL version, S3-compatible implementation, container host/operating system, ingress,
  secrets system and backup targets meet the funded deployment's RPO/RTO and operator capability?
- Will Supabase Auth remain during the infrastructure cutover, or which OIDC/Keycloak subject-mapping, MFA,
  recovery and rollback process has been approved?
- Will Sanity remain for editorial content after application assets move to S3, and how are mutable Sanity drafts
  pinned to immutable PostgreSQL publication revisions?
- What write-freeze or incremental reconciliation window is acceptable for the Supabase/Sanity migration, who
  signs the reconciliation report and when may old provider copies be deleted?
- Are PWA offline limits acceptable on real devices, or is native development justified?
- Which hardware models and protocols are actually used by customers?
- Which module has measured scale, resilience or ownership pressure requiring service extraction?
- What availability objective justifies additional infrastructure?
- Is individual serialisation worth its label, scanning and operating cost?
- Which jurisdiction packs have qualified owners and licensed source material?
- Which organic market, standard/scheme, certification body, operator/group structure, sites, activities and
  products define the first certification scope?
- Which records and controls will the selected certifier accept from HB-TRACE, and which must remain in its own
  portal or controlled forms?
- Which fair-price benchmark, living-income benchmark/methodology and carbon accounting/assurance method are
  approved, and who owns each methodology version?
- Who receives a farmer card, who verifies identity at issuance/use, and what are the loss, revocation, reprint,
  consent and support procedures?
- Which reports are regulatory/certification evidence, who approves them, and which systems/counterparties need
  APIs, webhooks or scheduled file exchange?
- Does a genuine multi-party trust problem justify an external integrity anchor; if so, which anchoring mode,
  network/notary, governance, privacy boundary, key owner, cost ceiling and exit plan are approved?
- Which centrally collected deployment metadata, if any, is acceptable to customers?

## Out of scope unless separately approved

- Claims that software alone certifies legal or standards compliance.
- Displaying “organic,” “fair price,” “living income,” “carbon neutral” or similar wording without an applicable,
  approved assertion and its required certification/methodology evidence.
- Automatic assignment of mixed-batch failures to individual farmers or regions.
- Unreviewed AI/OCR decisions affecting release, rejection, payment or supplier status.
- A public marketplace executing untrusted commodity or compliance code.
- Rewriting historical V1 evidence to match a new module or rule version.
- Personal data, raw evidence files or confidential commercial terms on a public blockchain.
- Full blockchain storage, Kubernetes or microservices adopted without a demonstrated requirement and approved
  operational/governance model.
