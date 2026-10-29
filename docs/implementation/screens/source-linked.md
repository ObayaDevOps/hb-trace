# Screen reference: source-linked

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('source-linked', …).

```javascript
screen('source-linked','receive','Source linked after sync','Source details found','The original arrival now links to Grace’s collection.',()=>`${success()}${source()}${summary([['Collection','COL-1042'],['Bucket','HB-7K2M'],['Collected weight','15 kg'],['Received weight','15 kg'],['Arrival','ARR-2081 · unchanged']])}${callout('Quality checks still needed','Linking the source does not release the honey.','warning')}`,'quality-checks','Continue to checks',{role:'receiving',back:'stock-item'})
```
