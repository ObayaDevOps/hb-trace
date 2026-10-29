# Screen reference: help

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('help', …).

```javascript
screen('help','support','Help & more','A little help','Find a short guide or get help with your work.',()=>`${row('Work without internet','Saving, reconnecting and syncing','offline-help','cloud')}${row('Bucket labels & receipts','What the codes mean','label-help','bucket')}${row('Current work instructions','Approved procedures and forms','document-library','book')}${row('Get help','Contact the company support team','contact-help','help')}${row('About this account','Your role and saved work','account','user')}`,null,null,{back:'field-home',note:'Administration, imports and advanced traceability remain secondary permitted surfaces; the everyday mobile journey does not expose them by default.'})
```
