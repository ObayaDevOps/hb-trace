# Screen reference: wax-history

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('wax-history', …).

```javascript
screen('wax-history','receive','Wax · source history','Wax source history','Raw residue, transformations and finished stock stay linked.',()=>`${timeline(raw.map(l=>[l.id,`${l.source} · ${kg(l.available)} remaining · ${l.location}`,'bucket']))}${s.waxRun?timeline([['WX-301 · melting and filtering',`${s.waxRun.inputs.map(l=>`${l.id}: ${kg(l.used)}`).join(' + ')} · ${s.waxRun.operator} · ${s.waxRun.time}`,'scale'],['FW-301 · finished wax',`${kg(s.waxRun.recovered)} · ${s.waxRun.location} · awaiting quality review`,'bucket'],['WR-301 · retained material',`${kg(s.waxRun.retained)} · ${s.waxRun.retainedLocation}`,'bucket']]):''}${row('Trace a quality problem','Inspect raw buckets and all downstream outputs','wax-problem','alert')}`,'wax-stock','Back to stock',{...production,back:'wax-stock'})
```
