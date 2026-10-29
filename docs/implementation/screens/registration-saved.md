# Screen reference: registration-saved

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('registration-saved', …).

```javascript
screen('registration-saved','register','Registration saved','You’re ready to collect',()=>`${state.farmerName} and ${state.apiaryName} are saved on this phone.`,()=>`${success()}${source()}${callout('Waiting to sync','Keep this phone safe. These details are not backed up yet.','warning')}${row('Add more details later','Photo, story, hives and more','profile-sections','user')}`,'collection-place','Record honey collection',{secondary:['Finish for now','field-home'],note:'Only show a local save after durable storage succeeds. This design example simulates that state.'})
```
