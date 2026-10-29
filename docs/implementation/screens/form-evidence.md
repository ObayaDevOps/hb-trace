# Screen reference: form-evidence

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('form-evidence', …).

```javascript
screen('form-evidence','support','Completed form evidence','Add a completed form','Link the evidence to the right record.',()=>`${field('formRecord','Bucket, lot or batch','HB-7K2M',{required:true})}${field('formVersion','Form and version','Receiving check · version 3',{required:true})}<label class="field-label" for="evidence-file">Photo or scan of completed form</label><input id="evidence-file" class="file-input" type="file" accept="image/*,.pdf">${field('formNotes','Evidence notes','',{area:true,optional:true})}${callout('Private evidence','The supervisor reviews this before it is accepted.','info')}`,'document-library','Save for review',{back:'document-library',note:'This reference does not upload files. Production uses private verified assets, versioned forms and review history.'})
```
