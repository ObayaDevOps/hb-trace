# Screen reference: document-detail

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('document-detail', …).

```javascript
screen('document-detail','support','Read a work instruction','Receive and sample honey','Controlled procedure · example layout',()=>`${badge('Current version','neutral')}${summary([['Document','SOP-REC-01'],['Version','3 · sample'],['Applies to','Receiving staff']])}<h2>Before you begin</h2><p>Use the current approved receiving and sampling procedure supplied by the quality team.</p><h2>At each arrival</h2><p>Record the bucket code, actual weight, condition and storage location. Link the completed check evidence.</p>${callout('Reference layout only','The actual controlled procedure must be supplied and approved before use.','info')}${check('instructionRead','I have read this version')}`,'document-library','Record acknowledgement',{back:'document-library',note:'Illustrative layout, not an approved operating procedure. Preserve version-specific acknowledgements.'})
```
