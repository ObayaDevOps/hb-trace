# Screen reference: problem-impact

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('problem-impact', …).

```javascript
screen('problem-impact','quality','Problem · affected scope','What could be affected?','Follow the honey from its source to the jars.',()=>`${timeline([['Source buckets','HB-7K2M + HB-7K2N · 30 kg used','bucket'],['Processed lot','H-108 · 29.5 kg produced','scale'],['Finished batch','HB-261027-A · 48 jars','jar'],['Active customer page','1 public batch page','book']])}${callout('Some source honey has already been used','Restrictions must reach the derived lots and finished batch.','warning')}${check('scopeConfirmed','I have checked the affected scope')}`,'problem-evidence','Continue to evidence',{role:'quality',back:'problem-open',step:[2,4,'Review a problem'],secondary:['Take urgent action now','problem-decision'],note:'Do not sum ancestral and derived quantities as separate affected stock. Scope includes consumed roots, current descendants and active publications.'})
```
