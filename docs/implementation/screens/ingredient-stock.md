# Screen reference: ingredient-stock

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('ingredient-stock', …).

```javascript
screen('ingredient-stock','receive','Ingredients · purchase stock','Ingredient stock','Purchased quantity, available weight and use history.',()=>`${ingredients.map(l=>card(`<h3>${esc(l.id)} · ${esc(l.name)}</h3>${summary([['Purchased',`${l.quantity} ${l.unit}`],['Available',kg(l.available)],['Allocated',kg(l.purchased-l.available)],['Seller',esc(l.supplier)],['Purchase date',esc(l.date)],['Supplier batch',esc(l.supplierBatch||'Not supplied')],['Receipt',esc(l.receipt||'Not supplied')],['Quality',l.eligible?'Released for infusion':'Awaiting review']])}`)).join('')}${row('Trace ingredient use','Infusions and bottled batches','ingredient-impact','search')}${row('Quality review','Release purchased lots when requirements are met','ingredient-release','shield')}`,'!ingredient-new','Record another purchase',{...production,back:'production-home'})
```
