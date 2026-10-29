# Screen reference: public-not-found

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('public-not-found', …).

```javascript
screen('public-not-found','public','Customer · no public batch','We couldn’t find that batch','Check the code on your jar and try again.',()=>`<div class="empty-state"><div class="success-mark warning">${icon('search')}</div><p>Make sure every letter and number matches the label.</p></div>${field('publicCode','Batch code','HB-261027-A',{required:true})}`,'!lookup','Try this code',{role:'public',noNav:true,header:'brand',back:'public-lookup',note:'Use the same neutral result for unknown and unpublished batches. Never disclose unpublished operational details.'})
```
