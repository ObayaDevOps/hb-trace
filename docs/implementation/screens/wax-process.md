# Screen reference: wax-process

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('wax-process', …).

```javascript
screen('wax-process','production','Wax · melting & filtering','Record wax processing','Account for the material taken from every bucket.',()=>`${field('waxMethod','Process','',{choices:['Melting and filtering'],required:true})}${field('waxOperator','Operator','',{required:true})}${field('waxFacility','Facility','',{required:true})}${field('waxTime','Processing date and time','',{type:'datetime-local',required:true})}${weight('waxRecovered','Recovered finished wax',2.4)}${weight('waxRetained','Separately retained material',0.3)}${field('waxRetainedLocation','Retained material storage','',{required:num('waxRetained')>0})}${weight('waxWaste','Waste',0.2)}${weight('waxLoss','Loss',0.1)}${field('waxEvidence','Record reference and loss explanation','',{required:true})}${field('waxLocation','Finished wax storage','',{required:true})}`,'wax-review','Review balance',{...production,back:'wax-inputs',step:[2,3,'Process wax']})
```
