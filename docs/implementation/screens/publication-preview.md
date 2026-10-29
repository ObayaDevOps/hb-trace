# Screen reference: publication-preview

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('publication-preview', …).

```javascript
screen('publication-preview','publish','Public page · preview','Customer preview','This preview contains only information approved for customers.',()=>`${publicStory(false)}${callout('Not published yet','Return to the review to approve the page.','warning')}`,'publication-review','Back to review',{role:'publisher',back:'publication-review'})
```
