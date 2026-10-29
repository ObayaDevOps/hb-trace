# Installation and navigation

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Installation and navigation](../../../HB-TRACE-V1-PLAN.md#installation-and-navigation)

<a id="prd-25-01"></a>
<!-- requirement:PRD-25-01 -->
- Serve production over HTTPS. Link one authoritative manifest using Next.js metadata conventions, with a stable
  app ID, name, theme, deliberate scope and a staff launch URL. Handle online sign-in and return to the intended
  task; keep public customer verification accessible without installation.
<!-- /requirement:PRD-25-01 -->

<a id="prd-25-02"></a>
<!-- requirement:PRD-25-02 -->
- Provide real square 192 × 192 and 512 × 512 icons, a maskable variant with a safe area, and appropriate Apple
  touch-icon metadata. Declared image dimensions must match the files. Test legibility, padding and launch behavior
  on actual devices rather than accepting a manifest-only check.
<!-- /requirement:PRD-25-02 -->

<a id="prd-25-03"></a>
<!-- requirement:PRD-25-03 -->
- Offer an Install action when the browser supports it and clear browser-menu instructions otherwise. For iPhone
  and iPad, explain Share → Add to Home Screen and Open as Web App where shown. Detect standalone mode so an
  installed user is not repeatedly prompted. A declined install does not block browser use.
<!-- /requirement:PRD-25-03 -->

<a id="prd-25-04"></a>
<!-- requirement:PRD-25-04 -->
- Provide in-app back/home navigation, usable keyboard and viewport behavior, safe-area spacing, accessible touch
  targets and clear connection/sync status in standalone mode. Do not assume a visible browser toolbar.
<!-- /requirement:PRD-25-04 -->

<a id="prd-25-05"></a>
<!-- requirement:PRD-25-05 -->
- Prepare the installed app online before field use. Verify sign-in, permitted reference data, local storage and
  the offline shell in that installed context; do not assume an existing browser-tab session or unsynced queue
  automatically transfers to a separately installed app.
<!-- /requirement:PRD-25-05 -->
