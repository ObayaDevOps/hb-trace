# Screen reference: fix-details

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('fix-details', …).

```javascript
screen('fix-details','work','Correct a field error','One detail to fix','Grace’s phone number could not be accepted.',()=>`${callout('Your honey records are safe','1 apiary and collection COL-1042 are waiting for this correction.','warning')}${field('correctedPhone','Correct phone number','',{type:'tel',inputmode:'tel',hint:'Check the number with the farmer.'})}${check('correctedNoPhone','The farmer has no phone','',true)}${card('<h3>Bucket codes stay the same</h3><p class="small">HB-7K2M · HB-7K2N<br>No need to relabel the honey.</p>')}`,'correction-sent','Save correction',{back:'my-work',secondary:['Ask a supervisor','supervisor-pending'],note:'Officer corrections apply only to their own simple uncommitted errors. Preserve originals and reconnect dependent drafts; do not mutate sent commands.'})
```
