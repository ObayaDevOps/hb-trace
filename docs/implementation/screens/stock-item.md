# Screen reference: stock-item

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('stock-item', …).

```javascript
screen('stock-item','receive','Stock · awaiting source','Bucket HB-7K2M','Arrival ARR-2081',()=>`${amount('In stock','15 kg','Receiving bay · Shelf A')}<div class="badges">${badge('Awaiting source details','warning')}${badge('Awaiting checks','neutral')}</div>${callout('Keep this honey separate','Processing is blocked while source details are missing.','warning')}${timeline([['Arrived at HQ','27 Oct · 11:20 · 15 kg','truck'],['Source record pending','Waiting for the field collection to sync','clock']])}${row('Record quality observations','Checks can begin while the source is pending','quality-checks','shield')}`,'source-waiting','Review source',{role:'receiving',back:'stock-list'})
```
