# Mobile UI reference

This is the visual implementation reference for the [mobile workflow plan](mobile-first-workflow-ui-plan.md). It contains **179 mobile screen examples across 11 journeys**, with an interactive phone preview, a searchable directory, an all-screens board and per-screen implementation notes.

## Open the examples

- Open [the reference HTML](../public/design/mobile-ui/index.html) in a browser. It works directly from disk; keep `index.html`, `styles.css`, `screens.js`, `workflows.js` and `app.js` together.
- With the project running, visit `/design/mobile-ui/index.html`.
- For a standalone local preview, run `python3 -m http.server 8765 --bind 127.0.0.1 --directory public/design/mobile-ui`, then open `http://127.0.0.1:8765/`.
- Use **All screens** for the board. **Print / PDF** prints the current view. On a phone, the screen selector replaces the desktop directory.
- Each example has a stable link, such as `index.html#register-farmer` or `index.html#public-batch`. Previous/next controls move through the inventory; app buttons follow the user journey. Alt + left/right also moves through examples.

For a quick visual review, open the [eight-screen overview](mobile-ui-previews/journey-overview.png).
The [complete PDF](mobile-ui-previews/mobile-ui-all-screens.pdf) has one page for
each of the 179 examples, with the full scrolling content expanded. The
[desktop preview](mobile-ui-previews/desktop-reference.png) and
[phone preview](mobile-ui-previews/mobile-reference.png) show the interactive
reference itself.

The reference is a separate design artifact. It does not replace the current application routes or connect to authentication, payment, stock, sync, publication, location or camera services. Every person, reference, weight and transaction is fictional. Edits are in memory and reset on reload; do not enter live personal information. Farmer imagery is an original illustrated placeholder. Maps are illustrative and contain no live locations.

## Journeys

| Journey | Examples | Suggested starting screen |
| --- | ---: | --- |
| Start & find | 9 | `field-home` |
| Meet a farmer | 6 | `register-farmer` |
| Add the details | 16 | `profile-sections` |
| Collect & label | 14 | `collection-place` |
| My work & offline | 13 | `my-work` |
| Receive & stock | 22 | `hq-home` |
| Process & bottle | 36 | `production-home` |
| Review a problem | 32 | `quality-home` |
| Approve the public page | 6 | `publication-home` |
| The customer journey | 9 | `public-lookup` |
| Account & help | 16 | `account` |

These are screen templates and state examples, not 179 required steps. A field officer normally sees a short registration, a collection wizard, labels and a receipt. Optional details and exception handling appear only when needed. Role scenarios represent different people or points in time: the unreconciled arrival, released stock, and recalled batch are not simultaneous states of one live record.

## Try the important interactions

1. **Quick registration:** farmer name, phone or explicit no-phone choice, apiary name and description, review. Optional sections are separate.
2. **Collection:** switch apiary/centre, exact/range/unknown harvest dates and paid/unpaid status. Gross/tare and price previews update. Invalid harvest dates and mismatched bucket totals stay on the form with an error. Back navigation preserves edited values.
3. **Payment and receipt:** `profile-contact` requires the registered mobile-money holder when a payment number exists. Choose SMS or WhatsApp at `receipt-confirm`, preview the receipt and confirm the contact number or an approved alternative. Gallery controls beside `receipt-delivery-status` simulate sync/provider outcomes; failed delivery retries the same receipt. Delivery never changes farmer agreement.
4. **HQ:** receive a bucket whose source has not synced, review stock, check for the source and continue to quality checks. Stock filters demonstrate overlapping source/quality states without duplicate physical quantities.
5. **Production:** input allocations, processing balance, jars and packaging balance. Conflicting quantities are rejected in the preview. Honeycomb extraction separately shows honey, raw wax residue retained for processing, waste and loss. Continue through raw bucket storage, quality review, partial/multiple-source wax processing and finished stock.
6. **Quality:** trace impact, record a hold, retest, release, reject, or confirm withdrawal/recall. The public-update failure has its own recovery state. Checkboxes require deliberate confirmation for the illustrated privileged decisions.
7. **Customer lookup:** `HB-261027-A` shows one source, `HB-261027-B` a blend, and `HB-261027-C` a page without a farmer profile. Any other ordinary code shows the neutral not-found state. `HB-RECALL` and `HB-RETRY` are prototype shortcuts to the notice and unavailable examples.
8. **Bulk infusion:** record ingredient purchases with kg/g balances and internal lot references; release eligible ingredients; choose available honey from one dropdown and use **Add another honey batch** when needed. Ingredient selection starts with one dropdown. Confirm the infusion to receive a suggested honey/ingredient/date label to write on the bucket. Record inspection, stirring, fermentation and moisture on days 7, 14, 21 and 28; history retains every actual check. Then record actual completion and ingredient removal/retention. Completion and quality release gate bottling; packaging and publication follow separately. `HB-261028-I` shows the infused public example.
9. **Saved changes:** saved profile edits show previous/proposed values and require a change-and-reason note. Cancel restores originals. First-save registration and collection drafts need no note. Committed collection/material quantities use their authorized amendment workflows.
10. **Recovery:** My work, correction, supervisor resolution, expired session, device save failure, photo storage failure and unsent-work sign-out protection all have examples.

