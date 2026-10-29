# Screen reference: public-batch

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('public-batch', …).

```javascript
screen('public-batch','public','Customer · batch story','',null,()=>`${publicStory()}<h2>Meet Grace</h2><div class="photo-preview" style="height:200px">${portrait()}</div><p>Grace has kept bees for 20 years. Her hives sit among shea trees, where she tends them with knowledge passed through her family.</p>${row('Shea Grove apiary','Gulu area · northern Uganda','public-source','leaf')}<h2>From apiary to jar</h2>${timeline([['Harvested between 20–25 Oct 2026','Approximate dates reported at collection','leaf'],['Collected on 27 Oct 2026','Shea Grove apiary','bucket'],['Bottled on 27 Oct 2026','Batch HB-261027-A','jar']])}<p class="small">Farmer story and illustration shown as an example of approved public content.</p>`,'public-source','Explore the source',{role:'public',noNav:true,header:'brand',back:'public-lookup',note:'Photo placeholder is an original illustration, not a real farmer. In the product use only permissioned and approved assets. No private fields reach this page.'})
```
