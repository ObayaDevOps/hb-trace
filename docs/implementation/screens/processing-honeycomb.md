# Screen reference: processing-honeycomb

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('processing-honeycomb', …).

```javascript
screen('processing-honeycomb','production','Honeycomb extraction example','Record honeycomb extraction','An example of the separate honeycomb process.',()=>`${card('<h3>Honeycomb lot C-204</h3><p class="small">30 kg taken · source confirmed · released for extraction</p>')}${summary([['Honey produced','24 kg'],['Raw wax residue retained for processing','3 kg'],['Residue','2 kg'],['Recorded loss','1 kg'],['Total output and loss','30 kg']])}${callout('Every output keeps its source','Honey, wax and residue are separate recorded outputs.')}${field('combEvidence','Extraction record reference','EXTRACT-204',{required:true})}`,'production-home','Confirm extraction example',{role:'production',back:'production-home',note:'Separate fictional honeycomb scenario. Do not apply extraction to the honey inputs in PR-108. Product forms require editable inputs, operator/facility/time and a review before commit.'})
```

## Later overrides for this screen

These changes apply after the base definition and take precedence for the properties they replace.
Source: public/design/mobile-ui/workflows.js.

```javascript
change('processing-honeycomb',{heading:'Record honeycomb extraction',intro:'C-204 · 30 kg · Shea Grove · released for extraction',body:()=>`${field('combOperator','Operator','',{required:true})}${field('combFacility','Facility','',{required:true})}${field('combTime','Extraction date and time','',{type:'datetime-local',required:true})}${weight('combHoney','Honey produced',24)}${weight('combRaw','Raw wax residue retained for processing',5)}${weight('combWaste','Separate waste',0.5)}${weight('combLoss','Loss',0.5)}${field('combEvidence','Extraction record and loss explanation','',{required:true})}${callout('Raw wax still needs processing','Keep raw wax residue in labelled buckets linked to EX-204 and C-204.','info')}`,next:'raw-wax-storage',label:'Weigh and store raw wax',note:'Extraction creates separate honey and raw wax outputs, waste and losses. Weigh all retained buckets. No finished wax is created until the melting/filtering transformation is committed.'})
```
