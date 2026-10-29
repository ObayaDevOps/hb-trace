# Screen reference: hq-offline

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('hq-offline', …).

```javascript
screen('hq-offline','receive','HQ connection lost','Reconnect to save this arrival','Your form is still open. This arrival is not yet in confirmed stock.',()=>`${callout('HQ actions need internet','Keep the bucket separate and try again when connected.','warning')}${summary([['Bucket',esc(state.arrivalCode)],['Net weight',`${esc(state.receivedWeight)} kg`],['Storage',esc(state.storage)]])}${button('Review entered details','receive-arrival','text-action')}`,'receive-review','Try again',{role:'receiving',noNav:true,note:'HQ receiving, stock, reconciliation and privileged actions cannot commit offline. A retained form is not an accepted stock movement.'})
```
