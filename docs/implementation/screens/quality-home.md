# Screen reference: quality-home

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('quality-home', …).

```javascript
screen('quality-home','quality','Quality manager home','Your quality queue','Review the work that needs your decision.',()=>`${task('Review a problem','1 urgent issue · bottled batch affected','problem-open','alert',true)}${row('Receiving checks','HB-7K2M · decision needed','quality-decision','bucket')}${row('Release for bottling','H-108 · evidence ready','bottling-release','shield')}${row('Packaging review','HB-261027-A · 48 jars','packaging-release','jar')}${row('Current requirements','Approved checks and controlled documents','requirements','book')}`,null,null,{role:'quality',nav:'home',header:'brand',note:'Privileged decisions belong to the quality manager. Other staff report problems and record evidence without releasing stock.'})
```

## Later overrides for this screen

These changes apply after the base definition and take precedence for the properties they replace.
Source: public/design/mobile-ui/workflows.js.

```javascript
append('quality-home',()=>row('Review wax impact','Raw and finished stock','wax-problem','alert')+row('Review ingredient impact','Infusions and bottled batches','ingredient-impact','alert')+row('Release infused honey','Completed product and required checks','infusion-release','shield'))
```
