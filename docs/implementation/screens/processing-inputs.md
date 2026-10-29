# Screen reference: processing-inputs

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('processing-inputs', …).

```javascript
screen('processing-inputs','production','Processing · choose inputs','Which honey will you use?','Choose released stock and enter how much to take.',()=>`${card(`<div class="card-title"><strong>HB-7K2M</strong>${badge('Released')}</div><p class="small">Grace A. · Shea Grove · 15 kg available</p>${field('processInputOne','Amount to use','15',{type:'number',inputmode:'decimal',unit:'kg',required:true})}`)}${card(`<div class="card-title"><strong>HB-7K2N</strong>${badge('Released')}</div><p class="small">Grace A. · Shea Grove · 15 kg available</p>${field('processInputTwo','Amount to use','15',{type:'number',inputmode:'decimal',unit:'kg',required:true})}`)}${callout('Partial use is allowed','Unused honey stays with its original source.')}`,'processing-details','Continue',{role:'production',back:'production-home',step:[1,3,'Process honey'],note:'Eligibility and available quantity are checked again on server commit. Support arbitrary inputs and preserve exact source allocations.'})
```
