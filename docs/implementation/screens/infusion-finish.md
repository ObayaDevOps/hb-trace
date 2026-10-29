# Screen reference: infusion-finish

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('infusion-finish', …).

```javascript
screen('infusion-finish','production','Infusion · record completion','Finish the infusion','Record what actually happened and where every output goes.',()=>`${s.infusion?s.infusion.ingredients.map(l=>field(`fate-${l.id}`,`${esc(l.name)} · ${l.id}`, 'Removed after infusion',{choices:['Removed after infusion','Remains in product'],required:true})).join(''):callout('Start an infusion first','','warning')}${field('infusionEnd','Actual completion date and time','',{type:'datetime-local',required:true})}${weight('infusionProduct','Infused honey produced',15)}${weight('infusionRetained','Separately retained outputs',0.2)}${field('infusionRetainedLocation','Retained output storage','',{required:num('infusionRetained')>0})}${weight('infusionWaste','Waste',0)}${weight('infusionLoss','Loss',0.1)}${field('infusionFinishEvidence','Completion record and output / loss explanation','',{area:true,required:true})}${callout('Describe removed ingredients accurately','Removing an ingredient does not remove it from batch history or customer ingredient disclosure.','info')}`,'infusion-finish-review','Review completion',{...production,back:'infusing-stock'})
```
