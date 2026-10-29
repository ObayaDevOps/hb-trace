# Screen reference: wax-release

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('wax-release', …).

```javascript
screen('wax-release','quality','Quality · raw-wax release','Review raw wax buckets','Review the required checks before processing retained residue.',()=>`${raw.filter(l=>l.status==='Awaiting quality release').map(l=>card(`<h3>${l.id}</h3><p>${kg(l.available)} · ${esc(l.source)}</p>`)).join('')||callout('No raw wax awaiting release','Starting sample buckets are already released.','info')}${field('waxReleaseEvidence','Applicable requirements and evidence','',{required:true})}${check('waxReleaseChecked','I reviewed all listed buckets and resolved every restriction')}`,'!wax-release','Release listed raw wax',{...quality,back:'wax-stock',note:'Server-authorized quality decision, separate from source resolution and quantity creation. Validate every listed bucket, restriction and evidence before release.'})
```
