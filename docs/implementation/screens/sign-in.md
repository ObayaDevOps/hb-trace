# Screen reference: sign-in

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('sign-in', …).

```javascript
screen('sign-in','start','Sign in','Welcome back','Sign in to get ready for your day.',()=>`<div class="welcome-art">${landscape()}</div>${field('email','Work email','amina@example.test',{type:'email',required:true,autocomplete:'username'})}${field('password','Password','example-only',{type:'password',required:true,autocomplete:'current-password'})}<a class="inline-link" href="#recover-account">Forgot your password?</a>${callout('Going into the field?','Sign in while you have internet to prepare this phone.','info')}`,'field-home','Sign in',{header:'Sign in',noNav:true,back:null,note:'An online sign-in prepares authorized field capture. This prototype does not authenticate.'})
```
