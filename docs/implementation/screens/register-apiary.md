# Screen reference: register-apiary

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('register-apiary', …).

```javascript
screen('register-apiary','register','Registration · apiary','Where are the hives?',()=>`Add an apiary for ${state.farmerName}`,apiaryFields,'register-review','Review details',{...stepExtra(2,3,'New farmer'),back:'register-farmer'})
```
