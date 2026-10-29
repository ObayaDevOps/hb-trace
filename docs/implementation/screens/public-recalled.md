# Screen reference: public-recalled

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('public-recalled', …).

```javascript
screen('public-recalled','public','Customer · batch notice','Important batch notice','Batch HB-261027-A',()=>`${callout('Please do not use this honey','This batch is included in a recall.','error')}<p>Keep the jar and its batch label. Contact the company or the shop where you bought it for return instructions.</p>${summary([['Affected batch','HB-261027-A'],['Notice updated','28 Oct 2026']])}<details class="disclosure"><summary>Why am I seeing this notice?</summary><p>The approved response for this batch has changed. Follow the current instructions shown here.</p></details>`,'public-lookup','Check another batch',{role:'public',noNav:true,header:'brand',back:'public-lookup',note:'Example approved recall response only. Actual wording, contact channels and return procedure require the quality owner’s policy. Hide promotional story content while recalled.'})
```
