# Screen reference: find-farmer

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('find-farmer', …).

```javascript
screen('find-farmer','start','Find a farmer','Who is the honey from?','Find the farmer before you record a collection.',()=>`${field('farmerSearch','Name or phone number','Grace',{type:'search',placeholder:'Search farmers'})}${callout('Searching this phone','Connect to search all farmers you can access.','info')}<div data-search-results>${row('Grace A.','Shea Grove · Gulu area','choose-apiary','user')}${row('Grace O.','River apiary · Gulu area','confirm-other-farmer','user')}</div><p class="small" data-search-empty hidden>No matching farmer on this phone. Check the name or add a farmer.</p>${button('Add a farmer','register-farmer','text-action','plus')}`,null,null,{nav:'find',header:'Find a farmer',note:'Search only authorized records. A name match alone must never assign a source.'})
```