New stock actions use session-only balances and recorded input snapshots. A reload resets them. The sample has one extraction, wax run and infusion; production must support arbitrary runs and query all downstream branches. Some actions deliberately demonstrate a destination state rather than executing it. “Sync now” simulates a record sync; scan/GPS buttons choose sample values; photo selection creates a local preview only; printed pages are design references. Search and editing examples are limited to the illustrated records. The two-bucket collection and fixed processing lots illustrate the layout; the product must support an arbitrary number of eligible buckets/lots and recompute all downstream summaries from authoritative data. Amounts in the prototype use JavaScript previews, not the required production decimal/money implementation.

## Design decisions to carry into the product

- **One primary action per step.** The action stays at the bottom; content scrolls above it. A secondary “Do this later” or “Save and finish later” offers a clear exit.
- **Short, familiar labels.** Explain a restriction beside the task it affects. Keep command IDs, dependency handling, allocations and API details in the system or build notes.
- **Readable on a phone.** The reference phone is 390 px wide. Inputs are at least 54 px high; main buttons are 54 px; icon controls are 48 px. Radio/checkbox rows enlarge the target. Labels remain visible above entered values.
- **Plain status language.** “Saved on this phone”, “Waiting to sync”, “Awaiting source details”, “Held” and “Released for processing” mean different things. Icons and text accompany colour.
- **Small steps; details when needed.** Three-step minimum registration; independent profile sections; six-step collection; three-step receiving, processing and bottling.
- **Source and custody are different.** A collection centre never replaces the source apiary. A physical arrival appears in stock once, even before source reconciliation.
- **Private and public content are separate.** Identity/payment/contact fields, private notes and exact GPS never appear in customer screens. Public profile omission has a complete example.
- **Dates remain honest.** Collection date is distinct from exact, approximate or unknown harvest timing. Blends retain dates for each contributor.
- **Labels identify buckets and batches.** The jar code is shared by the batch. There is no per-jar serialization.
- **Recovery preserves work.** Save failure cannot look like success. Corrections retain labels/history. Source resolution does not clear quality restrictions.

## Visual tokens and components

| Token | Value | Purpose |
| --- | --- | --- |
| Main text | `#243c32` | Headings and readable content |
| Primary action | `#244b38` | Main next step |
| Page | `#faf9f5` | Warm, quiet background |
| Surface | `#ffffff` | Forms and cards |
| Supporting text | `#657369` | Explanations and secondary labels |
| Positive surface | `#edf3eb` | Confirmations |
| Waiting surface | `#fff3d8` | Pending/offline states |
| Problem text | `#9c3834` | Errors and destructive confirmation |
| Input radius | `12px` | Large form controls |
| Card radius | `18px` | Grouped information |

Use the operating system sans-serif stack; the reference has no font download dependency. Main phone headings are 28–29 px, body text 15–16 px, and controls 15–16 px. The serif font belongs to the design gallery and customer storytelling, not operational forms.

