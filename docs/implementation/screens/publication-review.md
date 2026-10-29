# Screen reference: publication-review

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('publication-review', …).

```javascript
screen('publication-review','publish','Public page · readiness','Review the customer page','HB-261027-A · 48 jars',()=>`${summary([['Source traceability','Complete · 1 apiary'],['Packaging release','Recorded'],['Public photo','Permission and approval recorded'],['Public story','Permission and approval recorded'],['Location','Approved approximate area']])}${callout('Only approved content is included','Phone numbers, payment details, identity numbers, private notes and exact GPS are excluded.','info')}${row('Preview the customer page','What a customer sees after entering the code','publication-preview','book')}${check('publicationChecked','I reviewed the page and current sharing choices')}`,'publication-confirm','Continue to approval',{role:'publisher',back:'publication-home',note:'This is a separate approved-sharing scenario. Declined optional permissions must not block a valid page; use the source-summary variant.'})
```
