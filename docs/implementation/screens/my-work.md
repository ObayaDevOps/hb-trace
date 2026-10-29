# Screen reference: my-work

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('my-work', …).

```javascript
screen('my-work','work','My work','Your work','Drafts, saved collections and anything that needs attention.',()=>`${callout('1 item needs attention','Grace’s phone number needs a correction.','warning')}${task('Fix Grace’s details','1 apiary and 1 collection are waiting','fix-details','edit',true)}<h2>Continue a draft</h2>${row('Grace A. · Registration','Apiary details · saved today','register-apiary','user')}<h2>Saved on this phone</h2>${row('COL-1042 · 30 kg','Grace A. · waiting to sync','collection-history','bucket')}${row('COL-1043 · 18 kg','Rose K. · waiting to sync','sync-status','bucket')}<h2>Past work</h2>${row('Earlier collections','View synced records and receipts','work-history','work')}`,'sync-status','View sync status',{nav:'work',header:'brand',note:'Group records by meaningful status. One correction card represents the whole dependent chain.'})
```
