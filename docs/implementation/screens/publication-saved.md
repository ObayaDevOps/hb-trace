# Screen reference: publication-saved

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('publication-saved', …).

```javascript
screen('publication-saved','publish','Public page published','The batch page is published','The approved story is ready for the customer website.',()=>`${success()}${card('<h3>HB-261027-A</h3><p class="small">Public version 1 · approved</p>')}${row('View customer page','Approved sources, dates and story','public-batch','book')}`,'publication-home','Back to publication queue',{role:'publisher',note:'Product success requires an authorized server result. This prototype simulates publication and does not call a public API.'})
```
