# Screen reference: problem-recall

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('problem-recall', …).

```javascript
screen('problem-recall','quality','Problem · withdrawal or recall','Confirm the affected scope','Choose the action and review the customer response.',()=>`${choice('recallType','recall','Recall affected jars','Some jars may have reached customers.','true')}${choice('recallType','withdraw','Withdraw from distribution','Follow the approved withdrawal procedure.')}${summary([['Finished batch','HB-261027-A'],['Jars in scope','48 × 500 g'],['Related lot','H-108'],['Customer response','Approved batch notice']])}${field('recallReason','Reason and required action','Seal issue reported; retrieve affected jars for review.',{area:true,required:true})}${button('Preview customer notice','public-recalled','text-action')}`,'recall-confirm','Review action',{role:'quality',back:'problem-decision',note:'Use the approved public response policy. Include all affected batches, stock, distribution and active publications, not just remaining input honey.'})
```
