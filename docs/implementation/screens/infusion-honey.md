# Screen reference: infusion-honey

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('infusion-honey', …).

```javascript
screen('infusion-honey','production','Infusion · choose honey','Choose honey for infusion','Choose an available honey batch and the weight to use.',()=>`${lotSelectors('honey')}${callout('Combining honey batches?','Use Add another honey batch to choose each source separately.','info')}`,'infusion-ingredients','Add ingredients',{...production,step:[1,4,'Start infusion']})
```
