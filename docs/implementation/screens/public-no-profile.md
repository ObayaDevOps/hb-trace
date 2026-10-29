# Screen reference: public-no-profile

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('public-no-profile', …).

```javascript
screen('public-no-profile','public','Customer · source summary','Honey from northern Uganda','Batch HB-261027-C',()=>`<div class="welcome-art">${landscape()}</div><h2>About this batch</h2><p>Honey collected from one apiary in the Gulu area.</p>${summary([['Collected on','27 Oct 2026'],['Harvest date','Not recorded'],['Bottled on','27 Oct 2026'],['Forage','Shea trees']])}${map(true)}<p class="small">This page shares the approved source information for your batch.</p>`,'public-lookup','Look up another batch',{role:'public',noNav:true,header:'brand',back:'public-lookup',note:'Valid page without a farmer photo or story. Approximate area is separately approved; omit it too if sharing is declined. Do not expose internal consent states.'})
```
