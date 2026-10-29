# Screen reference: field-preparation

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('field-preparation', …).

```javascript
screen('field-preparation','support','Prepare for a field visit','Ready to head out?','Connect and check these before leaving.',()=>`${summary([['Signed in',badge('Ready')],['App available on this phone',badge('Ready')],['Farmers you can access',badge('Updated today')],['Unsent collections',badge('2 waiting','warning')],['Phone storage',badge('Space available')]])}${callout('Back up work before you go','Sync the waiting records while you have a connection.','warning')}${row('View supported offline tasks','Know what you can do in the field','offline-help','book')}`,'sync-status','Sync before leaving',{back:'account'})
```
