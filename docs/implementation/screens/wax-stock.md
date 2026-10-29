# Screen reference: wax-stock

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('wax-stock', …).

```javascript
screen('wax-stock','receive','Wax · stock','Raw and finished wax','Weights, locations and quality stay visible.',()=>`${raw.map(l=>row(l.id,`${kg(l.available)} · ${l.location} · ${l.status}`,'wax-history','bucket')).join('')}${s.waxRun?row('FW-301',`${kg(s.waxRun.recovered)} · ${s.waxRun.location} · Awaiting quality review`,'finished-wax','bucket'):''}${s.waxRun?.retained?card(`<h3>WR-301 · retained material</h3><p>${kg(s.waxRun.retained)} · ${esc(s.waxRun.retainedLocation)} · Held for review</p>`):''}${row('Process eligible raw wax','Choose partial quantities from one or more buckets','wax-inputs','scale')}${row('New honeycomb extraction','Weigh and label raw wax outputs','processing-honeycomb','bucket')}`,null,null,{...production,back:'stock-list'})
```

## Later overrides for this screen

These changes apply after the base definition and take precedence for the properties they replace.
Source: public/design/mobile-ui/workflows.js.

```javascript
append('wax-stock',()=>row('Review retained raw wax','Required quality decision before processing','wax-release','shield'))
```
