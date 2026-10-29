# Screen reference: bottling-released

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('bottling-released', …).

```javascript
screen('bottling-released','quality','Bottling release recorded','Released for bottling','The production team can now use the available honey.',()=>`${success()}${summary([['Lot','H-108'],['Available honey','29.5 kg'],['Permitted next step','Bottling']])}${callout('Packaging release comes later','The finished jars still need their own review.','info')}`,'quality-home','Back to quality queue',{role:'quality'})
```
