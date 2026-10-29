# Screen reference: amendment-history

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('amendment-history', …).

```javascript
screen('amendment-history','work','Saved change · history','Amendment history','Original values remain available.',()=>s.amendments.length?s.amendments.map(a=>card(`<h3>${esc(a.record)}</h3>${summary([['Author',esc(a.author)],['Time',esc(a.at)],['Reason',esc(a.reason)]])}${a.changes.map(([k,b,v])=>summary([[esc(a.labels[k]||k),`${esc(showValue(b))} → ${esc(showValue(v))}`]])).join('')}`)).join(''):callout('No saved changes in this session','Changes to a saved profile appear here with their original values.','info'),'profile-sections','Back to details',{back:'my-work'})
```
