# Offline capture and synchronization

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Offline capture and synchronization](../../../HB-TRACE-V1-PLAN.md#offline-capture-and-synchronization)

<a id="prd-29-01"></a>
<!-- requirement:PRD-29-01 -->
V1 supports offline creation of farmer/apiary drafts where permitted, purchase/harvest capture, receipt creation,
farmer acknowledgement/dispute capture, fallback label assignment and related photo queuing. Material allocation,
transformation commit, quality disposition, document approval, recall, user administration and publication require
an online server decision. Additional offline commands require a reviewed conflict policy and tests before release.
<!-- /requirement:PRD-29-01 -->

<a id="prd-29-02"></a>
<!-- requirement:PRD-29-02 -->
Each locally durable command envelope contains:
<!-- /requirement:PRD-29-02 -->

<a id="prd-29-03"></a>
<!-- requirement:PRD-29-03 -->
- `operationId`: a stable UUIDv4 used as the idempotency key;
<!-- /requirement:PRD-29-03 -->

<a id="prd-29-04"></a>
<!-- requirement:PRD-29-04 -->
- device, authenticated actor and application/deployment identity;
<!-- /requirement:PRD-29-04 -->

<a id="prd-29-05"></a>
<!-- requirement:PRD-29-05 -->
- command type and command schema version;
<!-- /requirement:PRD-29-05 -->

<a id="prd-29-06"></a>
<!-- requirement:PRD-29-06 -->
- target aggregate ID and expected/base version where applicable;
<!-- /requirement:PRD-29-06 -->

<a id="prd-29-07"></a>
<!-- requirement:PRD-29-07 -->
- event occurrence time, device capture time, timezone and current client version;
<!-- /requirement:PRD-29-07 -->

<a id="prd-29-08"></a>
<!-- requirement:PRD-29-08 -->
- dependency operation IDs, so a purchase cannot reach the server before its new farmer/apiary;
<!-- /requirement:PRD-29-08 -->

<a id="prd-29-09"></a>
<!-- requirement:PRD-29-09 -->
- payload and deterministic payload hash; and
<!-- /requirement:PRD-29-09 -->

<a id="prd-29-10"></a>
<!-- requirement:PRD-29-10 -->
- local attachment references without embedding Supabase Storage credentials or provider IDs.
<!-- /requirement:PRD-29-10 -->

<a id="prd-29-11"></a>
<!-- requirement:PRD-29-11 -->
The server stores the operation ID, payload hash and result. Repeating the same ID and hash returns the original
result; repeating an ID with a different hash is rejected as misuse. Per-operation responses are **acknowledged**,
**rejected**, **conflicted** or **dependency pending** and include a stable error type and safe remediation. A batch
transport response never causes the client to discard commands that lack individual acknowledgement.
<!-- /requirement:PRD-29-11 -->

<a id="prd-29-12"></a>
<!-- requirement:PRD-29-12 -->
- Cache the application shell, the minimum role-permitted reference data and approved staff guidance needed by the
  supported offline workflows. Cache an approved SOP file only when policy permits it; never cache licensed
  standards merely because their metadata is available.
<!-- /requirement:PRD-29-12 -->

<a id="prd-29-13"></a>
<!-- requirement:PRD-29-13 -->
- Persist commands and queued original images in IndexedDB before showing **saved on this device**. Display
  **pending locally**, **sending**, **conflicted/rejected** and **safely acknowledged by server** distinctly.
<!-- /requirement:PRD-29-13 -->

<a id="prd-29-14"></a>
<!-- requirement:PRD-29-14 -->
- Request persistent browser storage where supported, monitor quota and warn/block additional photos before a safe
  threshold is reached. Browser-local data is never described as backed up.
<!-- /requirement:PRD-29-14 -->

<a id="prd-29-15"></a>
<!-- requirement:PRD-29-15 -->
- Synchronize in the foreground on app open, explicit **Sync now**, network recovery and while the app remains
  active. Background Sync is an optional optimization, not a correctness dependency.
<!-- /requirement:PRD-29-15 -->

<a id="prd-29-16"></a>
<!-- requirement:PRD-29-16 -->
- Printing or sharing an offline receipt states that it is saved on the named device and not yet server-confirmed.
<!-- /requirement:PRD-29-16 -->

<a id="prd-29-17"></a>
<!-- requirement:PRD-29-17 -->
- Never use last-write-wins for identity merging, inventory, disposition, documents, lineage or publication.
  Conflicts retain both the proposed command and server context for authorised resolution.
<!-- /requirement:PRD-29-17 -->

<a id="prd-29-18"></a>
<!-- requirement:PRD-29-18 -->
- Define a supported maximum offline duration, queued-record count and photo volume from real-device tests.
<!-- /requirement:PRD-29-18 -->

<a id="prd-29-19"></a>
<!-- requirement:PRD-29-19 -->
- Define offline session continuation separately from online login. Cache only the minimum identity/role snapshot,
  enforce a maximum offline session age, require device screen lock and local re-entry control, and prohibit
  privileged offline approvals.
<!-- /requirement:PRD-29-19 -->

<a id="prd-29-20"></a>
<!-- requirement:PRD-29-20 -->
- Support IndexedDB schema migrations, an explicit minimum/maximum supported client protocol and at least the
  agreed N-1 client compatibility window. Do not activate an incompatible service worker while pending commands
  exist.
<!-- /requirement:PRD-29-20 -->

<a id="prd-29-21"></a>
<!-- requirement:PRD-29-21 -->
- Apply the PWA installation, account isolation, cache, storage and upgrade requirements above to every supported
  offline command; a standalone window does not broaden the list of permitted offline actions.
<!-- /requirement:PRD-29-21 -->

<a id="prd-29-22"></a>
<!-- requirement:PRD-29-22 -->
- An authorised user may clear safely acknowledged local data or revoke a lost/shared device without deleting
  server records. Unsynced data is cleared only through an explicit warning and documented recovery decision.
<!-- /requirement:PRD-29-22 -->
