# Screen reference: problem-reported

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('problem-reported', …).

```javascript
screen('problem-reported','quality','Problem reported','Your report has been sent','The quality manager will review the affected honey.',()=>`${success()}${summary([['Issue reference','Q-014'],['Batch','HB-261027-A'],['Assigned to','Quality manager']])}${callout('Need urgent help?','Follow the company’s urgent escalation procedure.','warning')}`,'my-work','Back to My work',{})
```
