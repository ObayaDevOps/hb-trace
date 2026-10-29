# Screen reference: identity-resolved

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('identity-resolved', …).

```javascript
screen('identity-resolved','support','Supervisor · identity resolved','The source can continue','The decision and its evidence are recorded.',()=>`${success()}${timeline([['Farmer identity resolved','Original draft and decision stay in history','user'],['Apiary and collection reconnect','Same logical records and quantities','leaf'],['Labels remain unchanged','HB-7K2M · HB-7K2N','bucket'],['Existing HQ arrival reconciles','No duplicate receipt or stock quantity','truck']])}${callout('Quality decisions stay separate','An active quality hold is still owned by the quality manager.','warning')}`,'supervisor-home','Back to review queue',{role:'supervisor'})
```
