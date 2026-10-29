# Screen reference: identity-review

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('identity-review', …).

```javascript
screen('identity-review','support','Supervisor · identity review','Are these the same farmer?','Compare evidence. Similar names alone are not enough.',()=>`${card('<h3>New field record</h3><p class="small">Grace A. · Shea Grove<br>No phone · northern path near the school</p>')}${card('<h3>Existing farmer F-1042</h3><p class="small">Grace A. · Shea Grove<br>No phone · northern path near the school</p>')}${choice('identityDecision','existing','Use the verified existing farmer')}${choice('identityDecision','distinct','They are different people')}${field('identityReason','Evidence and reason','Confirmed with the farmer and field officer.',{area:true,required:true})}${callout('Labels and history are retained','The apiary and waiting collection will reconnect without changing bucket codes.','info')}`,'identity-resolved','Confirm identity resolution',{role:'supervisor',back:'supervisor-home',note:'Server validates ownership, records an explicit identity mapping and uses linked corrections. Never fuzzy-merge or silently rewrite sent dependencies.'})
```
