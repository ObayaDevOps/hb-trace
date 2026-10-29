# Screen reference: bottling-release

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('bottling-release', …).

```javascript
screen('bottling-release','quality','Quality · bottling release','Release H-108 for bottling?','Review the lot, evidence and any restrictions.',()=>`${summary([['Honey lot','H-108 · 29.5 kg'],['Sources','2 buckets · reconciled'],['Quality evidence','LAB-108 · linked'],['Outstanding restrictions','None in this example']])}${check('bottlingReleaseChecks','I have reviewed all required checks and evidence')}${field('bottlingReleaseReason','Decision note','Evidence reviewed against the current bottling requirements.',{area:true,required:true})}${button('A problem needs review','problem-open','text-action')}`,'bottling-released','Release for bottling',{role:'quality',back:'quality-home'})
```
