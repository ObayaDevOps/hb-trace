# Screen reference: stock-list

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('stock-list', …).

```javascript
screen('stock-list','receive','Stock list','Honey at HQ','Every physical bucket is counted once.',()=>`${amount('Physical stock','45 kg','3 buckets across receiving and held storage')}<div class="filter-row" aria-label="Stock filters">${['All','Source needed','Held','Released'].map(x=>`<button type="button" data-filter="${x}" aria-pressed="${state.stockFilter===x}" class="${state.stockFilter===x?'active':''}">${x}</button>`).join('')}</div>${stockRows()}<p class="small">A bucket can need source details and be held. Filters may overlap.</p>`,null,null,{role:'receiving',nav:'find',back:'hq-home',note:'Physical total = 45 kg. Released = 15 kg. Source needed = 30 kg and held = 15 kg overlap; never add those filter totals together.'})
```

## Later overrides for this screen

These changes apply after the base definition and take precedence for the properties they replace.
Source: public/design/mobile-ui/workflows.js.

```javascript
append('stock-list',()=>`${row('Raw and finished wax','Source-linked stock and processing history','wax-stock','bucket')}${row('Ingredients','Purchased lots and available quantities','ingredient-stock','list')}${row('Infusing and infused honey','Work in progress and completed product','infusing-stock','leaf')}`)
```
