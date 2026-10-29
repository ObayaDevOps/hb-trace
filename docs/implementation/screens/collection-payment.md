# Screen reference: collection-payment

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('collection-payment', …).

```javascript
screen('collection-payment','collect','Collection · price & payment','Agree the price','Read the total back to the farmer.',()=>`${field('price','Price for each kg',state.price,{type:'number',inputmode:'decimal',unit:'UGX',required:true})}${amount('Total agreed',`UGX <span data-calc="total">${total()}</span>`,`${net()} kg × UGX ${money(state.price)} per kg`)}<h2>Has the farmer been paid?</h2>${choice('payment','unpaid','Not paid yet','Record the amount owed.')}${choice('payment','paid','Paid now','Add the actual payment details.')}${state.payment==='paid'?`${field('paidAmount','Amount paid',String(net()*Number(state.price)),{type:'number',inputmode:'decimal',unit:'UGX',required:true})}${field('paymentMethod','Payment method','Mobile money',{choices:['Mobile money','Cash'],required:true})}${field('paymentRef','Payment or receipt reference','',{required:true,placeholder:'Enter the transaction reference'})}`:''}`,'collection-buckets','Continue',{...stepExtra(4,6,'Honey collection'),back:'collection-weight',note:'An agreed price is not a payment. Actual amount, method and reference are needed when recording payment.'})
```
