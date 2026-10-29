# Screen reference: infusion-release

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('infusion-release', …).

```javascript
screen('infusion-release','quality','Quality · infusion release','Review infused honey IH-201','Review the applicable process and release evidence.',()=>`${infusionContents()}${summary([['Completion',esc(s.infusion?.finished||'Not recorded')],['Product',kg(s.infusion?.product||0)]])}${summary([['Weekly checks recorded',`${s.infusion?.checks.length||0} of 4`]])}${row('Review weekly observations','Stirring, fermentation and moisture history','infusion-history','list')}${s.infusion?.monitoringReviewRequired?`${callout('Weekly observations need review','Review the concerns and record the authorized disposition before release.','warning')}${field('infusionFollowupEvidence','Weekly-check follow-up and disposition evidence','',{required:true})}${check('infusionConcernsResolved','I reviewed the concerns and authorized this release')}`:''}${field('infusionReleaseEvidence','Applicable requirements and evidence reference','',{required:true})}${field('infusionReleaseNote','Release decision and reason','',{area:true,required:true})}${check('infusionReleaseChecked','All required checks and restrictions are resolved')}${callout('No automatic readiness','This reference defines no recipes, durations or safety limits.','info')}`,'!infusion-release','Release IH-201 for bottling',{...quality,back:'infusion-completed'})
```
