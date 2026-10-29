# Screen reference: bottling-details

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('bottling-details', …).

```javascript
screen('bottling-details','production','Bottling · jars & balance','How much did you bottle?','Record actual jars, then account for the remaining honey.',()=>`${field('jarSize','Honey in each jar','500',{choices:['250','500','1000'],hint:'Grams of honey in each jar.'})}${field('jars','Number of jars','48',{type:'number',inputmode:'numeric',required:true})}${amount('Honey bottled',`<span data-calc="bottled">${Number(state.jars)*Number(state.jarSize)/1000}</span> kg`,`${state.jars} jars × ${state.jarSize} g`)}<div class="field-grid">${field('bottleRemaining','Honey remaining','5',{type:'number',inputmode:'decimal',unit:'kg',required:true})}${field('bottleLoss','Loss','0.5',{type:'number',inputmode:'decimal',unit:'kg',required:true})}</div>${field('bottleDate','Bottling date','2026-10-27',{type:'date',required:true})}${field('bottleLossReason','Reason for loss','Filling equipment residue',{required:true})}`,'bottling-review','Review bottling',{role:'production',back:'bottling-inputs',step:[2,3,'Bottle honey']})
```
