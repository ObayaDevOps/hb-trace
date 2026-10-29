# Screen reference: possible-duplicate

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('possible-duplicate', …).

```javascript
screen('possible-duplicate','start','Possible existing farmer','Is this the same farmer?','Ask the farmer to confirm the apiary and area.',()=>`${profile()}${summary([['Apiary','Shea Grove'],['Area','Near the village school'],['Phone','No phone recorded']])}${callout('Not sure?','Ask a supervisor to review. Your draft stays on this phone.','warning')}${button('Ask a supervisor','supervisor-pending','text-action')}`,'choose-apiary','Yes, choose this farmer',{secondary:['No, register a new farmer','register-farmer']})
```
