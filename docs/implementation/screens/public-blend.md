# Screen reference: public-blend

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('public-blend', …).

```javascript
screen('public-blend','public','Customer · multiple sources','',null,()=>`${publicStory(true)}<h2>Two places, one batch</h2><p>This batch combines honey from two apiaries. Each source keeps its own collection and harvest dates.</p>${card('<h3>Shea Grove · Gulu area</h3>'+summary([['Collected on','27 Oct 2026'],['Harvested between','20–25 Oct 2026<br>Approximate'],['Forage','Shea trees']]))}${card('<h3>River apiary · northern Uganda</h3>'+summary([['Collected on','26 Oct 2026'],['Harvest timing','Harvest date not recorded'],['Forage','Coffee and wild flowers']]))}<p class="small">Bottled on 27 Oct 2026. Farmer profiles are shown only when approved.</p>`,'public-lookup','Look up another batch',{role:'public',noNav:true,header:'brand',back:'public-lookup',note:'Do not attribute a blend to one farmer or fabricate a single harvest date. This separate sample batch preserves both contributors.'})
```
