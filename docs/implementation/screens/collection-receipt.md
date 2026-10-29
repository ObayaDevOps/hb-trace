# Screen reference: collection-receipt

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('collection-receipt', …).

```javascript
screen('collection-receipt','collect','Collection receipt','The farmer’s receipt','Read this together before you finish.',()=>`${badge('COL-1042','neutral')}${source()}${dates()}${summary([['Farmer reference','F-1042'],['Material',esc(state.material)],['Honey',`${net()} kg`],['Grade',esc(state.grade||'Grade A · example')],['Price per kg',`UGX ${money(state.price)}`],['Total agreed',`UGX ${total()}`],['Payment',state.payment==='paid'?'Paid · reference recorded':'Not paid yet'],['Bucket codes','HB-7K2M<br>HB-7K2N']])}${callout('Saved on this phone','Not yet confirmed by the server.','warning')}${button('Print or copy to paper','!print','secondary','print')}`,'receipt-confirm','Record farmer confirmation',{back:'bucket-labels'})
```
