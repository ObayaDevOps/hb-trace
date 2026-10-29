# Screen reference: location-unavailable

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('location-unavailable', …).

```javascript
screen('location-unavailable','profile','GPS unavailable','We couldn’t get a position','You can enter coordinates or add them another time.',()=>`${callout('The location description is enough for now','A missing GPS position does not block collection.','info')}${field('location','How do we find the apiary?',state.location,{area:true,required:true})}${button('Enter coordinates instead','profile-location','secondary')}`,'profile-sections','Save description and continue',{back:'profile-location'})
```
