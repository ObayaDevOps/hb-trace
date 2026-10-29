# Screen reference: wax-problem

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('wax-problem', …).

```javascript
screen('wax-problem','quality','Quality · wax impact','Trace a wax problem','Follow raw residue forward to every output.',()=>`${summary([['Raw wax scope',s.waxRun?s.waxRun.inputs.map(l=>esc(l.id)).join(', '):'RW-201 · RW-202'],['Affected wax',s.waxRun?'WX-301 → FW-301 + WR-301':'No processing recorded in this session'],['Upstream sources',s.waxRun?s.waxRun.inputs.map(l=>esc(l.source)).join('<br>'):'EX-201 / River apiary · EX-202 / Shea Grove']])}${callout('Quality manager owns the response','Confirm the affected scope and decide holds, tests or disposition. Sales and dispatch are outside this revision.','warning')}${field('waxIssue','Problem and evidence','',{area:true,required:true})}`,'!wax-report','Record problem for review',{...quality,back:'wax-history',note:'Forward trace includes every raw allocation, finished lot and retained output. This reports an issue; it does not release or silently dispose of stock.'})
```
