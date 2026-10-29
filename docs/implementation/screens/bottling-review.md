# Screen reference: bottling-review

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('bottling-review', …).

```javascript
screen('bottling-review','production','Bottling · review','Check this bottling run','Confirm actual quantities before creating the finished batch.',()=>`${summary([['Input',`${esc(state.bottleInput||'29.5')} kg · H-108`],['Bottled',`${state.jars} × ${state.jarSize} g`],['Bottled honey',`${Number(state.jars)*Number(state.jarSize)/1000} kg`],['Remaining honey',`${esc(state.bottleRemaining)} kg`],['Recorded loss',`${esc(state.bottleLoss)} kg`],['Bottled on',esc(state.bottleDate||'2026-10-27')]])}${callout('One code for this batch','The jars in this batch share a batch code. Each jar is not individually numbered.','info')}`,'bottling-saved','Confirm bottling',{role:'production',back:'bottling-details',step:[3,3,'Bottle honey']})
```
