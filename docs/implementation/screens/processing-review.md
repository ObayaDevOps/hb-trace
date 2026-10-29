# Screen reference: processing-review

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('processing-review', …).

```javascript
screen('processing-review','production','Processing · review','Check the processing record','Make sure the input and outputs balance.',()=>`${summary([['Input',`${Number(state.processInputOne)+Number(state.processInputTwo)} kg · 2 buckets`],['Process',esc(state.processMethod||'Filter honey')],['Facility',esc(state.facility||'HQ · Processing room 1')],['Honey output',`${esc(state.honeyOutput)} kg`],...(state.processMethod==='Extract honeycomb'?[['Raw wax residue',`${esc(state.waxOutput||'0')} kg`],['Separate waste',`${esc(state.residueOutput||'0')} kg`]]:[]),['Loss',`${esc(state.processLoss)} kg`]])}${callout('Both buckets stay linked','Every output keeps its exact source contributions.')}${callout('Next: quality checks','Processed honey needs the required release before bottling.','info')}`,'processing-saved','Confirm processing',{role:'production',back:'processing-details',step:[3,3,'Process honey']})
```
