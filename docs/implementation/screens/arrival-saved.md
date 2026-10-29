# Screen reference: arrival-saved

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('arrival-saved', …).

```javascript
screen('arrival-saved','receive','Arrival saved','Bucket is now in stock','Stored separately while details are completed.',()=>`${success()}${amount('Received at HQ',`${esc(state.receivedWeight)} kg`,esc(state.storage))}<div class="badges">${badge('Awaiting source details','warning')}${badge('Awaiting checks','neutral')}</div>${row('View this bucket','Arrival ARR-2081','stock-item','bucket')}${callout('You can record checks now','Honey cannot be processed until its source and quality are resolved.','info')}`,'quality-checks','Record quality checks',{role:'receiving',secondary:['Receive another bucket','receive-code'],note:'The original arrival is linked after source sync, never inserted again. Source resolution alone does not confer quality release.'})
```
