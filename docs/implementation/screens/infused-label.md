# Screen reference: infused-label

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('infused-label', …).

```javascript
screen('infused-label','production','Infused honey · batch labels','Label the infused batch','Identify this product distinctly from plain honey.',()=>`<div class="label-card"><p>HUMBLE BEEING · INFUSED HONEY</p><div class="code">HB-261028-I</div><p>${s.infusion?.bottled?.size||500} g · batch code shared by all jars</p></div>${callout('Traceability label example','Full ingredient and product labelling follows the approved packaging specification.','info')}${button('Print batch labels','!print')}${row('Trace this batch backward','Honey sources and every ingredient purchase lot','infusion-history','search')}`,'infused-packaging','Continue to packaging review',{...production,back:'infused-bottling-review'})
```
