# Screen reference: empty-work

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('empty-work', …).

```javascript
screen('empty-work','work','My work · empty','Your work will appear here','Your saved farmers, drafts and collections will be easy to find.',()=>`<div class="empty-state"><div class="welcome-art">${landscape()}</div><p>Start by registering a farmer or recording a honey collection.</p></div>`,'find-new-farmer','Add your first farmer',{nav:'work'})
```
