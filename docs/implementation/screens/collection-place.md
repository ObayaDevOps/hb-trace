# Screen reference: collection-place

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('collection-place', …).

```javascript
screen('collection-place','collect','Collection · source & place','Where are you collecting?','The source apiary stays the same wherever you meet.',()=>`${source()}${choice('receivingPlace','apiary','At the apiary','Visiting the farmer’s hives.')}${choice('receivingPlace','centre','At a collection centre','The farmer brought the honey to us.')}${state.receivingPlace==='centre'?field('centre','Collection centre','Gulu collection centre',{choices:['Gulu collection centre','Northern collection centre'],required:true}):''}${button('Change farmer or apiary','find-farmer','text-action')}`,'collection-dates','Continue',{...stepExtra(1,6,'Honey collection'),back:'choose-apiary'})
```
