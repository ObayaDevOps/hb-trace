# Screen reference: infusing-stock

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('infusing-stock', …).

```javascript
screen('infusing-stock','receive','Infusion · stock in progress','Bulk infusion INF-201','Contents, weekly checks and location stay visible.',()=>`${badge(s.infusion?.monitoringReviewRequired?'Quality review needed':s.infusion?.finished?'Completed · IH-201':'Infusing','warning')}${s.infusion&&!s.infusion.labelWritten?row('Write the bucket label','Copy the suggested label and batch reference','infusion-bucket-label','edit'):''}${row('Weekly infusion checks','Days 7, 14, 21 and 28 · stir, fermentation and moisture','infusion-checks','clock')}${infusionContents()}${callout('Completion must be recorded','A check or the passage of time never releases this stock for bottling.','info')}${row('Container and check history','Source, location and recorded observations','infusion-history','work')}${s.infusion?.finished?row('Review completed product','IH-201 and quality release','infusion-completed','shield'):row('Finish infusion','Actual completion, outputs and balance','infusion-finish','scale')}`,null,null,{...production,back:'production-home'})
```
