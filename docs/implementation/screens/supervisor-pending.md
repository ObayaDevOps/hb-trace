# Screen reference: supervisor-pending

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('supervisor-pending', …).

```javascript
screen('supervisor-pending','work','Supervisor review pending','A supervisor will review this','You can continue with other work.',()=>`${success(true)}${card('<h3>Grace A. · source details</h3><p class="small">We need to confirm whether two farmer records refer to the same person.</p>')}${callout('Linked records are waiting','The apiary, collection and existing bucket codes are preserved.','warning')}${row('View the waiting collection','COL-1042','collection-history','bucket')}`,'my-work','Back to My work',{note:'Officers cannot merge identities or reassign a committed source. Supervisor resolution has a separate example.'})
```
