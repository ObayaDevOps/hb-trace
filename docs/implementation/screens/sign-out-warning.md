# Screen reference: sign-out-warning

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('sign-out-warning', …).

```javascript
screen('sign-out-warning','support','Protect unsent work','There’s work on this phone','2 collections have not synced yet.',()=>`${callout('Keep your account connected','Sync your work before signing out or handing this phone to another person.','warning')}${card('<h3>Don’t clear the app’s storage</h3><p class="small">The unsent records are only on this phone. Contact support if you cannot reconnect.</p>')}${row('Get help with this phone','Protect saved work and personal details','help','help')}`,'sync-status','Go to sync status',{back:'account',secondary:['Stay signed in','account'],note:'Do not silently delete unsent work or expose it to another account. Final device-lock, sign-out and account recovery policy must be implemented and tested.'})
```
