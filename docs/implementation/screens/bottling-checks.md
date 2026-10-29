# Screen reference: bottling-checks

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('bottling-checks', …).

```javascript
screen('bottling-checks','production','Checks before bottling','Check lot H-108','Record the checks required before bottling.',()=>`${badge('Awaiting quality review','warning')}${field('bottlingSample','Sample reference','S-108',{required:true})}${field('bottlingMoisture','Moisture reading','18.2',{inputmode:'decimal',unit:'%',required:true})}${field('bottlingEvidence','Report or evidence reference','LAB-108',{required:true})}${field('bottlingCheckNotes','Observations','See the attached quality report.',{area:true})}${callout('A reading is not a release','The quality manager reviews all applicable checks and evidence.','info')}`,'checks-submitted','Send checks for review',{role:'production',back:'processing-saved',note:'Example measurement only; do not encode regulatory limits from this mockup. Quality owner supplies the controlled test checklist.'})
```
