# Screen reference: account

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('account', …).

```javascript
screen('account','support','Account & preparation','Your account','Amina · Field officer',()=>`${summary([['Work email','amina@example.test'],['Device','This phone'],['Last connected','Today · 08:10']])}${row('Your past work','Saved farmers and collections','work-history','work')}${row('Prepare for a field visit','Check this phone before leaving','field-preparation','cloud')}${row('Sync status','2 collections waiting','sync-status','cloud')}${row('Help & more','Instructions and support','help','help')}${button('Sign out','sign-out-warning','text-action','logout')}`,null,null,{back:'field-home',note:'This is the field account example. The product displays the actual signed-in role and scopes available actions accordingly.'})
```
