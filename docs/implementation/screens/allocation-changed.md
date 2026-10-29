# Screen reference: allocation-changed

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('allocation-changed', …).

```javascript
screen('allocation-changed','production','Available quantity changed','The available amount changed','Another staff member has used some of this stock.',()=>`${callout('Your processing has not been recorded','Review the latest available weight before trying again.','warning')}${summary([['HB-7K2M · requested','15 kg'],['Available now','10 kg']])}${card('<h3>Your entries are retained</h3><p class="small">Change the amount or choose another released lot.</p>')}`,'processing-inputs','Review available stock',{role:'production',note:'Stale allocation is rejected without partial success. Reload authoritative balances and retain the entered draft.'})
```
