# Screen reference: wax-review

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('wax-review', …).

```javascript
screen('wax-review','production','Wax · balance & label','Review the wax run','Confirm all inputs, outputs and storage.',()=>`${inputSummary(picks(raw))}${summary([['Total taken',kg(pickedWeight(raw))],['Finished wax FW-301',kg(num('waxRecovered'))],['Retained WR-301',kg(num('waxRetained'))],['Waste',kg(num('waxWaste'))],['Loss',kg(num('waxLoss'))],['Storage',esc(s.waxLocation)],['Quality','Awaiting quality review']])}${callout('Every output retains every input source','Label FW-301 and any retained WR-301 material before storing.')}`,'!wax-save','Create finished-wax stock',{...production,back:'wax-process',step:[3,3,'Process wax']})
```
