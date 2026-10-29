# Screen reference: profile-hives

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('profile-hives', …).

```javascript
screen('profile-hives','profile','Hive types & counts','Tell us about the hives','Record each type separately. Leave a count blank if it is unknown.',()=>`${field('topBarHives','Kenyan top-bar hives','12',{type:'number',inputmode:'numeric',unit:'hives',optional:true})}${field('localHives','Local hives','8',{type:'number',inputmode:'numeric',unit:'hives',optional:true})}${field('langstrothHives','Langstroth hives','',{type:'number',inputmode:'numeric',unit:'hives',optional:true})}${field('otherHives','Other hive types or notes','',{optional:true})}`,optional.next,optional.label,optional)
```
