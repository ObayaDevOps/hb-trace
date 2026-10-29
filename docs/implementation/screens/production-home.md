# Screen reference: production-home

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('production-home', …).

```javascript
screen('production-home','production','Production home','Ready for the next step','Choose the work you are doing today.',()=>`${task('Process honey','2 released buckets · 30 kg','processing-inputs','bucket',true)}${task('Bottle honey','1 released lot · 29.5 kg','bottling-inputs','jar')}${row('View stock','Available weights and locations','stock-list','list')}${row('Recent production','Processing run PR-108','processing-saved','work')}${callout('Only released honey is shown','Sources and quality must be confirmed before use.')}`,null,null,{role:'production',nav:'home',header:'brand',note:'This later scenario assumes both collection buckets have been reconciled and released. Home queue prioritization should reflect the signed-in role.'})
```

## Later overrides for this screen

These changes apply after the base definition and take precedence for the properties they replace.
Source: public/design/mobile-ui/workflows.js.

```javascript
append('production-home',()=>`${task('Infuse honey','Bulk infusion before bottling','infusion-honey','leaf')}${row('Ingredient purchases','Record purchases and view remaining stock','ingredient-stock','list')}${row('Infusing stock','Contents, start time and location','infusing-stock','clock')}${row('Process wax','Raw residue through finished-wax stock','wax-stock','bucket')}${row('Extract honeycomb','Honey, raw wax residue, waste and losses','processing-honeycomb','scale')}`)
```
