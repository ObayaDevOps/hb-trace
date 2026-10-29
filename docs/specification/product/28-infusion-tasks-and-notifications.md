# Infusion tasks and notifications

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Infusion tasks and notifications](../../../HB-TRACE-V1-PLAN.md#infusion-tasks-and-notifications)

<a id="prd-28-01"></a>
<!-- requirement:PRD-28-01 -->
- Create due tasks from the committed infusion start for days 7, 14, 21 and 28, using the operational timezone.
  The server owns the task identities, status and reminder schedule. The PWA shows due/overdue work and links to
  the batch's inspection, stirring, fermentation and moisture record; a reminder never completes a check.
<!-- /requirement:PRD-28-01 -->

<a id="prd-28-02"></a>
<!-- requirement:PRD-28-02 -->
- Use the server worker to send optional Web Push reminders to opted-in staff. Register subscriptions against the
  authorized account/device, handle expiry/revocation, deduplicate retries and avoid private details on lock screens.
  Request permission in response to a deliberate user action. Keep the in-app task list authoritative when push
  is unavailable, denied or delayed; do not promise a precise phone alarm while the app is closed or offline.
<!-- /requirement:PRD-28-02 -->

<a id="prd-28-03"></a>
<!-- requirement:PRD-28-03 -->
- Company SMS/WhatsApp receipt delivery remains a separate server-side outbox/provider workflow with its existing
  receipt identity and attempt history. Installing the PWA does not send messages or establish farmer agreement.
<!-- /requirement:PRD-28-03 -->

<a id="prd-28-04"></a>
<!-- requirement:PRD-28-04 -->
- Preserve the restricted offline scope below. HQ processing, infusion-check submission, quality decisions and
  publication continue to require an online authorized action; showing a cached reminder is not a committed action.
<!-- /requirement:PRD-28-04 -->

<a id="prd-28-05"></a>
<!-- requirement:PRD-28-05 -->
Browser capabilities must be verified against the supported device matrix at implementation and release. The
evaluation used the [Next.js PWA guide](https://nextjs.org/docs/app/guides/progressive-web-apps),
[WebKit home-screen behavior](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/),
[WebKit storage policy](https://webkit.org/blog/14403/updates-to-storage-policy/),
[background-sync availability](https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API)
and [WebKit push support](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/).
Reconsider native delivery if tested browser storage cannot meet the approved disconnected period or essential
printer/device integration cannot be supported. That decision requires evidence; native apps remain outside V1.
<!-- /requirement:PRD-28-05 -->
