# Screen reference: ingredient-purchase

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('ingredient-purchase', …).

```javascript
screen('ingredient-purchase','production','Ingredients · record purchase','Record an ingredient purchase','Each purchase creates an internal ingredient lot.',()=>`${field('ingredient','Ingredient','Vanilla',{choices:['Vanilla','Scotch bonnet chilli','Garlic','Rosemary','Lemon peel','Orange peel','Other'],required:true})}${s.ingredient==='Other'?field('ingredientOther','Ingredient name','',{required:true}):''}${field('supplier','Supplier / seller','',{required:true})}${field('purchaseDate','Purchase date','',{type:'date',required:true})}${field('purchaseQuantity','Purchased quantity','',{type:'number',required:true})}${field('purchaseUnit','Unit','kg',{choices:['kg','g']})}${field('supplierBatch','Supplier batch reference','',{optional:true})}${field('purchaseReceipt','Invoice or receipt reference','',{optional:true})}${callout('The seller is not the growing origin','Purchase details stay internal. An absent supplier batch does not prevent traceability through the internal lot.','info')}`,'ingredient-purchase-review','Review purchase',{...production,back:'ingredient-stock'})
```
