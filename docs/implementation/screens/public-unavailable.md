# Screen reference: public-unavailable

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('public-unavailable', …).

```javascript
screen('public-unavailable','public','Customer · service unavailable','The story is taking a moment','We can’t load this batch right now. Please try again.',()=>`<div class="empty-state"><div class="success-mark warning">${icon('cloud')}</div></div>${callout('Keep the code handy','You can return using the code printed on your jar.','info')}`,'!lookup','Try again',{role:'public',noNav:true,header:'brand',back:'public-lookup',note:'A service outage must not be presented as an invalid batch. Retry the same code.'})
```
