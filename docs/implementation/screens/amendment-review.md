# Screen reference: amendment-review

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('amendment-review', …).

```javascript
screen('amendment-review','work','Saved change · review','Review the saved-record change','Explain what changed and why before saving.',()=>`${pending?pending.changes.map(([k,before,after])=>card(`<h3>${esc(pending.labels[k]||k)}</h3>${summary([['Previous',esc(showValue(before))],['Proposed',esc(showValue(after))]])}`)).join(''):callout('No change selected','Open a saved profile section to propose a change.','info')}${field('amendmentReason','What changed and why?','',{area:true,required:true})}${callout('Existing permissions still apply','Committed quantities, payments, sources and quality decisions require their authorized amendment or decision workflow. A reason does not permit rewriting them.','warning')}`,'!amend-save','Save explained change',{back:'!unused',secondary:['Cancel change','!amend-cancel'],note:'Capture previous and proposed values, reason, actor, occurrence time, server commit time and record revision. Server checks authorization and conflicts. Never overwrite committed financial/material events.'})
```
