# Screen reference: problem-decision

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('problem-decision', …).

```javascript
screen('problem-decision','quality','Problem · choose action','What needs to happen?','Choose an action for the confirmed affected scope.',()=>`${choice('problemDecision','retest','Arrange a retest','Keep held while more evidence is collected.')}${choice('problemDecision','hold','Keep held','Record an owner and next review date.')}${choice('problemDecision','release','Release for a permitted step','Only if every restriction can be resolved.')}${choice('problemDecision','reject','Reject the material','Record the disposition and follow-up movements.')}${choice('problemDecision','recall','Withdraw or recall','Stop further use and update the customer response.')}`,'!problem-decision','Continue',{role:'quality',back:'problem-evidence',step:[4,4,'Review a problem'],note:'Decision authority is enforced server-side. Rejected or recalled material must not offer an ordinary release shortcut.'})
```
