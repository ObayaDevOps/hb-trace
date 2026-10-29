# Screen reference: packaging-submit

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('packaging-submit', …).

```javascript
screen('packaging-submit','production','Packaging ready for review','Send the batch for review','Check the packaging evidence before requesting release.',()=>`${check('labelCheck','The batch code is legible on the jars')}${check('jarCheck','Jars and seals have been checked')}${field('packagingEvidence','Packaging check reference','PACK-108',{required:true})}${callout('Quality manager approval needed','Printing labels and recording this checklist do not release the batch.','warning')}`,'packaging-submitted','Request packaging review',{role:'production',back:'jar-label'})
```
