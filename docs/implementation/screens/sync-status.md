# Screen reference: sync-status

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('sync-status', …).

```javascript
screen('sync-status','work','Sync status','Keep your work safe','Connect to back up work saved on this phone.',()=>`${state.syncStatus==='synced'?callout('Your details are synced','The optional photo is still waiting to upload.'):callout('Waiting for a connection','2 collections are on this phone only.','warning')}${summary([['Farmer details',badge(state.syncStatus==='synced'?'Synced':'Waiting to send',state.syncStatus==='synced'?'':'warning')],['Apiary details',badge(state.syncStatus==='synced'?'Synced':'Waiting to send',state.syncStatus==='synced'?'':'warning')],['Collections',badge(state.syncStatus==='synced'?'Synced':'Waiting to send',state.syncStatus==='synced'?'':'warning')],['Farmer photo',badge('Waiting to upload','warning')]])}${row('Something needs correcting','Grace’s details','fix-details','edit')}`,'!sync','Sync now',{back:'my-work',secondary:['Continue working','field-home'],note:'The example button simulates a successful record sync. In the product, retry temporary failures with the same immutable operation; track photos separately.'})
```
