# 26-push: Optional push reminders

## Outcome

Deliver opted-in reminders without making notifications necessary for task correctness. This optional task does not block core pilot delivery.

## Prerequisites and reading

Required: 05-behavior and 23-behavior, including their accepted job and infusion-task interface summaries. Read only the appended push/device rules. Approved decisions: devices and messaging. Inspect the client-safe subscription type and server job port named by these prerequisites; do not read story screens.

## Work

1. Define account/device subscription records with opt-in, expiry/revocation and privacy-safe payloads; get coordinator review for the migration and API delta.
2. Register permission only after a deliberate action; send through the existing server worker with retry deduplication and expired-subscription cleanup.
3. Link notifications to the authoritative due task. Denied, unavailable or delayed push must leave the in-app task list usable. Receiving a notification never completes a check.

## Lightweight verification

Exercise one subscription/send with a fake provider and one permission-denied fallback. Defer the device/provider matrix to increment 28. No full build or suite for this task.

## Handoff

Record API and job exports, changed files, focused evidence, unresolved activation settings and opt-out behavior in state/tasks/26-push.md. No dependency on editorial implementation.
