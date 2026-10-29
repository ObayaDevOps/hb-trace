# Screen reference: receipt-confirm

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('receipt-confirm', …).

```javascript
screen('receipt-confirm','collect','Receipt confirmation','Does the farmer agree?','Record their response. You can follow up later.',()=>`${choice('receiptStatus','confirmed','Confirmed by the farmer','The farmer agrees with the receipt.')}${choice('receiptStatus','unavailable','Could not confirm today','Record why and follow up.')}${choice('receiptStatus','disputed','The farmer disagrees','Keep the receipt and record the issue.')}${state.receiptStatus!=='confirmed'?field('receiptNote','What needs following up?','',{area:true,required:true}):''}${field('receiptMethod','Receipt provided as','Paper copy',{choices:['Paper copy','Printed receipt','Shown on this phone','Not provided yet']})}`,'collection-done','Save response',{back:'collection-receipt',note:'Confirmation, unavailable confirmation and disputes append to the original transaction; they do not rewrite it.'})
```

## Later overrides for this screen

These changes apply after the base definition and take precedence for the properties they replace.
Source: public/design/mobile-ui/workflows.js.

```javascript
change('receipt-confirm',{next:'!receipt-response',label:'Save response and continue',body:()=>`${choice('receiptStatus','confirmed','Confirmed by the farmer','The farmer agrees with the receipt.')}${choice('receiptStatus','unavailable','Could not confirm today')}${choice('receiptStatus','disputed','The farmer disagrees')}${s.receiptStatus!=='confirmed'?field('receiptNote','What needs following up?','',{area:true,required:true}):''}${field('receiptMethod','Receipt provided as','Paper copy',{choices:['Paper copy','Printed receipt','Shown on this phone','SMS','WhatsApp','Not provided yet']})}${callout('Delivery and agreement are separate','Sending a message or confirming delivery never records farmer agreement.','info')}`,note:'Company services send SMS and WhatsApp after sync. Farmer response is an independent append-only acknowledgement. Changing a saved response requires a reason and retains the original.'})
```
