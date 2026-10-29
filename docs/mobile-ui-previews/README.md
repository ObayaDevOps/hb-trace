# Mobile UI previews

Screenshots and the PDF in this directory are generated from the HTML reference.
Open `../../public/design/mobile-ui/index.html` for editable, scrollable examples
and implementation notes. The illustrations and records are fictional.

- [Visual overview](journey-overview.png): eight representative screens.
- [All 179 screens](mobile-ui-all-screens.pdf): full scrolling content, one screen per page.
- [Desktop reference](desktop-reference.png): gallery with implementation notes.
- [Phone reference](mobile-reference.png): actual 390 px viewport.

The individual screen PNGs show the first viewport, with the next action fixed at
the bottom. The HTML and PDF expose the remaining form content.

Regenerate with `npm run reference:export` (Playwright Chromium and Poppler's
`pdfinfo` required). The command runs layout and workflow checks, then exports
screens from the tested journey states. The PDF includes every stable screen ID,
expanded to show its full content and fitted to one A4 page per screen.

The overview now covers honey and ingredient dropdowns, start details, the suggested
bucket label, infusing stock, weekly checks, check entry and the infused customer page.
Additional individual PNGs cover saved-change review and the new journeys.
The delivery-status PNG shows a failed attempt with the retry action; delivery
states can be simulated using the gallery controls in the HTML reference.
