# Screen reference: infusion-start

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('infusion-start', …).

```javascript
screen('infusion-start','production','Infusion · start details','Start the bulk infusion','Record where and when the infusion starts.',()=>`${field('infusionStart','Actual start date and time','',{type:'datetime-local',required:true,hint:'Kampala time.'})}${field('infusionOperator','Operator','',{required:true})}${field('infusionFacility','Facility','',{required:true})}${field('infusionLocation','Storage location','',{required:true})}${callout('A bucket label comes next','After confirming, copy the suggested honey, ingredient and date label onto the bucket.','info')}${callout('Weekly checks','Check and stir on days 7, 14, 21 and 28. Check for fermentation and record moisture at every check.','info')}`,'infusion-review','Review all inputs',{...production,back:'infusion-ingredients',step:[3,4,'Start infusion']})
```
