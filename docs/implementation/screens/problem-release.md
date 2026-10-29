# Screen reference: problem-release

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('problem-release', …).

```javascript
screen('problem-release','quality','Problem · review release','Can this honey resume?','Check every restriction before recording a release.',()=>`${summary([['Source details','Resolved'],['Retest evidence','New report linked'],['Other restrictions','Must be checked'],['Current state','Held · eligible for review']])}${field('problemReleaseReason','Evidence supporting release','',{area:true,required:true})}${check('allRestrictionsCleared','All required checks and restrictions are resolved')}${callout('Release only for the permitted next step','Rejected or recalled honey needs its permitted disposition workflow.','warning')}`,'problem-release-saved','Record release',{role:'quality',back:'problem-decision'})
```
