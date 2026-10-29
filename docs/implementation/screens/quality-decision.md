# Screen reference: quality-decision

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('quality-decision', …).

```javascript
screen('quality-decision','quality','Quality · receiving decision','Review the receiving checks','Bucket HB-7K2M · 15 kg',()=>`${summary([['Source','Reconciled · Grace A.'],['Receiving check','CHECK-2081'],['Moisture reading','18.4% · example'],['Evidence review','Current checklist and report available']])}${callout('Review all applicable requirements','A single reading does not establish compliance.','info')}${decisionFields()}`,'!quality-decision','Record decision',{role:'quality',back:'quality-home',note:'This later scenario has a reconciled source. Authorized release requires the controlled requirements and evidence; no UNBS certification claim is implied.'})
```
