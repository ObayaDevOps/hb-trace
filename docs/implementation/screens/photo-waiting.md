# Screen reference: photo-waiting

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('photo-waiting', …).

```javascript
screen('photo-waiting','profile','Photo waiting to upload','Photo saved on this phone','You can continue working while it waits to upload.',()=>`${success()}${summary([['Farmer details',badge('Synced')],['Photo',badge('Waiting to upload','warning')]])}${callout('Keep this phone safe','The photo is not backed up yet.','warning')}`,'profile-sections','Continue with details',{back:'profile-photo'})
```
