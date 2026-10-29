# 1. End-to-end flow

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/mobile-first-workflow-ui-plan.md — 1. End-to-end flow](../../mobile-first-workflow-ui-plan.md#1-end-to-end-flow)

<a id="wf-03-01"></a>
<!-- requirement:WF-03-01 -->
```mermaid
flowchart TD
    A[Field officer signs in] --> B{What would you like to do?}
    B -->|Register| C[Quick farmer and apiary registration]
    B -->|Collect| D[Find farmer and choose apiary]
    B -->|My work| E[Resume work or view history]
    C --> F{Collect now?}
    F -->|Later| G[Done or add optional profile details]
    F -->|Yes| H[Record dates, weight, grade and price]
    D --> H
    H --> I[Save, label each bucket and provide receipt]
    I --> J[HQ receives buckets into stock immediately]
    J --> K[Resolve source details and record quality checks]
    K --> L{Eligible for processing?}
    L -->|No| M[Keep separate with a clear review action]
    L -->|Yes| N[Process; preserve all source contributions]
    N --> O[Quality review and bottling]
    N --> W[Label and store raw wax residue]
    W --> X[Melt and filter eligible wax allocations]
    X --> Y[Review balance and store labelled finished wax]
    N --> IH[Choose honey and purchased ingredient lots]
    IP[Record ingredient purchases] --> IH
    IH --> IS[Confirm infusion and generate honey-ingredient-date bucket label]
    IS --> WC[Weekly checks on days 7, 14, 21 and 28]
    WC --> IC
    IS --> IC[Record actual completion and output balance]
    IC --> IQ[Quality owner reviews infused product]
    IQ --> O
    O --> P[Label jars with the finished batch code]
    P --> Q[Approve and publish the public batch page]
    Q --> R[Customer looks up the code on the other website]
```
<!-- /requirement:WF-03-01 -->

<a id="wf-03-02"></a>
<!-- requirement:WF-03-02 -->
Collections can happen at an apiary or a collection centre. Record both the
**source apiary** and the **receiving place**; a collection centre never replaces
the source. One farmer may have several apiaries, one collection may fill several
buckets, and one finished batch may contain several source lots.
<!-- /requirement:WF-03-02 -->
