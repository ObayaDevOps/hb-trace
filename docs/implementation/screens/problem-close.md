# Screen reference: problem-close

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('problem-close', …).

```javascript
screen('problem-close','quality','Problem · closure review','Review before closing','Only close when all required actions and evidence are complete.',()=>`${check('closureEvidence','All required evidence is linked')}${check('closureStock','Stock and disposition actions are complete')}${check('closurePublic','Required public updates are confirmed')}${check('closureFollowup','Follow-up actions are complete')}${field('closureNote','Closure summary','',{area:true,required:true})}${callout('Closing does not release material','Existing rejection, hold or recall restrictions remain unless a permitted decision changes them.','info')}`,'quality-home','Record closure',{role:'quality',back:'problem-follow-up'})
```
