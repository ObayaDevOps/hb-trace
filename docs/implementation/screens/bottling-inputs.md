# Screen reference: bottling-inputs

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('bottling-inputs', …).

```javascript
screen('bottling-inputs','production','Bottling · choose lot','Choose honey to bottle','Only lots released for bottling are available.',()=>`${card(`<div class="card-title"><strong>Honey lot H-108</strong>${badge('Released')}</div><p class="small">Shea Grove · 29.5 kg available</p>${field('bottleInput','Amount taken for this run','29.5',{type:'number',inputmode:'decimal',unit:'kg',required:true})}`)}${callout('Sources stay connected','A blend will retain every contributing apiary.')}`,'bottling-details','Continue',{role:'production',back:'production-home',step:[1,3,'Bottle honey'],note:'This fixture is after the quality manager’s bottling release. Product selection supports multiple released lots and exact allocations.'})
```
