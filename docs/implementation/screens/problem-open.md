# Screen reference: problem-open

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('problem-open', …).

```javascript
screen('problem-open','quality','Problem · review issue','Review a problem','Q-014 · seal issue after bottling',()=>`${badge('Urgent review','error')}${card('<h3>Reported by receiving staff</h3><p class="small">A seal issue was reported after bottling. Some jars may already have left HQ.</p>')}${summary([['Related source','HB-7K2M'],['Finished batch','HB-261027-A'],['Owner','Quality manager']])}${callout('First, check the affected honey','Trace all downstream lots and batches before confirming the action.','warning')}`,'problem-impact','Review affected honey',{role:'quality',back:'quality-home',step:[1,4,'Review a problem']})
```
