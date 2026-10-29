# Screen reference: checks-submitted

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('checks-submitted', …).

```javascript
screen('checks-submitted','quality','Checks submitted','Checks are ready for review','A quality manager will record the next decision.',()=>`${success()}${callout('Awaiting quality decision','Recording observations does not release honey for use.','warning')}${row('View stock','Current status and location','stock-list','list')}`,'hq-home','Back to your queue',{role:'receiving'})
```
