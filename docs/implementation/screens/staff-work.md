# Screen reference: staff-work

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('staff-work', …).

```javascript
screen('staff-work','support','HQ past work','Your work at HQ','Resume an open task or review a recorded action.',()=>`${row('Bucket HB-7K2M received','ARR-2081 · 27 Oct, 11:20','stock-item','bucket')}${row('Processing recorded','PR-108 · 27 Oct, 13:00','processing-saved','scale')}${row('Bottling recorded','HB-261027-A · 27 Oct','bottling-saved','jar')}${row('Quality issue reported','Q-014 · review in progress','problem-reported','alert')}`,null,null,{role:'receiving',nav:'work',back:'hq-home',note:'Only show records and actions authorized for the current account. The gallery offers separate role scenarios for review.'})
```
