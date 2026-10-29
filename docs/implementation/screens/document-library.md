# Screen reference: document-library

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('document-library', …).

```javascript
screen('document-library','support','Work instructions','Current work instructions','Use the approved version for your task.',()=>`${row('Receive and sample honey','Current approved procedure · example','document-detail','book')}${row('Required quality checks','Requirements and linked evidence','requirements','shield')}${row('Completed forms','Record a form or evidence reference','form-evidence','list')}${callout('Check the version before starting','Previous versions stay in history.','info')}`,null,null,{back:'help',note:'Secondary reference surface. Actual controlled documents, effective versions and role permissions come from the document service.'})
```
