# Screen reference: register-review

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('register-review', …).

```javascript
screen('register-review','register','Registration · review','Does this look right?','Read the details back to the farmer.',()=>`${card(summary([['Farmer',esc(state.farmerName)],['Phone',state.noPhone?'No phone':esc(state.phone)],['Apiary',esc(state.apiaryName)],['Location',esc(state.location)]]))}${button('Edit details','register-farmer','text-action','edit')}${callout('Ready to record honey','These details are enough to capture a collection. Other details can follow.')}`,'registration-saved','Save and record collection',{...stepExtra(3,3,'New farmer'),back:'register-apiary',secondary:['Save and finish','farmer-profile'],note:'Saving locally is separate from acceptance on the server. Source and quality checks still apply at HQ.'})
```
