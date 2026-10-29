# Screen reference: infused-bottling-review

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('infused-bottling-review', …).

```javascript
screen('infused-bottling-review','production','Infused honey · bottling review','Review the infused batch','All jars share HB-261028-I.',()=>`${summary([['Input IH-201',kg(num('infusedBottleInput'))],['Jars',`${s.infusedJars} × ${s.infusedSize} g`],['Bottled product',kg(num('infusedJars')*num('infusedSize')/1000)],['Remaining',kg(num('infusedRemaining'))],['Loss',kg(num('infusedBottleLoss'))]])}${callout('Preserve both kinds of input','Every jar’s batch traces back to the honey sources and all added ingredient lots.')}`,'!infused-bottle','Confirm bottled batch',{...production,back:'infused-bottling'})
```
