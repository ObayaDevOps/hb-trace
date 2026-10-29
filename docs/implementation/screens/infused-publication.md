# Screen reference: infused-publication

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/workflows.js — screen('infused-publication', …).

```javascript
screen('infused-publication','publish','Publication · infused batch','Approve the infused batch page','HB-261028-I · review facts and permitted stories',()=>`${summary([['Packaging',s.infusion?.packaging?'Released':'Pending'],['Public page',s.infusion?.published?'Published':'Not published']])}<details class="disclosure"><summary>Preview customer content</summary>${publicInfused()}</details>${check('infusedPublicationChecked','Sources, ingredient descriptions, dates and sharing permissions are approved')}${callout('Purchase details stay internal','Supplier names, invoices, purchase details and payment data are excluded. The seller does not prove where an ingredient was grown.','info')}`,'!infused-publish','Approve and publish example',{role:'publisher',back:'publication-home',note:'Public projection allowlists approved honey sources, stories, forage, labelled dates and actual ingredient descriptions including removed ingredients. Never expose seller, invoice, payment, exact GPS or unapproved growing-origin claims.'})
```
