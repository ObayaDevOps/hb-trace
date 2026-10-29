# Screen reference: session-expired

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('session-expired', …).

```javascript
screen('session-expired','work','Session expired','Sign in to sync','Your work is still on this phone.',()=>`${success(true)}${callout('2 collections waiting','Sign in to the same account when you have internet. Your saved work will stay here.','warning')}${card('<h3>Amina’s account</h3><p class="small">The approved offline session has ended. New capture will be available after sign-in.</p>')}`,'sign-in','Sign in again',{noNav:true,note:'This state shows expiry of offline authorization, not merely network loss. Apply the agreed session-age policy.'})
```
