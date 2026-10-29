# Screen reference: bottling-saved

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('bottling-saved', …).

```javascript
screen('bottling-saved','production','Bottling complete','The batch is recorded','Next, add the batch code to the jars.',()=>`${success()}${amount('Finished batch','HB-261027-A',`${state.jars} jars · ${state.jarSize} g each`)}<div class="badges">${badge('Packaging review needed','warning')}${badge('Public page not published','neutral')}</div>${callout('Keep these jars separate','Label printing does not release this batch for distribution.','warning')}`,'jar-label','Show jar label',{role:'production',secondary:['Back to production','production-home']})
```
