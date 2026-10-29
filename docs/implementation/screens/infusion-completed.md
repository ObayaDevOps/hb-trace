# Screen reference: infusion-completed

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('infusion-completed', …).

```javascript
screen('infusion-completed','production','Infusion · completed stock','Infused honey IH-201','Distinct product · infusion INF-201',()=>`${badge(s.infusion?.released?'Released for bottling':'Awaiting quality review','warning')}${summary([['Available product',kg(s.infusion?.available||0)],['Completed',esc(s.infusion?.finished||'Not completed')],['Retained IR-201',kg(s.infusion?.retained||0)],['Retained storage',esc(s.infusion?.retainedLocation||'Not recorded')]])}${row('Quality review','Review process and all ingredient requirements','infusion-release','shield')}${row('Trace the inputs','Honey, ingredients and containers','infusion-history','search')}${row('Bottle released infused honey','Completion and release are both required','infused-bottling','jar')}`,null,null,{...production,back:'infusing-stock'})
```
