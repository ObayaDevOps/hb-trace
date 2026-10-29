# Screen reference: location-confirm

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('location-confirm', …).

```javascript
screen('location-confirm','profile','Confirm position','Is this the right spot?','Check the position before saving.',()=>`${map()}${summary([['Position source','Phone GPS · example'],['Accuracy','About 12 metres'],['Apiary',esc(state.apiaryName)]])}${check('atApiary','I am at this apiary', '', true)}`,'profile-sections','Save position',{back:'profile-location',secondary:['Enter position instead','profile-location']})
```
