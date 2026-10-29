# Screen reference: confirm-other-farmer

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('confirm-other-farmer', …).

```javascript
screen('confirm-other-farmer','start','Confirm another farmer','Grace O.','Confirm the source with the farmer.',()=>`${card('<h3>River apiary</h3><p>Beside the eastern river path.</p>')}${callout('Another possible match','The design examples continue with Grace A. at Shea Grove.','info')}`,'find-farmer','Back to farmer search',{note:'Alternative match state. Never silently choose the first search result.'})
```
