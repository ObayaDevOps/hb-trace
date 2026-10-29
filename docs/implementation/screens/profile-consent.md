# Screen reference: profile-consent

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('profile-consent', …).

```javascript
screen('profile-consent','profile','Sharing choices','What may we share?','Explain that the story may appear on the customer website. Let the farmer choose.',()=>`${check('sharePhoto','Farmer photo','Show the approved photo to customers.')}${check('shareStory','Farmer story','Show the approved story to customers.')}${check('shareArea','Approximate source area','Show the general area, never exact coordinates.')}${callout('It’s fine to say no','Declining public sharing does not affect registration or collection.')}${field('consentNote','How was this explained?','Explained in person in the farmer’s preferred language.',{area:true})}`,optional.next,'Save sharing choices',{...optional,label:'Save sharing choices',note:'All choices start off. Store purpose/policy version and evidence in the product. The public example shows a separately approved scenario.'})
```
