# Screen reference: work-history

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('work-history', …).

```javascript
screen('work-history','work','Past work','Your past work','Search your own completed work.',()=>`${field('workSearch','Farmer or collection reference','',{type:'search',placeholder:'Search your work'})}${row('Grace A. · 30 kg','COL-1042 · 27 Oct 2026','collection-history','bucket')}${row('Grace A. · 22 kg','COL-1020 · 12 Oct 2026','past-collection','bucket')}${row('Farmer registered','Grace A. · 4 Sep 2026','farmer-profile','user')}`,null,null,{nav:'work',back:'my-work'})
```
