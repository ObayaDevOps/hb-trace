# Screen reference: collection-done

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('collection-done', …).

```javascript
screen('collection-done','collect','Collection complete','All done for now','The honey is labelled and the farmer’s response is recorded.',()=>`${success()}${card(`<h3>${esc(state.farmerName)} · ${net()} kg</h3><p class="small">COL-1042 · 2 labelled buckets</p><div class="badges">${badge('Waiting to sync','warning')}${badge(state.receiptStatus==='confirmed'?'Farmer confirmed':state.receiptStatus==='disputed'?'Dispute recorded':'Follow-up needed',state.receiptStatus==='confirmed'?'':'warning')}</div>`)}${row('View this collection','Receipt, labels and history','collection-history','work')}`,'field-home','Back to home',{secondary:['Record another collection','find-farmer']})
```
