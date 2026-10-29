# Screen reference: receive-review

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('receive-review', …).

```javascript
screen('receive-review','receive','Receive · review','Check this arrival','This bucket will be stored while source details catch up.',()=>`${summary([['Bucket code',esc(state.arrivalCode)],['Net weight',`${esc(state.receivedWeight)} kg`],['Location',esc(state.storage)],['Condition',esc(state.condition)],['Source','Awaiting source details'],['Quality','Awaiting checks']])}${callout('Processing stays blocked','Source reconciliation and required quality release must both be complete.','warning')}${button('Check the code again','receive-code','text-action')}`,'arrival-saved','Save arrival',{role:'receiving',back:'receive-arrival',step:[3,3,'Receive honey'],note:'Online authorized commit. Count this physical arrival once; do not manufacture a farmer or a second purchase.'})
```
