# Screen reference: infusion-finish-review

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('infusion-finish-review', …).

```javascript
screen('infusion-finish-review','production','Infusion · completion balance','Review the completion balance','INF-201 produces a distinct infused-honey lot IH-201.',()=>`${summary([['Inputs',kg(s.infusion?.total||0)],['Infused product IH-201',kg(num('infusionProduct'))],['Retained IR-201',kg(num('infusionRetained'))],['Waste',kg(num('infusionWaste'))],['Loss',kg(num('infusionLoss'))],['Completed',esc(s.infusionEnd)]])}${(s.infusion?.ingredients||[]).map(l=>summary([[esc(l.name),esc(s[`fate-${l.id}`]||'Removed after infusion')]])).join('')}${callout('Quality review follows completion','Bottling stays blocked until the applicable release is recorded.','warning')}`,'!infusion-finish','Confirm completion',{...production,back:'infusion-finish'})
```
