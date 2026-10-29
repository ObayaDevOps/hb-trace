# Screen reference: infusion-review

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('infusion-review', …).

```javascript
screen('infusion-review','production','Infusion · review inputs','Review infusion INF-201','Confirm the inputs before creating the bucket label.',()=>`${inputSummary(infusionInputs())}${summary([['Total input',kg(sum(infusionInputs().map(l=>l.used)))],['Starts',esc(s.infusionStart)],['Operator',esc(s.infusionOperator)],['Facility',esc(s.infusionFacility)],['Location',esc(s.infusionLocation)],['Checks','Days 7, 14, 21 and 28']])}${callout('Next: write the bucket label','The label will use the chosen honey, ingredient and start date. Keep the batch reference on the bucket too.','info')}`,'!infusion-save','Confirm infusion start',{...production,back:'infusion-start',step:[4,4,'Start infusion'],note:'Atomically allocate only the selected honey and ingredient lots, rechecking eligible quantities on the server. Generate a readable label from the committed inputs and local start date; the stable batch/container identity remains separate. Schedule day 7/14/21/28 checks without automatically completing or releasing the infusion.'})
```
