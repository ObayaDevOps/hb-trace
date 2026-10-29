# Screen reference: extraction-review

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('extraction-review', …).

```javascript
screen('extraction-review','production','Extraction · balance review','Review extraction and storage','30 kg input must be accounted for.',()=>`${summary([['Honey',kg(num('combHoney'))],['Raw wax retained',kg(num('combRaw'))],['Waste',kg(num('combWaste'))],['Loss',kg(num('combLoss'))],['RW-204A',`${kg(num('rawOne'))} · ${esc(s.rawLocationOne)}`],['RW-204B',`${kg(num('rawTwo'))} · ${esc(s.rawLocationTwo)}`]])}${callout('Source preserved','EX-204 → C-204 → Shea Grove. Raw wax awaits quality release.')}`,'!extract-save','Confirm extraction',{...production,back:'raw-wax-storage'})
```
