# Screen reference: receive-arrival

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('receive-arrival', …).

```javascript
screen('receive-arrival','receive','Receive · arrival details','Record the arrival','Record what actually arrived at HQ.',()=>`${badge(esc(state.arrivalCode),'neutral')}${callout('Source details have not arrived yet','You can still record the bucket into stock. Keep it separate.','warning')}${field('receivedWeight','Received net weight',state.receivedWeight,{type:'number',inputmode:'decimal',unit:'kg',required:true})}${field('storage','Storage location',state.storage,{choices:['Receiving bay · Shelf A','Receiving bay · Shelf B','Held stock · Shelf H'],required:true})}${field('condition','Bucket condition',state.condition,{choices:['Sealed, no visible damage','Seal damaged','Leak or visible damage'],required:true})}${field('arrivalTime','Arrival time','2026-10-27T11:20',{type:'datetime-local',required:true})}`,'receive-review','Review arrival',{role:'receiving',back:'receive-code',step:[2,3,'Receive honey']})
```
