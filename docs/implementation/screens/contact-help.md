# Screen reference: contact-help

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('contact-help', …).

```javascript
screen('contact-help','support','Get help','Ask for help','Keep your work open while you get support.',()=>`${field('helpIssue','What do you need help with?','',{area:true})}${callout('Share the record reference','Use a collection, bucket or issue code. Avoid sending private farmer details in messages.','info')}${card('<h3>Company support contact</h3><p class="small">The company’s approved contact will be displayed here during setup.</p>')}`,'!help','Show what to share',{back:'help',note:'Support contact and escalation policy are operational setup. No invented phone number or email is presented as a working service.'})
```
