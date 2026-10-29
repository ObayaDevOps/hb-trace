# Screen reference: save-failed

Design reference only. Implement the accepted application contract, not gallery state/business logic. Read shared helpers only when needed.

Source: public/design/mobile-ui/screens.js — screen('save-failed', …).

```javascript
screen('save-failed','work','Device save failed','This has not been saved','Your entries are still here. Keep this screen open.',()=>`${callout('This phone could not save the collection','Do not close the app or remove its stored data. Try again or ask for help.','error')}${source()}${summary([['Honey',`${net()} kg`],['Total agreed',`UGX ${total()}`]])}${row('Get help','Share the problem without losing the form','help','help')}`,'collection-review','Return to entries and retry',{note:'Never show “Saved” before durable storage completes. Preserve entries in the open form; do not advise clearing application data.'})
```
