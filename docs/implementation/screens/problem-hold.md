# Screen reference: problem-hold

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('problem-hold', …).

```javascript
screen('problem-hold','quality','Problem · confirm hold','Keep the affected honey held','Confirm the scope and next review.',()=>`${summary([['Affected lot','H-108'],['Affected batch','HB-261027-A'],['Public page','No automatic withdrawal from this hold']])}${field('holdReason','Reason','Seal issue under investigation',{area:true,required:true})}${field('holdOwner','Owner','Quality manager',{required:true})}${field('holdReview','Next review','2026-10-29',{type:'date',required:true})}`,'problem-follow-up','Confirm hold',{role:'quality',back:'problem-evidence',note:'Apply the recorded scope atomically. Material restrictions and public withdrawal are separate decisions.'})
```
