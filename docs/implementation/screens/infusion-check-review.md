# Screen reference: infusion-check-review

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('infusion-check-review', …).

```javascript
screen('infusion-check-review','production','Infusion · review weekly check','Review the batch check','Confirm what happened before saving it to INF-201.',()=>summary([['Scheduled day',String(s.infusionCheckDay)],['Actually checked',esc(s.infusionCheckAt)],['Checked by',esc(s.infusionCheckOperator)],['Batch inspected',s.infusionVisualCheck?'Yes':'Not confirmed'],['Stirring',esc(s.infusionStirred)],['Fermentation',esc(s.infusionFermentation)],['Moisture',`${esc(s.infusionMoisture)}%`],['Instrument',esc(s.infusionInstrument)],['Observations',esc(s.infusionCheckNotes||'None')],...(s.infusionStirred==='Not stirred'?[['Reason not stirred',esc(s.infusionStirReason)]]:[])]),'!infusion-check-save','Save check to batch',{...production,back:'infusion-check-record',note:'Append one idempotent observation per scheduled check in this reference. Store actual time, author, stirring or exception reason, fermentation finding, moisture/unit/instrument and notes. Retain original evidence; corrections use explained authorized amendments. Fermentation concerns require quality review; never infer a numerical safety limit.'})
```
