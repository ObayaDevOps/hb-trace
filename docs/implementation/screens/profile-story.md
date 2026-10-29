# Screen reference: profile-story

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('profile-story', …).

```javascript
screen('profile-story','profile','Story & private notes','Tell their story','Keep the public story separate from notes for staff.',()=>`${field('story','Story for customers',state.story,{area:true,optional:true,hint:'A draft only. Ask permission before sharing.'})}${field('privateNotes','Private staff notes','Call the field officer to arrange a visit.',{area:true,optional:true})}${callout('Private notes stay private','They are never copied onto the customer page.','info')}`,optional.next,optional.label,optional)
```
