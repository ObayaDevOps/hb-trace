# Screen reference: offline-help

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('offline-help', …).

```javascript
screen('offline-help','support','What works offline','Working without internet','Keep this phone safe until your work is synced.',()=>`${card('<h3>In the field</h3><p class="small">With a prepared, authorized session, register farmers and apiaries, record collections, and keep their bucket labels and receipts.</p>')}${card('<h3>Back at HQ</h3><p class="small">Reconnect to receive stock, resolve sources, process honey, release quality decisions or publish a batch page.</p>')}${callout('Saved on this phone is not backed up','Open the app when connected and check My work for any corrections.','warning')}`,'account','Back to account',{back:'help'})
```
