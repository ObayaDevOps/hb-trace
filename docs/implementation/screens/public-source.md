# Screen reference: public-source

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('public-source', …).

```javascript
screen('public-source','public','Customer · apiary & forage','Shea Grove apiary','Gulu area, northern Uganda',()=>`${map(true)}<p class="small">The map shows the general source area. The apiary’s exact position is private.</p><h2>Around the hives</h2><div class="forage-chips"><span>Shea trees</span><span>Seasonal wild flowers</span></div><p>The bees forage among shea trees and seasonal flowers around the apiary.</p>${summary([['Farmer','Grace'],['Collected on','27 Oct 2026'],['Harvested between','20–25 Oct 2026<br><span class="small">Approximate</span>']])}`,'public-batch','Back to the batch story',{role:'public',noNav:true,header:'brand',back:'public-batch',note:'This illustrative map encodes no private GPS. Production should request only approved coarse areas and provide the same text if the map cannot load.'})
```
