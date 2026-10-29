# Screen reference: draft-saved

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('draft-saved', …).

```javascript
screen('draft-saved','register','Save and finish later','Pick up where you left off','Your draft is in My work.',()=>`${success()}${card('<h3>Grace A. · Registration</h3><p class="small">Next: finish the apiary details.</p>')}${callout('Saved on this phone','This draft has not been sent yet.','warning')}`,'my-work','Go to My work',{note:'Incomplete minimum details stay a draft. The product must show the actual next incomplete step.'})
```
