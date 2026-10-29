# Screen reference: ingredient-release

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('ingredient-release', …).

```javascript
screen('ingredient-release','quality','Quality · ingredient release','Review purchased ingredients','Only a quality owner can authorize use.',()=>`${ingredients.filter(l=>!l.eligible).map(l=>card(`<h3>${esc(l.id)} · ${esc(l.name)}</h3><p>${kg(l.available)} · ${esc(l.supplier)}</p>`)).join('')||callout('No lots awaiting review','The sample starting lots are already released.','info')}${field('ingredientEvidence','Applicable checks and evidence reference','',{required:true})}${check('ingredientReleaseChecked','I reviewed all listed lots and their applicable requirements')}`,'!ingredient-release','Release listed lots for infusion',{...quality,back:'ingredient-stock'})
```
