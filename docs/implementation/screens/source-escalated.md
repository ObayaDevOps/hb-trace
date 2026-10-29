# Screen reference: source-escalated

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('source-escalated', …).

```javascript
screen('source-escalated','receive','Source issue assigned','Supervisor review requested','Keep the bucket in its current location.',()=>`${success(true)}${summary([['Bucket','HB-7K2M'],['Source','Review pending'],['Quality','Awaiting checks']])}${callout('Stock remains blocked','The supervisor will confirm the source and any differences in weight.','warning')}`,'stock-list','Back to stock',{role:'receiving'})
```
