# Screen reference: profile-photo

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('profile-photo', …).

```javascript
screen('profile-photo','profile','Farmer photo','Add a farmer photo','Ask before taking a photo.',()=>`<div class="photo-preview">${state.photoPreview?`<img src="${esc(state.photoPreview)}" alt="Selected photo preview">`:portrait()}</div><p class="small">Illustrated example. Choose a photo to try the preview.</p><label for="photo-file" class="field-label">Take or choose a photo</label><input id="photo-file" class="file-input" type="file" accept="image/*" data-photo>${callout('Private until approved','Sharing permission and publication approval are separate steps.','info')}`,'photo-waiting','Save photo',{...optional,next:'photo-waiting',label:'Save photo'})
```
