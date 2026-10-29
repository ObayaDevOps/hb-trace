# Screen reference: problem-follow-up

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('problem-follow-up', …).

```javascript
screen('problem-follow-up','quality','Problem · follow-up','Track the follow-up','Q-014 · quality manager owns the next action.',()=>`${callout('Follow-up is still open','Keep evidence and actions together until closure.','warning')}${row('Review evidence or retest','Add new results without changing earlier ones','problem-evidence','book')}${row('Review affected honey','Source lots, finished batch and publication','problem-impact','search')}${field('followUpNote','Progress note','Awaiting the next evidence review.',{area:true})}${field('followUpDate','Next review date','2026-10-29',{type:'date'})}${button('Review closure requirements','problem-close','secondary')}`,'quality-home','Save follow-up',{role:'quality',back:'quality-home',note:'The action-specific follow-up must include the actual retest, hold, disposition or recall tasks. This shared example shows the layout, not a completed recall.'})
```
