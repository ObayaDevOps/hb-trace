# Screen reference: packaging-release

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('packaging-release', …).

```javascript
screen('packaging-release','quality','Quality · packaging release','Review the finished batch','HB-261027-A · 48 jars of 500 g',()=>`${summary([['Inputs','Released for bottling'],['Quantity balance','24 kg bottled + 5 kg remaining + 0.5 kg loss'],['Packaging evidence','PACK-108'],['Label code','HB-261027-A']])}${check('packagingApproval','I have reviewed packaging, label and required evidence')}${field('packagingReleaseReason','Decision note','All applicable packaging checks reviewed.',{area:true,required:true})}${callout('Publication is separate','A released batch still needs an approved customer page.','info')}`,'packaging-released','Release finished batch',{role:'quality',back:'quality-home'})
```
