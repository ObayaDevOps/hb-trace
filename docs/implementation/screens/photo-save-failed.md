# Screen reference: photo-save-failed

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('photo-save-failed', …).

```javascript
screen('photo-save-failed','work','Photo storage full','The photo has not been saved','The farmer details are safe. Keep the selected photo open while you get help.',()=>`${callout('Not enough room for this photo','Do not clear the app’s data. A photo is optional for collection.','error')}${row('Get help with storage','Protect unsynced work on this phone','contact-help','help')}${callout('You can continue without a photo','Add it later when the phone has enough space.','info')}`,'profile-photo','Return to photo',{secondary:['Continue without the photo','profile-sections'],note:'Separate photo failure from record persistence. Never claim the file is saved or backed up after quota failure.'})
```
