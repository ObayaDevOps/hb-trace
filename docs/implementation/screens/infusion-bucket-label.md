# Screen reference: infusion-bucket-label

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('infusion-bucket-label', …).

```javascript
screen('infusion-bucket-label','production','Infusion · write bucket label','Write this on the bucket','Copy the details clearly, then store the labelled bucket.',()=>s.infusion?`<div class="label-card"><p>BULK INFUSION</p><h2 class="bucket-description">${esc(s.infusion.bucketLabel)}</h2><div class="code">INF-201</div><p>Container ${esc(s.infusion.container)}</p></div>${summary([['Contains',kg(s.infusion.total)],['Storage',esc(s.infusion.location)],['First check',`Day 7 · ${dayAfter(s.infusion.start,7)}`]])}${callout('Keep the batch reference','The description helps identify the contents. INF-201 distinguishes this batch from another made with the same ingredients.','info')}${button('Print this bucket label','!print','secondary','print')}`:callout('Confirm the infusion first','The label is generated from its saved inputs.','info'),'!infusion-label-confirm','I’ve labelled the bucket',{...production,back:'infusion-review',note:'Generate the suggested label after confirmation from committed honey labels, ingredient names and start date, with the date last. Preserve the stable batch/container ID and reprint the same label. Suggested text is an operational bucket label, not a retail safety or certification claim.'})
```
