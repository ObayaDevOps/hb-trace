# Screen reference: damaged-label

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('damaged-label', …).

```javascript
screen('damaged-label','receive','Damaged or ambiguous label','Keep this bucket separate','Do not guess the source or create a new bucket label.',()=>`${field('visibleCode','What can you read?','HB-7…',{required:true})}${field('receiptReference','Collection receipt reference','',{optional:true})}${field('labelNotes','What happened to the label?','The final characters are unreadable.',{area:true,required:true})}${callout('A supervisor will resolve the source','Record the physical arrival with its own arrival reference.','warning')}`,'receive-arrival','Continue to arrival details',{role:'receiving',back:'receive-code',note:'Preserve the supplied partial code, evidence and arrival ID. The product must distinguish unresolved arrival reference from a registered bucket code.'})
```
