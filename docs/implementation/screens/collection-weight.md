# Screen reference: collection-weight

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('collection-weight', …).

```javascript
screen('collection-weight','collect','Collection · weight & grade','Weigh the honey','Weigh everything in this collection together.',()=>`${field('material','What are you receiving?','honey',{choices:['honey','honeycomb'],required:true})}<div class="field-grid">${field('gross','Filled weight',state.gross,{type:'number',inputmode:'decimal',unit:'kg',required:true})}${field('tare','Empty buckets',state.tare,{type:'number',inputmode:'decimal',unit:'kg',required:true})}</div>${amount('Honey weight',`<span data-calc="net">${net()}</span> <small>kg</small>`,'Filled weight minus empty buckets')}${field('grade','Receiving grade','Grade A · example',{choices:['Grade A · example','Grade B · example','Needs assessment'],required:true,hint:'Use the company’s agreed receiving grades.'})}`,'collection-payment','Continue',{...stepExtra(3,6,'Honey collection'),back:'collection-dates',note:'Grades here are sample labels pending operational definition. This is a receiving grade, not a certification or quality release.'})
```
