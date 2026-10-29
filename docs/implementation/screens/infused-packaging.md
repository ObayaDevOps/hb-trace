# Screen reference: infused-packaging

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('infused-packaging', …).

```javascript
screen('infused-packaging','quality','Quality · infused packaging','Review infused batch packaging','HB-261028-I · labels, seals and product identity',()=>`${field('infusedPackagingEvidence','Packaging and label evidence','',{required:true})}${check('infusedPackagingChecked','I reviewed labels, ingredients, seals and all packaging requirements')}${callout('Publication needs separate approval','A packaging decision does not publish a page.','info')}`,'!infused-packaging','Release finished batch',{...quality,back:'infused-label'})
```
