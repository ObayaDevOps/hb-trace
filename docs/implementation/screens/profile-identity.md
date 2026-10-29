# Screen reference: profile-identity

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('profile-identity', …).

```javascript
screen('profile-identity','profile','Identity details','Identity details','Optional. These details stay private.',()=>`${field('identityNumber','Identity number','',{optional:true,hint:'Enter only the agreed national identifier.'})}${callout('For staff records only','This number never appears on a customer page.','info')}`,optional.next,optional.label,{...optional,note:'Confirm the locally correct national identifier, label and format before implementation. Do not assume “national insurance number”.'})
```
