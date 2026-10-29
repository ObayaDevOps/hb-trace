# Screen reference: stock-released

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('stock-released', …).

```javascript
screen('stock-released','receive','Stock · released','Bucket HB-7K2N','15 kg · Receiving bay, Shelf B',()=>`<div class="badges">${badge('Source confirmed')}${badge('Released for processing')}</div>${source()}${timeline([['Received at HQ','27 Oct · 11:22 · 15 kg','truck'],['Source confirmed','Collection COL-1042','leaf'],['Released for processing','Quality manager · 27 Oct, 12:10','shield']])}${callout('Ready for the next step','Only the available quantity can be allocated.')}`,'processing-inputs','Start processing',{role:'production',back:'stock-list',note:'Processing action is shown to a permitted production user. Receiving-only users would see status without allocation controls.'})
```
