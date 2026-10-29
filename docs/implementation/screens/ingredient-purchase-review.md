# Screen reference: ingredient-purchase-review

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('ingredient-purchase-review', …).

```javascript
screen('ingredient-purchase-review','production','Ingredients · review purchase','Review the ingredient lot','Keep the supplier reference if available.',()=>summary([['Internal lot',`ING-${103+ingredients.length-2}`],['Ingredient',esc(s.ingredient==='Other'?s.ingredientOther:s.ingredient)],['Seller',esc(s.supplier)],['Purchased on',esc(s.purchaseDate)],['Quantity',`${esc(s.purchaseQuantity)} ${esc(s.purchaseUnit)}`],['Weight in stock',kg(num('purchaseQuantity')/(s.purchaseUnit==='g'?1000:1))],['Supplier batch',esc(s.supplierBatch||'Not supplied')],['Receipt reference',esc(s.purchaseReceipt||'Not supplied')],['Quality','Awaiting ingredient review']]),'!ingredient-save','Create ingredient lot',{...production,back:'ingredient-purchase'})
```
