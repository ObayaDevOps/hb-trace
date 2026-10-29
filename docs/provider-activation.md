# Hosted provider activation

> Historical implementation guidance. Provider/next-work instructions may be superseded. Use [the current implementation entry point](implementation/START-HERE.md) and its authoritative fragments. Sanity is not the selected target provider; Supabase Storage and application-owned editorial revisions govern new work. Do not treat historical checkboxes as current acceptance.

Local mode is the default and does not need credentials. Before switching to
`HB_TRACE_MODE=hosted`, provide these values through the deployment secret
manager or a local `.env.local` file that is never committed. Do not paste
secret values into chat, source files or browser-visible configuration.

## Supabase

Required decisions and values:

- separate development, test/staging and production projects, regions and
  project URLs;
- the project URL and publishable key for SSR/browser authentication;
- a server-only service-role secret for the eventual persistence adapter;
- a direct or session database connection for migrations/long-lived workers,
  plus a pooled runtime connection when the host is serverless;
- the initial organization, role seed and actor mapping policy; and
- sign-in, recovery, invitation, session expiry, device revocation and MFA
  policy.

The current code uses Supabase SSR cookies for the login/session boundary and
returns `501 PERSISTENCE_NOT_CONFIGURED` for hosted writes until a real adapter
is wired to the checked-in migration. This prevents a hosted environment from
claiming that a demo purchase, sync command, import batch or sample publication
was saved. Local purchase/import results are explicitly labelled in-memory.

## Sanity

Required decisions and values:

- Sanity project ID;
- separate public editorial and private evidence datasets or Media Library
  spaces, with the selected plan's private-asset and signed-delivery support;
- API version;
- server-only read/write tokens (never browser tokens); and
- retention, export/restore, region, transfer and asset-review policy.

The private evidence workflow is not activated by setting a token alone. The
backend still needs to create the PostgreSQL upload intent, stream and verify
the asset, record the original-byte hash/metadata, link it to a record, and
issue short-lived signed retrieval only after authorization. Sensitive assets
must be private from their first upload.

## Activation gate

Do not import production personal data or upload signed operational evidence
until the quality/privacy owners have approved the field-level data inventory,
lawful basis/consent map, retention policy, provider contracts, private asset
proof, backup/restore drill, access matrix and target-phone offline tests.

After those inputs are available, the next implementation step is to add the
Supabase persistence adapter, Sanity editorial/asset adapter, seed roles and
organization, then replace the local API fixtures with server command services
that reuse the domain invariants and append audit events.
