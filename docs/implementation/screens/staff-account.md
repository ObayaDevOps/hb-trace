# Screen reference: staff-account

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('staff-account', …).

```javascript
screen('staff-account','support','HQ account','Your account','Daniel · HQ staff',()=>`${summary([['Work email','daniel@example.test'],['Assigned work','Receiving and production'],['Connection','Online']])}${row('Your past work','Arrivals and production records','staff-work','work')}${row('Help & instructions','Current procedures and evidence','document-library','book')}${callout('HQ actions require a connection','Keep unfinished forms open if the connection drops.','info')}${button('Sign out','sign-in','text-action','logout')}`,null,null,{role:'receiving',back:'hq-home',note:'Role-specific account example. Actual roles, MFA and permissions come from the authenticated staff account.'})
```
