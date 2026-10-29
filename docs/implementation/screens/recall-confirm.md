# Screen reference: recall-confirm

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('recall-confirm', …).

```javascript
screen('recall-confirm','quality','Problem · final confirmation','Confirm this action','This will restrict the affected honey and update the active customer response.',()=>`${callout('HB-261027-A · 48 jars','Related lots and the public batch response are included.','error')}${summary([['Action',state.recallType==='withdraw'?'Withdraw':'Recall'],['Further use','Blocked'],['Public response','Approved notice'],['Follow-up owner','Quality manager']])}${check('recallScopeConfirmed','I confirm the scope and required actions')}${check('recallResponseConfirmed','I approve the customer response for this action')}`,'recall-progress','Confirm and apply action',{role:'quality',back:'problem-recall',danger:true,note:'Restrict usage and create an immutable publication revision under server authority. Do not declare complete if any required downstream or public action fails.'})
```
