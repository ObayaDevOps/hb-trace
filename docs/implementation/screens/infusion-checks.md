# Screen reference: infusion-checks

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('infusion-checks', …).

```javascript
screen('infusion-checks','production','Infusion · weekly checks','Weekly infusion checks','INF-201 · check, stir and record moisture each week.',()=>s.infusion?`${callout('Four checks in the first month','Days 7, 14, 21 and 28 after the actual start. Record what you observe; no moisture threshold is set by this reference.','info')}${checkSchedule().map(c=>card(`<h3>Day ${c.day} · ${c.due}</h3>${badge(c.record?'Recorded':c.due<operationalToday()?'Overdue':c.due===operationalToday()?'Due today':'Scheduled',c.record?'':'warning')}${c.record?`<p class="small">${esc(c.record.at)} · ${c.record.moisture}% moisture</p>`:button('Record this check',`!infusion-check-new-${c.day}`)}`)).join('')}${row('View recorded observations','Stirring, fermentation, moisture and operator history','infusion-history','work')}`:callout('No infusion started','Confirm its start before recording checks.','info'),'infusing-stock','Back to infusion',{...production,back:'infusing-stock',note:'Generate local due dates from the actual start plus 7/14/21/28 days. Preserve scheduled and performed times separately; do not auto-complete missed checks. Show due/overdue states and append immutable inspection records linked to the infusion and container. Checks are not release decisions.'})
```
