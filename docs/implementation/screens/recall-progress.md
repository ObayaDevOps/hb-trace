# Screen reference: recall-progress

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('recall-progress', …).

```javascript
screen('recall-progress','quality','Problem · action needs attention','One action still needs attention','Restrictions are recorded. The other website still needs its updated response.',()=>`${callout('Public update not confirmed','This action is not complete yet.','error')}${summary([['Material restrictions',badge('Applied')],['Batch restriction',badge('Applied')],['Active public response',badge('Updated')],['Other website confirmation',badge('Retry needed','error')]])}${row('Review the approved notice','Customer-facing response','public-recalled','book')}`,'problem-follow-up','Retry public update',{role:'quality',note:'Example partial failure. Surface cache/consumer propagation status under the agreed publication policy; never hide a failed required action.'})
```
