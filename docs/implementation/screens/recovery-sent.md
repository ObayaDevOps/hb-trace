# Screen reference: recovery-sent

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('recovery-sent', …).

```javascript
screen('recovery-sent','start','Recovery sent','Check your email','If this account exists, you’ll receive a link to reset your password.',()=>`${success()}${card('<h3>Then return here</h3><p class="small">Open the link, choose a password, and sign in again.</p>')}`,'sign-in','Back to sign in',{noNav:true})
```
