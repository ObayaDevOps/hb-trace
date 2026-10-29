# 3. Collection, dates, payment and bucket labels

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/mobile-first-workflow-ui-plan.md — 3. Collection, dates, payment and bucket labels](../../mobile-first-workflow-ui-plan.md#3-collection-dates-payment-and-bucket-labels)

<a id="wf-07-01"></a>
<!-- requirement:WF-07-01 -->
```mermaid
flowchart TD
    A[Record honey collection] --> B[Choose farmer and source apiary]
    B --> C[Choose apiary visit or collection centre]
    C --> D[Enter collection date and harvest timing]
    D --> E[Record material, net weight and receiving grade]
    E --> F[Enter price per kg and payment status]
    F --> G[Assign weight and a code to each bucket]
    G --> H[Review source, dates, buckets and calculated total]
    H --> I[Save durably on device or server]
    I --> J[Write or attach each bucket code]
    J --> K[Provide receipt and record confirmation status]
    K --> L[Done; collect again or open My work]
```
<!-- /requirement:WF-07-01 -->
