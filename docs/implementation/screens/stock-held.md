# Screen reference: stock-held

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('stock-held', …).

```javascript
screen('stock-held','receive','Stock · held and unresolved','Bucket HB-8P4C','15 kg · Held stock, Shelf H',()=>`<div class="badges">${badge('Awaiting source details','warning')}${badge('Held','error')}</div>${callout('Do not use this honey','Source details are missing and a quality hold is active.','error')}${summary([['Quality issue','Broken seal at arrival'],['Owner','Quality manager'],['Next review','28 Oct 2026']])}${row('Source investigation','Supervisor review requested','source-escalated','search')}${row('Report more information','Add evidence for the quality manager','report-problem','edit')}`,'stock-list','Back to stock',{role:'receiving',back:'stock-list',note:'Receiving staff see the hold and can report evidence. Only the quality manager may decide disposition.'})
```
