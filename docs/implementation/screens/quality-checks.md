# Screen reference: quality-checks

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('quality-checks', …).

```javascript
screen('quality-checks','quality','Receiving quality checks','Check the received honey','Record observations and the required evidence.',()=>`${badge('HB-7K2M','neutral')}${field('sampleRef','Sample reference','S-2081',{required:true})}${field('moisture','Moisture reading','18.4',{inputmode:'decimal',unit:'%',required:true})}${field('instrument','Instrument reference','METER-02',{required:true})}${field('receivingObservations','Condition and observations','Seal intact. No visible foreign material.',{area:true,required:true})}${field('qualityEvidence','Completed check or report reference','CHECK-2081',{required:true})}${row('View the required checks','Use the current approved procedure','requirements','book')}${callout('Source details are still pending','Checks can be recorded, but processing stays blocked.','warning')}`,'checks-submitted','Save checks for review',{role:'receiving',back:'stock-item',note:'The sample moisture value is not a pass threshold. All applicable evidence and source requirements must be met before authorized release.'})
```
