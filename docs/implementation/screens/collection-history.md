# Screen reference: collection-history

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('collection-history', …).

```javascript
screen('collection-history','collect','Collection history','Collection COL-1042','Grace A. · Shea Grove',()=>`${summary([['Collected on','27 Oct 2026'],['Honey','30 kg'],['Total agreed','UGX 360,000'],['Payment','Not paid yet']])}${timeline([['Collection recorded','27 Oct · 10:32 · Amina','bucket'],['2 buckets labelled','HB-7K2M · HB-7K2N','check'],['Waiting to sync','Saved on this phone','clock']])}${row('View receipt','Source, weight and farmer response','collection-receipt','list')}${row('Reprint bucket labels','Keep the original codes','bucket-labels','print')}${row('Report a problem','Add a note without changing the collection','report-problem','alert')}`,'my-work','Back to My work',{back:'my-work'})
```

## Later overrides for this screen

These changes apply after the base definition and take precedence for the properties they replace.
Source: public/design/mobile-ui/workflows.js.

```javascript
append('collection-history',()=>row('Receipt delivery','View attempts without creating a second receipt','receipt-delivery-status','cloud')+row('Amendment history','Original values, reason, author and time','amendment-history','work'))
```
