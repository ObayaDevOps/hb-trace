# Screen reference: hq-home

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('hq-home', …).

```javascript
screen('hq-home','receive','Receiving home','Hello, Daniel','Let’s get today’s honey safely into stock.',()=>`${task('Receive a bucket','Scan or enter the code on the label','receive-code','bucket',true)}<h2>Next in your queue</h2>${row('2 buckets need source details','30 kg · stored separately','stock-list','search')}${row('1 bucket needs checks','15 kg · receiving bay','quality-checks','shield')}${row('View all stock','Weights, locations and status','stock-list','list')}${callout('Receive first, then check','Every confirmed arrival appears in stock immediately.')}`,null,null,{role:'receiving',nav:'home',header:'brand',note:'This home belongs to receiving staff. A separate quality-manager view controls release decisions.'})
```
