# Screen reference: register-farmer

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('register-farmer', …).

```javascript
screen('register-farmer','register','Registration · farmer','Let’s meet the farmer','Just the essentials for now.',()=>`${field('farmerName','Farmer’s name','Grace A.',{required:true,autocomplete:'name'})}${field('phone','Phone number','',{type:'tel',inputmode:'tel',disabled:state.noPhone,required:!state.noPhone,hint:'Use a number the farmer can be reached on.'})}${check('noPhone','This farmer has no phone')}${callout('Everything else can wait','Photo, story and payment details can be added later.')}`,'register-apiary','Continue',{...stepExtra(1,3,'New farmer'),back:'find-new-farmer',note:'Require name and either a phone or an explicit No phone choice. Do not infer No phone from an empty field.'})
```
