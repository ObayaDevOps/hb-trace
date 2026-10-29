# Screen reference: source-waiting

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('source-waiting', …).

```javascript
screen('source-waiting','receive','Waiting for source','Waiting for the field record','The bucket arrived before its collection details.',()=>`${summary([['Bucket','HB-7K2M'],['Arrival','ARR-2081'],['Received weight','15 kg']])}${callout('We’ll link the original arrival','When the collection syncs, the source can be checked without counting this honey again.','info')}${row('Code or source looks wrong?','Ask a supervisor to investigate','source-escalated','alert')}`,'source-linked','Check for source details',{role:'receiving',back:'stock-item',note:'This button demonstrates a later successful sync. In production, only an unambiguous registered identity/code match can auto-link.'})
```
