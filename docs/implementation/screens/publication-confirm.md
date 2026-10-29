# Screen reference: publication-confirm

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('publication-confirm', …).

```javascript
screen('publication-confirm','publish','Public page · confirm','Publish this batch page?','Customers who enter HB-261027-A will see the approved page.',()=>`${summary([['Batch','HB-261027-A'],['Contributing apiaries','1 · Shea Grove'],['Collection date','27 Oct 2026'],['Harvest timing','20–25 Oct 2026 · approximate'],['Bottled on','27 Oct 2026']])}${check('publishApproval','I approve this public version')}${callout('The current page can change','Permission changes, withdrawal and recall update the active response while history is retained.','info')}`,'publication-saved','Approve and publish',{role:'publisher',back:'publication-review'})
```
