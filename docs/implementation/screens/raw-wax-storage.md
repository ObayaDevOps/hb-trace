# Screen reference: raw-wax-storage

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('raw-wax-storage', …).

```javascript
screen('raw-wax-storage','production','Raw wax · buckets & storage','Label the raw wax buckets','Extraction EX-204 · honeycomb C-204 · Shea Grove',()=>`${card(`<h3>RW-204A</h3>${weight('rawOne','Raw wax residue',2)}${field('rawLocationOne','Storage location','',{required:true})}`)}${card(`<h3>RW-204B</h3>${weight('rawTwo','Raw wax residue',3)}${field('rawLocationTwo','Storage location','',{required:true})}`)}${callout('Keep the source on each bucket',`Together these buckets must hold ${kg(num('combRaw'))}. They will await the required quality release.`)}`,'extraction-review','Review extraction',{...production,back:'processing-honeycomb'})
```
