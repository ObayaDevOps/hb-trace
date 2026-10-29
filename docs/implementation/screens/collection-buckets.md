# Screen reference: collection-buckets

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('collection-buckets', …).

```javascript
screen('collection-buckets','collect','Collection · buckets','How is it packed?','Give each bucket its own weight and label.',()=>`${card(`<div class="card-title"><strong>Bucket 1</strong>${badge('HB-7K2M','neutral')}</div>${field('bucketOne','Honey in this bucket',state.bucketOne,{type:'number',inputmode:'decimal',unit:'kg',required:true})}`)}${card(`<div class="card-title"><strong>Bucket 2</strong>${badge('HB-7K2N','neutral')}</div>${field('bucketTwo','Honey in this bucket',state.bucketTwo,{type:'number',inputmode:'decimal',unit:'kg',required:true})}`)}${callout('Match the collection weight',`Together, the buckets must contain ${net()} kg.`)}`,'collection-review','Review collection',{...stepExtra(5,6,'Honey collection'),back:'collection-payment',note:'Two buckets demonstrate per-container allocation. The product must support adding/removing arbitrary buckets and allocate collision-safe codes offline.'})
```
