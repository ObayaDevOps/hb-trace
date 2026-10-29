# Screen reference: infused-bottling

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('infused-bottling', …).

```javascript
screen('infused-bottling','production','Infused honey · bottling','Bottle infused honey','IH-201 · completion and quality release required',()=>`${summary([['Status',s.infusion?.released?'Released for bottling':'Blocked until completed and released'],['Available',kg(s.infusion?.available||0)]])}${weight('infusedBottleInput','Product taken',15)}${field('infusedSize','Grams per jar','500',{choices:['250','500','1000']})}${field('infusedJars','Number of jars','28',{type:'number',required:true})}${weight('infusedRemaining','Product remaining after filling',0.9)}${weight('infusedBottleLoss','Filling loss',0.1)}${field('infusedBottleDate','Bottled on','',{type:'date',required:true})}${field('infusedBottleEvidence','Filling record and loss explanation','FILL-INF-201 · filling equipment residue',{required:true})}`,'infused-bottling-review','Review bottling',{...production,back:'infusion-completed'})
```
