# Screen reference: quality-release-saved

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('quality-release-saved', …).

```javascript
screen('quality-release-saved','quality','Receiving release recorded','Released for processing','The quality decision has been recorded.',()=>`${success()}${summary([['Bucket','HB-7K2M'],['Source','Reconciled'],['Quality','Released for processing'],['Available amount','15 kg']])}${callout('The production queue is updated','Only the available amount can be used.')}`,'quality-home','Back to quality queue',{role:'quality'})
```
