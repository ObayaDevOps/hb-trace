# Dates

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/mobile-first-workflow-ui-plan.md — Dates](../../mobile-first-workflow-ui-plan.md#dates)

<a id="wf-08-01"></a>
<!-- requirement:WF-08-01 -->
- **Collection date:** required; default to today in the operational timezone
  and let the officer correct it for a past collection.
<!-- /requirement:WF-08-01 -->

<a id="wf-08-02"></a>
<!-- requirement:WF-08-02 -->
- **Harvest timing:** choose **Exact date**, **Approximate date range**, or
  **Unknown**. Require the appropriate date fields only for the first two
  choices. Check that a known harvest date or range is valid and does not end
  after the collection date; ask the officer to correct inconsistent entries.
<!-- /requirement:WF-08-02 -->

<a id="wf-08-03"></a>
<!-- requirement:WF-08-03 -->
- **System times:** preserve device capture and server receipt/commit times
  separately. Sync must never substitute its own time for collection or harvest.
<!-- /requirement:WF-08-03 -->

<a id="wf-08-04"></a>
<!-- requirement:WF-08-04 -->
- **Customer labels:** use **Collected on**, **Harvested on**, **Harvested between
  … and … (approximate)**, or **Harvest date not recorded**. A collection date
  must never be relabelled as a harvest date. Preserve the distinction for
  every contributor to a blended batch.
<!-- /requirement:WF-08-04 -->
