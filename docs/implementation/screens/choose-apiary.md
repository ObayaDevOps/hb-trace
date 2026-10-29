# Screen reference: choose-apiary

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('choose-apiary', …).

```javascript
screen('choose-apiary','start','Choose an apiary','Which apiary?','Choose where this honey came from.',()=>`${profile()}${task(esc(state.apiaryName),esc(state.location),'collection-place','leaf',true)}${button('Add another apiary','add-apiary','secondary','plus')}${callout('Collecting at a centre?','Still choose the apiary the honey came from.','info')}`,null,null,{back:'find-farmer',note:'One farmer can have several apiaries. Collection centre and source apiary are separate facts.'})
```
