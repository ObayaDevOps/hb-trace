# Screen reference: public-lookup

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('public-lookup', …).

```javascript
screen('public-lookup','public','Customer · enter code','Every jar has a story','Enter the batch code from the bottom of your jar.',()=>`<div class="welcome-art">${landscape()}</div>${field('publicCode','Batch code','HB-261027-A',{required:true,placeholder:'For example HB-261027-A'})}<details class="disclosure"><summary>Where is the code?</summary><p>Look for a short code beginning with HB on the jar’s batch label.</p></details><p class="small">Jars from the same batch share a code.</p>`,'!lookup','Find my honey',{role:'public',noNav:true,header:'brand',back:null,note:'This represents the other customer website. Public lookup returns an approved projection, never operational staff records.'})
```

## Later overrides for this screen

These changes apply after the base definition and take precedence for the properties they replace.
Source: public/design/mobile-ui/workflows.js.

```javascript
append('public-lookup',()=>row('Explore an infused batch','HB-261028-I · approved example','public-infused','leaf'))
```
