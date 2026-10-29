# Screen reference: wax-inputs

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('wax-inputs', …).

```javascript
screen('wax-inputs','production','Wax · choose inputs','Choose raw wax buckets','Use released quantities; unused residue stays in stock.',()=>`${allocations(raw.filter(l=>l.status==='Released for wax processing'))}${callout('Held buckets are unavailable','New extraction buckets need their own quality release.','info')}`,'wax-process','Continue',{...production,back:'wax-stock',step:[1,3,'Process wax']})
```
