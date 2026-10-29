# Screen reference: profile-contact

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('profile-contact', …).

```javascript
screen('profile-contact','profile','Contact & mobile money','Contact & mobile money','Optional. Confirm these details with the farmer.',()=>`${field('contactPhone','Phone number','',{type:'tel',inputmode:'tel',optional:true})}${check('sameAsPhone','Mobile money uses the same number')}${field('mobileMoney','Mobile money number','',{type:'tel',inputmode:'tel',optional:true,disabled:state.sameAsPhone})}${callout('A payment is a separate step','Adding a number here does not record a payment.','info')}`,optional.next,optional.label,optional)
```

## Later overrides for this screen

These changes apply after the base definition and take precedence for the properties they replace.
Source: public/design/mobile-ui/workflows.js.

```javascript
change('profile-contact',{body:()=>`${field('contactPhone','Farmer contact number',s.noPhone?'':s.phone,{type:'tel',optional:true})}${check('sameAsPhone','Mobile money uses the contact number')}${field('mobileMoney','Mobile money number','',{type:'tel',optional:true,disabled:s.sameAsPhone})}${check('holderSame','Same as farmer','Registered account holder’s name matches the farmer.')}${field('holderName','Registered account holder’s name',s.holderSame?s.farmerName:'',{required:!!(s.sameAsPhone?s.contactPhone:s.mobileMoney),readonly:s.holderSame})}${callout('Private payment details','Confirm the actual registered account holder. Adding details does not record a payment.','info')}`,note:'Registered account holder is required whenever a mobile money number is supplied. Same as farmer copies the farmer name; a different holder is allowed. Contact, payment number and holder name remain private. Saved changes require before/after review and a reason.'})
```
