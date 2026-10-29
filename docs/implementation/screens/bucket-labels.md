# Screen reference: bucket-labels

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('bucket-labels', …).

```javascript
screen('bucket-labels','collect','Bucket labels','Label both buckets','Write clearly, or attach a printed label.',()=>`${labels()}${button('Print these labels','!print','secondary','print')}${callout('Keep the same codes','A replacement label uses the original code.')}`,'collection-receipt','Both labelled · show receipt',{back:'collection-saved',note:'Human-readable bucket codes are the primary aid. Optional real QR encoding can be added later; no decorative fake QR is used.'})
```
