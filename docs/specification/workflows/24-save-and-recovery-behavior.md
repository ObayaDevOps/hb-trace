# Save and recovery behavior

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/mobile-first-workflow-ui-plan.md — Save and recovery behavior](../../mobile-first-workflow-ui-plan.md#save-and-recovery-behavior)

<a id="wf-24-01"></a>
<!-- requirement:WF-24-01 -->
Persist data before showing **Saved on this device**. Show record and photo
progress separately, for example **Details synced; photo waiting to upload**.
Do not call the whole item synced while required operations remain unacknowledged.
Optional photo delays do not block an otherwise valid collection.
<!-- /requirement:WF-24-01 -->

<a id="wf-24-02"></a>
<!-- requirement:WF-24-02 -->
Retry temporary connectivity/server failures; retain rejected/conflicted work for
resolution. Foreground sync runs on app open, network recovery and **Sync now**.
Do not rely on background browser execution. Respect storage limits, approved
offline session age and device access controls. Sign-out/account switching must
protect personal data and preserve unsent work; show its status and the supported
recovery action rather than silently clearing it. Real-device storage, expiry,
upgrade and loss scenarios must pass before the pilot. Private photo storage and
retrieval must satisfy the existing provider proof before accepting live photos.
<!-- /requirement:WF-24-02 -->
