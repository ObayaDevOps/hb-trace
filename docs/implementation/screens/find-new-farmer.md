# Screen reference: find-new-farmer

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('find-new-farmer', …).

```javascript
screen('find-new-farmer','start','Check for an existing farmer','Have we met before?','A quick search helps avoid registering the same farmer twice.',()=>`${field('newFarmerSearch','Farmer name or phone','Grace',{type:'search'})}${row('Grace A.','Shea Grove · Gulu area','possible-duplicate','user')}${callout('Not the same person?','You can register a new farmer below.','info')}`,'register-farmer','Add a new farmer',{back:'field-home',secondary:['Review possible match','possible-duplicate']})
```
