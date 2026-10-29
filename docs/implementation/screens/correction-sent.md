# Screen reference: correction-sent

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('correction-sent', …).

```javascript
screen('correction-sent','work','Correction queued','Correction saved','We’ll send the correction, then the waiting apiary and collection.',()=>`${success()}${timeline([['Farmer correction','Ready to send','user'],['Shea Grove','Waiting for farmer details','leaf'],['Collection COL-1042','Same 2 bucket codes','bucket'],['HQ arrival','Links once source details are accepted','truck']])}${callout('Keep the original labels','No second purchase or stock receipt will be created.')}`,'sync-status','View sync status',{back:'fix-details'})
```
