# Screen reference: profile-sections

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('profile-sections', …).

```javascript
screen('profile-sections','profile','Optional detail sections','A little more about Grace','Choose a section. You can come back to any of these later.',()=>`${row('Identity','Private · optional','profile-identity','lock')}${row('Contact & mobile money','Private · optional','profile-contact','money')}${row('Farmer photo','Take or choose a photo','profile-photo','camera')}${row('Story & private notes','Keep these separate','profile-story','edit')}${row('Sharing choices','Ask what the farmer is happy to share','profile-consent','heart')}${row('Apiary position','Add a position on the map','profile-location','location')}${row('Forage','What grows around the hives?','profile-forage','leaf')}${row('Hives','Types and numbers','profile-hives','bucket')}${row('Expected harvest','A planning estimate','profile-yield','scale')}${row('Equipment','What is available?','profile-equipment','work')}`,'farmer-profile','Done for now',{back:'farmer-profile',note:'Independent optional sections keep onboarding short. A complete profile is not a prerequisite for collection.'})
```

## Later overrides for this screen

These changes apply after the base definition and take precedence for the properties they replace.
Source: public/design/mobile-ui/workflows.js.

```javascript
append('profile-sections',()=>row('Amendment history','Reasons and original values','amendment-history','work'))
```
