# Screen reference: receive-code

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('receive-code', …).

```javascript
screen('receive-code','receive','Receive · bucket code','Read the bucket label','Scan the code or type it below.',()=>`<div class="scanner"><div class="scan-frame">${icon('scan')}</div><span class="scan-caption">Camera preview example</span></div>${button('Try an example scan','!scan','secondary','scan')}${field('arrivalCode','Bucket code','HB-7K2M',{required:true,placeholder:'For example HB-7K2M'})}${button('The label is damaged','damaged-label','text-action')}`,'receive-arrival','Find bucket',{role:'receiving',back:'hq-home',step:[1,3,'Receive honey'],note:'Camera actions are simulated in the reference. Always provide typing and damaged-label alternatives.'})
```
