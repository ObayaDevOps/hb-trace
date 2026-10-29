# Screen reference: infusion-ingredients

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('infusion-ingredients', …).

```javascript
screen('infusion-ingredients','production','Infusion · add ingredients','Choose the ingredient','Select an available purchase lot and weigh the amount added.',()=>`${lotSelectors('ingredient')}${callout('Unused ingredients stay in stock','The selected purchase lot stays linked to this infusion.','info')}${row('View ingredient purchases','Record a purchase if the ingredient is unavailable','ingredient-stock','list')}`,'infusion-start','Continue',{...production,back:'infusion-honey',step:[2,4,'Start infusion']})
```
