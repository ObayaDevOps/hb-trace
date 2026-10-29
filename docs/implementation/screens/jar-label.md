# Screen reference: jar-label

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('jar-label', …).

```javascript
screen('jar-label','production','Jar batch label','Label this batch','Use the same batch code on every jar in this run.',()=>`<div class="label-card"><div class="label-mark">${icon('jar')}</div><p>HUMBLE BEEING · HONEY</p><div class="code" style="font-size:24px">HB-261027-A</div><p>Find this batch’s story on our website</p><p>Batch code · ${state.jarSize} g</p></div>${callout('Traceability label example','Complete product labelling follows the approved packaging specification.','info')}${summary([['Jars',String(state.jars)],['Packaging release','Pending'],['Customer page','Not published']])}${button('Print batch labels','!print','secondary','print')}`,'packaging-submit','Labels added · continue',{role:'production',back:'bottling-saved',note:'This is the traceability code portion, not a complete compliant retail label. No invented domain or certification mark.'})
```
