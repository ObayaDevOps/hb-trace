# Screen reference: profile-yield

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('profile-yield', …).

```javascript
screen('profile-yield','profile','Expected harvest','How much is expected?','An estimate helps plan the next collection.',()=>`${field('yield','Estimated available honey','80',{type:'number',inputmode:'decimal',unit:'kg',optional:true})}${field('yieldPeriod','Expected period','October–November 2026',{optional:true})}${field('yieldDate','Estimate recorded on','2026-10-27',{type:'date'})}${callout('This is a planning estimate','It does not add honey to stock or record an actual harvest.','info')}`,optional.next,optional.label,optional)
```
