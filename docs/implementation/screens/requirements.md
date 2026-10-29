# Screen reference: requirements

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('requirements', …).

```javascript
screen('requirements','support','Quality requirements','Required checks','Use the current requirements defined by the quality owner.',()=>`${card('<h3>Honey quality</h3><p class="small">Applicable standard, licensed source and version.</p>')}${card('<h3>Hygiene & handling</h3><p class="small">Approved procedures and required evidence.</p>')}${card('<h3>Packaging & labelling</h3><p class="small">Approved label specification and release checks.</p>')}${callout('Checks do not imply certification','Do not show a UNBS certification claim without its separate approved basis.','warning')}`,'document-library','Open work instructions',{role:'quality',back:'quality-home',note:'No regulatory thresholds are invented here. Populate the controlled requirements register from approved, current sources.'})
```
