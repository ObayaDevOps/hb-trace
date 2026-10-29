# Offline startup, storage and caching

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Offline startup, storage and caching](../../../HB-TRACE-V1-PLAN.md#offline-startup-storage-and-caching)

<a id="prd-26-01"></a>
<!-- requirement:PRD-26-01 -->
- Implement a service worker that can reopen the prepared field shell after the app is closed and relaunched in
  airplane mode. Cache the required versioned JavaScript, CSS, fonts, icons and permitted help resources. A generic
  offline error page or an already-open tab does not meet the offline-startup requirement.
<!-- /requirement:PRD-26-01 -->

<a id="prd-26-02"></a>
<!-- requirement:PRD-26-02 -->
- The current staff layout performs server-side identity checks. Add a deliberate client startup path for the
  approved, bounded offline session; do not bypass authentication by caching personalized server-rendered pages.
  Require online preparation first, local re-entry protection and server permission revalidation when syncing.
<!-- /requirement:PRD-26-02 -->

<a id="prd-26-03"></a>
<!-- requirement:PRD-26-03 -->
- Use an explicit cache allowlist. Keep authentication/session responses, privileged API calls, private evidence
  retrieval and business-command responses out of generic service-worker caches. Persist authorized field data
  through the account-scoped local model instead of indiscriminately caching staff HTML or API responses.
<!-- /requirement:PRD-26-03 -->

<a id="prd-26-04"></a>
<!-- requirement:PRD-26-04 -->
- Partition local records, attachments and queue access by deployment, organization and actor. Account switching
  must not expose another user's records, send their commands or silently discard unsent work. Retain a documented
  recovery path for expired/revoked sessions and lost/shared devices.
<!-- /requirement:PRD-26-04 -->

<a id="prd-26-05"></a>
<!-- requirement:PRD-26-05 -->
- Persist drafts, operation envelopes and approved attachment bytes before showing local save success. Request
  persistent storage where available, monitor usage, handle quota/write failures and keep text records recoverable
  if a photo cannot be stored. Set numeric offline-duration and queue-size limits from target-device evidence.
<!-- /requirement:PRD-26-05 -->

<a id="prd-26-06"></a>
<!-- requirement:PRD-26-06 -->
- Local storage is not a backup. Persistent-storage permission is not a guarantee against device loss, user
  clearing or all browser eviction conditions. Show unsynced counts and the last confirmed server sync; explain
  recovery limits without claiming that a home-screen icon makes data permanent.
<!-- /requirement:PRD-26-06 -->

<a id="prd-26-07"></a>
<!-- requirement:PRD-26-07 -->
- Sync on app opening/resume, network recovery and explicit Sync now, using the existing per-operation protocol.
  Detect real request failures, not only the browser's online indicator. Background Sync may improve supported
  platforms, but foreground sync remains sufficient for correctness and recovery.
<!-- /requirement:PRD-26-07 -->

<a id="prd-26-08"></a>
<!-- requirement:PRD-26-08 -->
- Keep current public batch status outside long-lived offline caches. The service worker must not extend the
  approved public cache lifetime or conceal a withdrawal/recall. If current status cannot be checked, show an
  unavailable/stale-status response under the publication policy rather than asserting that an old approval is
  current. Review the existing public endpoint's cache headers together with that policy.
<!-- /requirement:PRD-26-08 -->
