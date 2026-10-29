# Screen reference: report-problem

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('report-problem', …).

```javascript
screen('report-problem','quality','Report a problem','What needs attention?','Your report goes to the quality manager.',()=>`${field('problemReference','Bucket, lot or batch code','HB-261027-A',{required:true})}${field('problemDescription','What happened?','A seal issue was reported after bottling.',{area:true,required:true})}${field('problemLocation','Where is the affected honey?','Finished goods storage',{required:true})}${check('urgentProblem','This needs urgent attention','Possible risk or already distributed.')}${callout('Keep the material separate','Contact the quality manager for urgent action.','warning')}`,'problem-reported','Send report',{back:'collection-history',note:'A report does not itself authorize a quality disposition. The quality manager must review and confirm the scope of restrictions.'})
```
