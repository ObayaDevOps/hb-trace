# Screen reference: publication-home

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('publication-home', …).

```javascript
screen('publication-home','publish','Publication queue','Ready for a customer story','Review each finished batch before it goes public.',()=>`${task('Review HB-261027-A','Packaging released · page not published','publication-review','book',true)}${row('Current public page','View the approved customer example','public-batch','jar')}${callout('Share only approved information','Profiles and approximate source areas follow the farmer’s sharing choices.','info')}`,null,null,{role:'publisher',header:'brand',nav:'home'})
```

## Later overrides for this screen

These changes apply after the base definition and take precedence for the properties they replace.
Source: public/design/mobile-ui/workflows.js.

```javascript
append('publication-home',()=>row('Infused honey HB-261028-I','Ingredients and approved honey ancestry','infused-publication','book'))
```