Reusable patterns are: app header, bottom navigation, progress indicator, labelled field, choice row, status callout, summary list, task card, source card, quantity total, bucket label, timeline, fixed action area, empty state, and inline validation. Extract these into the product’s React components; do not ship the gallery renderer as production business logic.

## Implementation boundaries

[HB-TRACE-V1-PLAN.md](../HB-TRACE-V1-PLAN.md) remains the authority. The production server must enforce role/organization scope, immutable traceability, exact quantity/money arithmetic, idempotency, durable sync, identity correction, material availability, quality release and privacy-safe publication. Never infer those properties from a successful prototype transition.

Before implementation, the product/quality owners still need the agreed identifier label; receiving grades; licensed standards, tests and limits; receipt/payment procedure; supported printers and label specification; photo/privacy policy; offline/session limits; public notice and cache-update policy; and real support contacts. The examples reserve those places without inventing approvals or regulatory thresholds.

The secondary document library and supervisor queue show how specialist tasks remain discoverable. Bulk imports, administration, exports and advanced reporting stay in their existing specialist scope; this mobile design does not create new configuration or spreadsheet-import products.

## Files and validation

- [HTML entry](../public/design/mobile-ui/index.html): gallery shell.
- [Styles and tokens](../public/design/mobile-ui/styles.css): mobile components, responsive gallery and printing.
- [Screen definitions](../public/design/mobile-ui/screens.js): ordered inventory, copy, fictional fixtures, transitions and build notes.
- [Extended workflow examples](../public/design/mobile-ui/workflows.js): payment holder, company receipt states, amendments, wax and ingredient/infusion fixtures, allocations and review gates.
- [Browser checks and exporter](../scripts/mobile-reference.mjs): repeatable interaction/layout tests, inventory, PNG and PDF generation.
- [Prototype interactions](../public/design/mobile-ui/app.js): navigation, session-only edits, preview calculations and illustrative validation.
- [Complete screen inventory](mobile-ui-screen-inventory.md): every stable screen ID and next action.

Install the development dependencies and a Playwright Chromium browser (`npx playwright install chromium`). Run `npm run test:browser` for the reference checks and `npm run reference:export` to regenerate the inventory, screenshots and PDF. Export also requires `pdfinfo` from Poppler to verify one page per screen. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to use an already installed compatible Chromium when the default executable is unavailable. No dev server, network, credentials or external service is used by the browser checks. Run the application build and typecheck sequentially: the build regenerates `.next/types`, which typecheck reads.

Browser validation checks every screen at 320 px, 390 px and desktop width, verifies navigation targets and exercises the collection, quantity validation, saved changes, receipt delivery, wax, ingredient selection, infusion checks, bottling gates and public privacy examples. These checks assess the reference UI, not live sync, payments, standards compliance or real-device storage.

Validation completed on 28 October 2026:

- All 179 screens rendered at 320 px, 390 px and 1440 px; no horizontal form overflow and no missing screen destinations.
- Exercised holder-name validation; saved-change review/cancellation; SMS and WhatsApp, contact defaults, alternative approval and same-receipt retry; extraction, raw-wax release, partial multi-source wax processing; purchase units/balances; dropdown add/remove and insufficient-stock handling; suggested labels; weekly check dates, moisture validation and immutable check history; infusion completion and release; bottling/packaging/publication; and honey/ingredient tracing and public privacy. New browser tests are available for repetition.
- JavaScript syntax checks, `npm run typecheck`, and all 41 existing tests passed; the added browser workflow suite passed.
- `npm run build` failed in this environment because Turbopack could not bind its CSS compilation port, including outside the sandbox. `npm run build -- --webpack` completed successfully.
- PDF export verified: 179 pages. No production application behaviour was changed.

The honey/ingredient/start screens remain **103–105** with their existing stable IDs.
New production screens cover the suggested bucket label, weekly schedule, check
entry and check review. The overview and new individual screenshots show these
steps; `infusion-checks` and `infusion-history` retain recorded moisture and observations.
