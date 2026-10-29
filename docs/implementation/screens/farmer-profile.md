# Screen reference: farmer-profile

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('farmer-profile', …).

```javascript
screen('farmer-profile','profile','Farmer profile','',null,()=>`${profile()}<div class="badges">${badge('Ready to collect')}${badge('Saved on this phone','warning')}</div>${card(summary([['Phone',state.noPhone?'No phone':esc(state.phone)],['Farmer reference','F-1042']]))}<div class="section-heading"><h2>Apiaries</h2><a href="#add-apiary">Add apiary</a></div>${row(esc(state.apiaryName),esc(state.location),'apiary-profile','leaf')}${row('Add more details','Photo, story and payment information','profile-sections','edit')}${row('Past collections','2 collections · most recent 27 Oct','collection-history','work')}`,'collection-place','Record collection',{back:'find-farmer'})
```
