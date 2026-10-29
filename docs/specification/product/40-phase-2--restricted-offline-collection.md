# Phase 2 — Restricted offline collection

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Phase 2 — Restricted offline collection](../../../HB-TRACE-V1-PLAN.md#phase-2--restricted-offline-collection)

<a id="prd-40-01"></a>
<!-- requirement:PRD-40-01 -->
- Deliver the prepared client shell and service-worker cache policy so the installed app can reopen supported
  tasks without a network. Implement account isolation, durable drafts/attachment storage, quota handling, local
  re-entry and a field-readiness check; never cache private server-rendered sessions as an authentication substitute.
<!-- /requirement:PRD-40-01 -->

<a id="prd-40-02"></a>
<!-- requirement:PRD-40-02 -->
- Implement the versioned command envelope, dependencies, stable idempotency results, explicit foreground sync,
  device/session policy and conflict-resolution work queue.
<!-- /requirement:PRD-40-02 -->

<a id="prd-40-03"></a>
<!-- requirement:PRD-40-03 -->
- Enable only the approved collection commands, offline receipt wording, fallback code/later QR assignment and
  bounded photo queue.
<!-- /requirement:PRD-40-03 -->

<a id="prd-40-04"></a>
<!-- requirement:PRD-40-04 -->
- Test duplicate, reordered, partially acknowledged, stale-version, expired-session, quota and old-client cases on
  the actual supported phones before expanding the pilot.
<!-- /requirement:PRD-40-04 -->

<a id="prd-40-05"></a>
<!-- requirement:PRD-40-05 -->
- Exercise installation-context changes, app/device restart in airplane mode, updates with unsent commands/photos,
  interrupted IndexedDB migrations and recovery across the agreed compatibility window.
<!-- /requirement:PRD-40-05 -->
