# Screen reference: packaging-released

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('packaging-released', …).

```javascript
screen('packaging-released','quality','Finished batch released','Finished batch released','The packaging decision has been recorded.',()=>`${success()}<div class="badges">${badge('Packaging released')}${badge('Page approval pending','warning')}</div>${row('View the publication queue','For an authorized publication reviewer','publication-home','book')}`,'quality-home','Back to quality queue',{role:'quality',note:'Publication link represents a separately authorized reviewer handoff; only show it in product navigation if the actor also has that permission.'})
```
