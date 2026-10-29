# Screen reference: supervisor-home

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('supervisor-home', …).

```javascript
screen('supervisor-home','support','Supervisor queue','Your review queue','Resolve source questions so the team can continue.',()=>`${task('Confirm a farmer identity','Grace A. · linked collection waiting','identity-review','user',true)}${row('Resolve a source difference','HB-7K2M · weight differs by 0.2 kg','source-review','scale')}${row('View work instructions','Forms, versions and evidence','document-library','book')}`,null,null,{role:'supervisor',nav:'home',header:'brand'})
```
