# Screen reference: field-home

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('field-home', …).

```javascript
screen('field-home','start','Field officer home','Good morning, Amina','A good day starts with one small step.',()=>`${callout('2 collections on this phone','They will sync when you reconnect.','warning')}${task('Continue with Grace','Finish her apiary details','register-apiary','edit',true)}<div class="section-heading"><h2>What would you like to do?</h2></div>${task('Record honey collection','Find a farmer and receive their honey','find-farmer','bucket')}${task('Add a farmer','Start with just a few details','find-new-farmer','user')}${row('1 item needs your attention','Fix a phone number to finish syncing','fix-details','alert')}`,null,null,{nav:'home',header:'brand',note:'Resume unfinished work first. Keep the two frequent field tasks visible and move everything else to profiles or My work.'})
```
