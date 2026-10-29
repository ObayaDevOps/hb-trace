# Screen reference: problem-retest

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('problem-retest', …).

```javascript
screen('problem-retest','quality','Problem · arrange retest','Arrange a retest','The affected honey stays held while you investigate.',()=>`${field('retestOwner','Person responsible','Quality team',{required:true})}${field('retestDate','Review again on','2026-10-29',{type:'date',required:true})}${field('retestRequest','What must be checked?','Inspect the seals and test the retained samples using the approved procedure.',{area:true,required:true})}${callout('Keep the original results','The retest will be added as new evidence.','info')}`,'problem-follow-up','Save retest request',{role:'quality',back:'problem-decision'})
```
