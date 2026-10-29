# Screen reference: collection-review

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('collection-review', …).

```javascript
screen('collection-review','collect','Collection · review','Check before saving','Confirm the source, weight and price with the farmer.',()=>`${source()}${dates()}${summary([['Receiving place',state.receivingPlace==='centre'?'Gulu collection centre':'At the apiary'],['Material',esc(state.material)],['Net weight',`${net()} kg`],['Grade',esc(state.grade||'Grade A · example')],['Price per kg',`UGX ${money(state.price)}`],['Buckets',`2 · ${esc(state.bucketOne)} kg + ${esc(state.bucketTwo)} kg`],['Payment',state.payment==='paid'?`Paid · UGX ${money(state.paidAmount||net()*state.price)}`:'Not paid yet']])}${amount('Total agreed',`UGX ${total()}`)}${button('Change weight or price','collection-weight','text-action','edit')}`,'collection-saved','Save collection',{...stepExtra(6,6,'Honey collection'),back:'collection-buckets',note:'A review is not a save. Only show success after a durable local write or a confirmed server commit. Repeated taps must retain the same transaction.'})
```
