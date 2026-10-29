# Screen reference: quality-checks-linked

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('quality-checks-linked', …).

```javascript
screen('quality-checks-linked','quality','Checks · source confirmed','Check the received honey','Bucket HB-7K2M · source reconciled',()=>`${badge('Source confirmed')}${field('sampleRef','Sample reference','S-2081',{required:true})}${field('moisture','Moisture reading','18.4',{inputmode:'decimal',unit:'%',required:true})}${field('instrument','Instrument reference','METER-02',{required:true})}${field('receivingObservations','Condition and observations','Seal intact. No visible foreign material.',{area:true,required:true})}${field('qualityEvidence','Completed check or report reference','CHECK-2081',{required:true})}${callout('Quality review comes next','Source confirmation does not replace the quality manager’s decision.','info')}`,'checks-submitted','Save checks for review',{role:'receiving',back:'source-linked'})
```
