# Screen reference: profile-location

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('profile-location', …).

```javascript
screen('profile-location','profile','Apiary position','Where is the apiary?','Use your phone’s location only when you are at the apiary.',()=>`${map()}${button('Use my location','!location','secondary','location')}${field('latitude','Latitude','2.71000',{inputmode:'decimal',optional:true})}${field('longitude','Longitude','32.30000',{inputmode:'decimal',optional:true})}${field('location','Location description',state.location,{area:true})}${callout('Private position','Customers see only an approved approximate area.','info')}`,'location-confirm','Check position',{...optional,next:'location-confirm',label:'Check position'})
```
