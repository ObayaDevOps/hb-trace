# Screen reference: problem-evidence

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('problem-evidence', …).

```javascript
screen('problem-evidence','quality','Problem · evidence & hold','Review the evidence','Keep earlier results alongside new evidence.',()=>`${card('<h3>Packaging report PACK-108</h3><p class="small">Original check · 27 Oct</p>')}${card('<h3>Seal issue report Q-014</h3><p class="small">Reported after bottling · 28 Oct</p>')}${field('newEvidence','Additional evidence or report','',{optional:true})}${callout('A hold can be applied now','You do not need to wait for a retest to take urgent action.','warning')}${button('Apply an immediate hold','problem-hold','secondary','lock')}`,'problem-decision','Choose next action',{role:'quality',back:'problem-impact',step:[3,4,'Review a problem'],note:'Evidence is append-only. A hold is distinct from an approved public withdrawal or recall response.'})
```
