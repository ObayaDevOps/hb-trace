# Screen reference: source-review

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('source-review', …).

```javascript
screen('source-review','receive','Supervisor · source conflict','Review the source','Confirm the evidence before linking this arrival.',()=>`${card('<h3>Bucket HB-7K2M</h3><p class="small">Arrival ARR-2081 · Collection COL-1042</p>')}${summary([['Field record','Grace A. · Shea Grove'],['Collected weight','15 kg'],['Received weight','14.8 kg'],['Difference','0.2 kg']])}${field('sourceEvidence','Evidence and reason','Verified the receipt and bucket label with the field officer. Spillage was recorded at receiving.',{area:true,required:true})}${check('confirmSource','I verified this source against the evidence')}${callout('Keep both measurements','Record an approved adjustment; do not overwrite the collection weight.','warning')}`,'source-resolution-review','Review resolution',{role:'supervisor',back:'supervisor-home',note:'Supervisor-only source resolution. It must not clear any independent quality hold.'})
```
