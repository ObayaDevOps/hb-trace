# Screen reference: processing-details

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('processing-details', …).

```javascript
screen('processing-details','production','Processing · record results','What did you produce?','Record the output and any loss.',()=>`${field('processMethod','Process','Filter honey',{choices:['Filter honey','Blend honey','Extract honeycomb']})}${field('facility','Facility','HQ · Processing room 1',{choices:['HQ · Processing room 1','HQ · Processing room 2'],required:true})}${field('operator','Operator','Daniel · signed-in operator',{readonly:true})}${field('processingTime','Processing time','2026-10-27T13:00',{type:'datetime-local',required:true})}${field('honeyOutput','Honey produced','29.5',{type:'number',inputmode:'decimal',unit:'kg',required:true})}${state.processMethod==='Extract honeycomb'?`${field('waxOutput','Raw wax residue retained for processing','',{type:'number',inputmode:'decimal',unit:'kg',required:true})}${field('residueOutput','Separate waste','',{type:'number',inputmode:'decimal',unit:'kg',required:true})}`:''}${field('processLoss','Recorded loss','0.5',{type:'number',inputmode:'decimal',unit:'kg',required:true})}${field('processLossReason','Reason for loss','Honey remaining on filter equipment',{required:true})}`,'processing-review','Review processing',{role:'production',back:'processing-inputs',step:[2,3,'Process honey'],note:'Honeycomb extraction must use honeycomb inputs and record honey, retained raw wax residue, separate waste and loss. The main fixture demonstrates filtering honey.'})
```
