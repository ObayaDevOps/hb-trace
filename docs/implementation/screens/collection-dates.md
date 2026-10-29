# Screen reference: collection-dates

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('collection-dates', …).

```javascript
screen('collection-dates','collect','Collection · dates','When was it collected?','Collection and harvest may happen on different days.',()=>`${field('collectionDate','Collection date',state.collectionDate,{type:'date',required:true})}<h2>When was it harvested?</h2>${choice('harvest','exact','I know the exact date')}${choice('harvest','range','I know roughly when')}${choice('harvest','unknown','The harvest date is unknown')}${state.harvest==='exact'?field('harvestDate','Harvest date',state.harvestDate,{type:'date',required:true}):state.harvest==='range'?`<div class="field-grid">${field('harvestFrom','From',state.harvestFrom,{type:'date',required:true})}${field('harvestTo','To',state.harvestTo,{type:'date',required:true})}</div>`:''}`,'collection-weight','Continue',{...stepExtra(2,6,'Honey collection'),back:'collection-place',note:'Require collection date. Preserve exact, approximate and unknown harvest timing without relabelling collection as harvest.'})
```
