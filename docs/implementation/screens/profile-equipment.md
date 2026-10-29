# Screen reference: profile-equipment

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('profile-equipment', …).

```javascript
screen('profile-equipment','profile','Available equipment','What equipment is available?','Record what the farmer already has.',()=>`${check('suits','Bee suits','',true)}${field('suitCount','Number of suits','2',{type:'number',inputmode:'numeric',optional:true})}${check('tools','Hive tools','',true)}${check('brush','Bee brush')}${check('smoker','Smoker','',true)}${field('equipmentNotes','Other equipment or quantities','1 hive tool; 1 smoker',{area:true,optional:true})}`,optional.next,optional.label,optional)
```
