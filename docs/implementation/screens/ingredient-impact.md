# Screen reference: ingredient-impact

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('ingredient-impact', …).

```javascript
screen('ingredient-impact','quality','Quality · ingredient impact','Trace an ingredient problem','Follow purchase lots to all affected infusions and bottled batches.',()=>`${field('problemIngredient','Ingredient lot','ING-101',{choices:ingredients.map(l=>l.id),required:true})}${s.infusion&&s.infusion.ingredients.some(l=>l.id===(s.problemIngredient||'ING-101'))?`${timeline([['Purchased ingredient',esc(s.problemIngredient||'ING-101'),'list'],['Bulk infusion','INF-201 · includes this ingredient even if later removed','bucket'],['Infused product',s.infusion.finished?'IH-201 + retained IR-201':'Still infusing','scale'],['Bottled batch',s.infusion.bottled?'HB-261028-I':'None recorded','jar']])}${callout('Confirm every affected branch','Quality owners review remaining ingredient stock, all infusion outputs, packaging and any active public response.','warning')}`:callout('No downstream use recorded','This lot has not been added to the session’s infusion.','info')}${field('ingredientIssue','Problem and evidence','',{area:true,required:true})}`,'!ingredient-report','Record problem for review',{...quality,back:'ingredient-stock',note:'The product queries every allocation recursively, including consumed and removed ingredients. Holds block allocation and bottling; a published batch also needs explicit withdrawal/recall policy. This reference has one session infusion, not a complete live incident system.'})
```
