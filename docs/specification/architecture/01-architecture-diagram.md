# Architecture diagram

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/architecture-technical-spec.md — Architecture diagram](../../architecture-technical-spec.md#architecture-diagram)

<a id="arc-01-01"></a>
<!-- requirement:ARC-01-01 -->
```mermaid
flowchart TB
  subgraph Device[Staff phone or browser]
    UI[React staff PWA]
    SW[Service worker: versioned shell only]
    IDB[(IndexedDB via Dexie: scoped drafts, commands, photos)]
    UI <--> IDB
    SW --> UI
  end
  Public[Public customer website]
  subgraph App[Managed Node.js hosting: one codebase]
    API[Next.js App Router API: auth and command validation]
    Domain[Application services and domain rules]
    Projection[Public lookup: approved projection only]
    Worker[Server worker: durable jobs and retries]
    Asset[AssetStore adapter]
    API --> Domain
    API --> Asset
    Worker --> Domain
    Worker --> Asset
  end
  subgraph Supabase[Separate Supabase project per environment]
    Auth[Supabase Auth]
    DB[(PostgreSQL: ledger, audit, evidence metadata, editorial revisions, jobs)]
    Private[(Storage: private quarantine and evidence buckets)]
    Images[(Storage: approved public derivatives)]
  end
  Backup[(Independent encrypted recovery copy: SQL, original bytes, manifest)]
  Messaging[SMS / WhatsApp / optional Web Push providers]
  UI -->|HTTPS commands and sync envelopes| API
  UI <-->|sign-in and session refresh| Auth
  API -->|validate identity; reload application roles| Auth
  Domain <-->|transactional SQL| DB
  Public -->|public code only| Projection
  Projection -->|restricted publication query| DB
  Public -->|approved image URLs| Images
  Worker <-->|claim jobs and persist outcomes| DB
  Asset <-->|server-side S3-compatible API| Private
  Asset -->|approved sanitized copy| Images
  API -->|short-lived authorized download URL| UI
  UI -->|signed GET only| Private
  Worker -->|idempotent delivery requests| Messaging
  DB -->|consistent export| Backup
  Private -->|original bytes and hashes| Backup
  Images -->|retained publication assets| Backup
```
<!-- /requirement:ARC-01-01 -->

<a id="arc-01-02"></a>
<!-- requirement:ARC-01-02 -->
The browser service worker and the server worker have separate responsibilities. The service worker never
commits business decisions. Browser clients do not write operational database tables or carry S3 credentials.
The public lookup path cannot query private source/evidence tables. Diagram arrows describe application
interfaces, not permission to bypass authorization.
<!-- /requirement:ARC-01-02 -->
