# Screen reference: apiary-profile

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('apiary-profile', …).

```javascript
screen('apiary-profile','profile','Apiary profile',()=>state.apiaryName,'Apiary belonging to Grace A.',()=>`${map()}${summary([['Location',esc(state.location)],['Forage','Shea trees'],['Hives','12 Kenyan top-bar · 8 local'],['Expected harvest','80 kg · Oct–Nov estimate']])}${callout('An estimate, not stock','Available honey is recorded when a collection happens.','info')}${row('Add or update apiary details','Position, forage, hives and equipment','profile-sections','edit')}`,'collection-place','Record collection',{back:'farmer-profile'})
```
