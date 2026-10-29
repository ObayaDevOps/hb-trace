# Screen reference: recover-account

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('recover-account', …).

```javascript
screen('recover-account','start','Recover account','Let’s get you back in','Enter the email you use for work.',()=>`${field('email','Work email','amina@example.test',{type:'email',required:true})}${callout('Your saved work stays here','Signing in again must not delete work waiting to sync.','info')}`,'recovery-sent','Send reset link',{noNav:true,back:'sign-in'})
```
