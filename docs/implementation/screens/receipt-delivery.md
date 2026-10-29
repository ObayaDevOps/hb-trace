# Screen reference: receipt-delivery

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('receipt-delivery', …).

```javascript
screen('receipt-delivery','collect','Receipt · preview & destination','Send the receipt', 'The company sends this message after the receipt syncs.',()=>`${receiptPreview()}${field('receiptChannel','Send using',s.receiptMethod==='WhatsApp'?'WhatsApp':'SMS',{choices:['SMS','WhatsApp']})}${choice('recipientKind','farmer','Farmer’s contact number')}${choice('recipientKind','alternative','Farmer-approved alternative recipient')}${field('recipientNumber','Destination number','',{type:'tel',required:true,readonly:s.recipientKind==='farmer',hint:'Use the contact number, not the payment number. If none is recorded, choose an approved alternative.'})}${s.recipientKind==='alternative'?check('recipientApproval','The farmer approved this recipient'):''}${check('receiptDestinationConfirmed','I checked this number and receipt with the farmer')}`,'!receipt-send','Confirm receipt delivery',{back:'receipt-confirm',note:'Keep one stable receipt identity. Company-side outbox and provider adapters handle delivery; do not launch personal messaging apps. Persist channel, approved destination, receipt revision and consent. An alternative recipient requires farmer approval.'})
```
