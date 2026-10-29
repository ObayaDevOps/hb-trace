# Screen reference: receipt-delivery-status

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('receipt-delivery-status', …).

```javascript
screen('receipt-delivery-status','collect','Receipt · delivery status','Receipt delivery','Company messaging · simulated in this reference',deliveryBody,'collection-done','Done',{back:'receipt-delivery',note:'States: Waiting to sync → Queued → Sent → Delivery confirmed only with provider evidence; Failed → retry the same receipt/request. Sent is provider acceptance, not proof of delivery. Use the gallery simulation controls to exercise callbacks; no messages leave this reference.'})
```
