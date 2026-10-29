# Screen reference: finished-wax

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('finished-wax', …).

```javascript
screen('finished-wax','receive','Wax · finished stock','Finished wax FW-301','Wax run WX-301',()=>s.waxRun?`${amount('Finished wax',kg(s.waxRun.recovered),esc(s.waxRun.location))}${badge('Awaiting quality review','warning')}<div class="label-card"><p>FINISHED WAX</p><div class="code">FW-301</div><p>${kg(s.waxRun.recovered)} · WX-301</p></div>${inputSummary(s.waxRun.inputs)}${row('Source and container history','Raw buckets, extraction runs and sources','wax-history','work')}${row('Report a wax problem','Trace raw and finished stock','wax-problem','alert')}`:callout('No finished wax recorded','Complete the wax run first.','info'),'wax-stock','Back to wax stock',{...production,back:'wax-stock'})
```
