# Screen reference: label-help

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('label-help', …).

```javascript
screen('label-help','support','Understand the codes','Three codes, three purposes','Use the code printed beside the right item.',()=>`${card('<h3>Collection · COL-1042</h3><p class="small">The farmer’s transaction and receipt. It can contain more than one bucket.</p>')}${card('<h3>Bucket · HB-7K2M</h3><p class="small">One physical bucket. Keep its code when replacing a damaged label.</p>')}${card('<h3>Batch · HB-261027-A</h3><p class="small">The finished batch of jars. Customers use this code to find their honey’s story.</p>')}`,'help','Back to help',{back:'help'})
```
