# Screen reference: processing-saved

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('processing-saved', …).

```javascript
screen('processing-saved','production','Processing recorded','Processing recorded','The new honey lot is ready for its checks.',()=>`${success()}${amount('Processed honey',`${esc(state.honeyOutput)} kg`,'Lot H-108 · Processing run PR-108')}<div class="badges">${badge('Awaiting bottling checks','warning')}</div>${timeline([['Source preserved','HB-7K2M + HB-7K2N','leaf'],['Loss recorded',`${esc(state.processLoss)} kg · filtering equipment`,'scale'],['Quality review next','Bottling is blocked until release','shield']])}`,'bottling-checks','Record bottling checks',{role:'production',secondary:['Back to production','production-home']})
```
