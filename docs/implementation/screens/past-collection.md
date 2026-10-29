# Screen reference: past-collection

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('past-collection', …).

```javascript
screen('past-collection','work','A synced collection','Collection COL-1020','Grace A. · Shea Grove',()=>`${badge('Synced')}${summary([['Collected on','12 Oct 2026'],['Harvest date','Not recorded'],['Material','Honey'],['Weight','22 kg'],['Price per kg','UGX 12,000'],['Total','UGX 264,000'],['Payment','Paid · paper receipt P-1020'],['Bucket','HB-5J8R']])}${callout('Saved and confirmed','This collection is available in your account.')}`,'work-history','Back to past work',{back:'work-history'})
```
