# Screen reference: source-resolution-review

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('source-resolution-review', …).

```javascript
screen('source-resolution-review','receive','Supervisor · resolution review','Confirm the resolution','Review what will change and what will stay recorded.',()=>`${summary([['Source','Grace A. · Shea Grove'],['Original collection','15 kg · retained'],['Received measurement','14.8 kg · retained'],['Recorded loss','0.2 kg · spillage'],['Bucket label','HB-7K2M · unchanged']])}${callout('Quality status is unchanged','Any active hold remains in place.','warning')}${check('resolutionConfirmed','I approve this source resolution and adjustment')}`,'supervisor-home','Confirm resolution',{role:'supervisor',back:'source-review',note:'Commit resolution and adjustment under server authority with evidence/history. Do not change a sent command or silently merge physical arrivals.'})
```
