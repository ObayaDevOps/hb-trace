# Quantity and payment

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/mobile-first-workflow-ui-plan.md — Quantity and payment](../../mobile-first-workflow-ui-plan.md#quantity-and-payment)

<a id="wf-09-01"></a>
<!-- requirement:WF-09-01 -->
Capture the material actually received—honey or honeycomb—using the approved
product choices. Record gross and tare where applicable, show calculated net
weight, and preserve entered measurements. Before save, show net kg, grade,
price per kg, currency and calculated total together. Exact decimal arithmetic
and agreed rounding rules apply on the server as well as in the preview.
<!-- /requirement:WF-09-01 -->

<a id="wf-09-02"></a>
<!-- requirement:WF-09-02 -->
Payment status is explicit: agreed price does not mean paid. Capture an actual
payment amount/reference when payment is recorded. Missing mobile money profile
details do not prevent recording an unpaid collection. Grade choices and the
payment/receipt procedure still need operational definitions before rollout.
<!-- /requirement:WF-09-02 -->
