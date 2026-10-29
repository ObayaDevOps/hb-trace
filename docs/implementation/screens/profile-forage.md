# Screen reference: profile-forage

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('profile-forage', …).

```javascript
screen('profile-forage','profile','Forage','What grows nearby?','Choose everything that grows around the hives.',()=>`${check('forageShea','Shea trees','',true)}${check('forageCoffee','Coffee plantation')}${check('forageWild','Wild flowers')}${check('forageOther','Other')}${check('forageUnknown','Not known yet')}${field('forageNotes','Other forage or notes','',{optional:true})}`,optional.next,optional.label,optional)
```
