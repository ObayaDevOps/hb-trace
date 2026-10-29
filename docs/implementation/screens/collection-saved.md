# Screen reference: collection-saved

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('collection-saved', …).

```javascript
screen('collection-saved','collect','Collection saved offline','Collection saved','Next, put the right code on each bucket.',()=>`${success()}${callout('Saved on this phone','Not yet confirmed by the server. It will sync when you reconnect.','warning')}${summary([['Collection reference','COL-1042'],['Farmer',esc(state.farmerName)],['Honey',`${net()} kg in 2 buckets`],['Total agreed',`UGX ${total()}`]])}`,'bucket-labels','Show bucket labels',{note:'Local save success and sync success must use different language. Codes remain stable after sync and correction.'})
```
