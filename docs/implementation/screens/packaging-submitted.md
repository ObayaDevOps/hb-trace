# Screen reference: packaging-submitted

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('packaging-submitted', …).

```javascript
screen('packaging-submitted','production','Packaging review requested','Ready for quality review','The quality manager will review batch HB-261027-A.',()=>`${success(true)}${timeline([['Bottling recorded','48 jars · 500 g','jar'],['Labels added','HB-261027-A','check'],['Packaging release pending','Keep jars separate','shield'],['Public page pending','Approval is a separate step','book']])}`,'production-home','Back to production',{role:'production'})
```
