# Screen reference: infusion-history

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('infusion-history', …).

```javascript
screen('infusion-history','receive','Infusion · container & source history','Trace infusion INF-201','Honey ancestry and ingredient lots remain connected.',()=>`${infusionContents()}${s.infusion?timeline([['Honey sources',s.infusion.honey.map(l=>esc(l.source)).join('<br>'),'leaf'],['Ingredient purchases',s.infusion.ingredients.map(l=>`${esc(l.id)} · ${esc(l.name)} · ${kg(l.used)}`).join('<br>'),'list'],['Start',`${esc(s.infusion.start)} · ${esc(s.infusion.operator)} · ${esc(s.infusion.facility)} · ${esc(s.infusion.container)} at ${esc(s.infusion.location)}`,'clock'],...(s.infusion.finished?[['Completion',`${esc(s.infusion.finished)} → IH-201 + IR-201 · ${esc(s.infusion.finishEvidence)}`,'check']]:[]),...(s.infusion.bottled?[['Bottled batch',`HB-261028-I · ${s.infusion.bottled.jars} jars · ${esc(s.infusion.bottled.date)}`,'jar']]:[])]):''}`,'infusing-stock','Back to stock',{...production,back:'infusion-completed'})
```

## Later overrides for this screen

These changes apply after the base definition and take precedence for the properties they replace.
Source: public/design/mobile-ui/workflows.js.

```javascript
append('infusion-history',checkHistory)
```
