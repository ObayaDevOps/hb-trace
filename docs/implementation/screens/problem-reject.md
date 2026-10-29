# Screen reference: problem-reject

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('problem-reject', …).

```javascript
screen('problem-reject','quality','Problem · rejection','Record the disposition','Rejected material remains accounted for until a movement is recorded.',()=>`${field('rejectReason','Reason for rejection','',{area:true,required:true})}${field('rejectPlan','Required next action','Keep in held storage pending approved disposal.',{area:true,required:true})}${field('rejectOwner','Action owner','Quality manager',{required:true})}${callout('Do not remove stock by changing its status','Record a return, discard or other permitted movement when it actually happens.','warning')}`,'problem-follow-up','Confirm rejection',{role:'quality',back:'problem-decision'})
```
