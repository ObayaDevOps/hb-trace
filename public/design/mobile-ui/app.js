/* Gallery and in-memory prototype interactions; intentionally no persistence/API. */
(() => {
  const {screens,groups,state,esc,icon,steps,button,net,total,workflows} = window.HB;
  const $ = s => document.querySelector(s);
  const byId = id => screens.find(s=>s.id===id);
  const resolve = value => typeof value === 'function' ? value() : value;
  let current, boardMode = new URLSearchParams(location.search).get('view')==='board';
  let toastTimer;
  const drafts = new Map();
  const roleNames = {field:'Field officer',receiving:'Receiving staff',production:'Production staff',quality:'Quality manager',supervisor:'Supervisor',publisher:'Publication reviewer',public:'Customer'};
  const homeFor = role => ({receiving:'hq-home',production:'production-home',quality:'quality-home',supervisor:'supervisor-home',publisher:'publication-home',public:'public-lookup'}[role]||'field-home');
  function announce(message){$('#announcement').textContent=message;$('#announcement').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#announcement').classList.remove('visible'),4500);}
  function navigate(id){if(!byId(id)){announce('This screen is not available in the reference.');return;}if(location.hash.slice(1)===id)render();else location.hash=id;}
  function appMarkup(s,board=false){
    const heading=resolve(s.heading),intro=resolve(s.intro),body=resolve(s.body)||'';
    const publicMode=s.role==='public';
    const header=s.header==='brand'||publicMode?`<div class="app-wordmark"><span class="bee-mark">${icon('bee')}</span>humble beeing</div>`:`${s.back!==null?`<a class="icon-button back-button" href="#${s.back||homeFor(s.role)}" aria-label="Back">${icon('back')}</a>`:''}<span class="header-title">${s.header||s.step?.[2]||roleNames[s.role]}</span>`;
    const navItems=s.role==='field'?[['home','Home','field-home','home'],['search','Find','find-farmer','find'],['work','My work','my-work','work']]:[['home','Home',homeFor(s.role),'home'],['bucket','Stock','stock-list','find'],['list','My work',s.role==='supervisor'?'supervisor-home':s.role==='publisher'?'publication-home':'staff-work','work']];
    const status=`<div class="phone-status" aria-hidden="true"><span>9:41</span><span class="status-icons">${icon('signal')}${icon('wifi')}${icon('battery')}</span></div>`;
    const footer=s.next?`<div class="app-footer">${button(s.label,s.next,s.danger?'danger-button':'primary',!s.danger&&s.next.startsWith('!')?'':'')}${s.secondary?button(s.secondary[0],s.secondary[1],'text-action'):''}</div>`:'';
    return `${status}<header class="app-header">${header}<span class="header-spacer"></span>${!publicMode&&!s.noNav?`<a class="icon-button" href="#help" aria-label="Help">${icon('help')}</a>${s.header==='brand'?`<a class="icon-button avatar-button" href="#${s.role==='field'?'account':'staff-account'}" aria-label="Your account">${s.role==='field'?'AM':s.role==='quality'?'QM':'DA'}</a>`:''}`:publicMode?`<a class="icon-button" href="#public-lookup" aria-label="Look up another batch">${icon('search')}</a>`:''}</header><div class="app-scroll"><form class="app-content" novalidate data-screen="${s.id}">${s.step?steps(...s.step):''}${heading?`<h1 tabindex="-1">${esc(heading)}</h1>`:''}${intro?`<p class="intro">${esc(intro)}</p>`:''}<div class="form-errors" aria-live="polite"></div>${body}</form></div>${footer}${!s.noNav&&!s.step&&s.nav?`<nav class="bottom-nav" aria-label="App navigation">${navItems.map(([i,t,to,key])=>`<a href="#${to}" class="${s.nav===key?'active':''}" ${s.nav===key?'aria-current="page"':''}>${icon(i)}${t}</a>`).join('')}</nav>`:''}`;
  }
  function directory(){
    const query=$('#screen-search').value.trim().toLowerCase();
    $('#screen-directory').innerHTML=groups.map(([key,n,title])=>{
      const matches=screens.filter(s=>s.group===key&&(!query||`${s.title} ${s.heading} ${s.id}`.toLowerCase().includes(query)));
      if(!matches.length)return '';
      return `<details ${query||current?.group===key?'open':''}><summary>${n} &nbsp; ${title}<small>${matches.length}</small></summary>${matches.map(s=>`<a href="#${s.id}" class="${s.id===current?.id?'active':''}" ${s.id===current?.id?'aria-current="page"':''}><span>${String(screens.indexOf(s)+1).padStart(3,'0')}</span>${s.title}</a>`).join('')}</details>`;
    }).join('') || '<p class="small">No matching screens.</p>';
  }
  function render(){
    const next=byId(decodeURIComponent(location.hash.slice(1)))||byId('field-home');
    if(current&&current.id!==next.id)workflows.leave(current.id,next.id);
    current=next;
    const i=screens.indexOf(current),group=groups.find(g=>g[0]===current.group);
    $('#section-label').textContent=`${group[1]} / ${group[2]}`;
    $('#screen-title').textContent=current.title;
    $('#screen-count').textContent=`${i+1} / ${screens.length}`;
    $('#phone').innerHTML=appMarkup(current);
    $('#screen-notes').innerHTML=`<div class="note-number">${String(i+1).padStart(3,'0')}</div><span class="eyebrow">${esc(roleNames[current.role])} · ${current.id}</span><h3>What this screen does</h3><p>${esc(resolve(current.intro)||current.title)}</p><h3>The next step</h3><div class="note-next">${esc(current.label||'Choose the relevant task or record.')}</div><h3>Build this behaviour</h3><p>${esc(current.note||'Retain entries when going back. Use a clear inline error when a required detail is missing. The product must verify role and record state before accepting changes.')}</p><h3>Reference only</h3><p>Fictional records and simulated actions. Form edits last for this page session. Illustration and map are placeholders; there are no live accounts, payments or stock writes.</p>`;
    if(current.id==='receipt-delivery-status')$('#screen-notes').innerHTML+=`<h3>Simulate company service</h3><p>These gallery controls simulate sync and provider evidence.</p>${['Queued','Sent','Failed','Delivery confirmed'].map(status=>`<button class="secondary" data-delivery-simulation="${status}">${status}</button>`).join('')}`;
    directory();
    $('#single-view').hidden=boardMode;
    $('#board').hidden=!boardMode;
    $('#view-toggle').textContent=boardMode?'Interactive view':'All screens';
    if(boardMode)renderBoard();
    $('#previous-screen').disabled=i===0;$('#next-screen').disabled=i===screens.length-1;
    if(drafts.has(current.id))restoreFields();
    document.title=`${current.title} · Humble Beeing UI reference`;
  }
  function renderBoard(){
    const query=$('#screen-search').value.toLowerCase();
    $('#board').innerHTML=groups.map(([key,n,title])=>{
      const items=screens.filter(s=>s.group===key&&(!query||`${s.title} ${s.id}`.toLowerCase().includes(query)));
      if(!items.length)return '';
      return `<h2 class="board-section">${n} &nbsp; ${title}</h2>${items.map(s=>`<section class="board-card"><div class="board-caption"><span>${String(screens.indexOf(s)+1).padStart(3,'0')} · ${s.title}</span><button data-open-screen="${s.id}">Open</button></div><div class="board-frame"><div class="phone" inert aria-hidden="true">${appMarkup(s,true)}</div></div></section>`).join('')}`;
    }).join('');
    // Board is visual overview; avoid duplicate IDs/labels in the same document.
    $('#board').querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
    $('#board').querySelectorAll('[for]').forEach(el=>el.removeAttribute('for'));
  }
  function rememberField(input){
    const key=input.dataset.field;if(!key)return;
    state[key]=input.type==='checkbox'?input.checked:input.value;
    const values=drafts.get(current.id)||{};values[key]=state[key];drafts.set(current.id,values);
  }
  function restoreFields(){
    // Fields use shared state so review screens see the entered values.
    // Browser-native fields without data-field are deliberately transient files.
    $('#phone').querySelectorAll('[data-field]').forEach(el=>{const value=state[el.dataset.field];if(value===undefined)return;if(el.type==='checkbox')el.checked=Boolean(value);else if(el.type==='radio')el.checked=el.value===value;else el.value=value;});
  }
  function recalc(){
    const values={net:net(),total:total(),bottled:Number(state.jars)*Number(state.jarSize)/1000};
    $('#phone').querySelectorAll('[data-calc]').forEach(el=>el.textContent=values[el.dataset.calc]);
  }
  function error(message,input){
    const box=$('#phone .form-errors');box.innerHTML=`<div class="error-summary" role="alert">${esc(message)}</div>`;
    if(input){input.setAttribute('aria-invalid','true');const label=input.closest('.field');if(label){let hint=label.querySelector('.field-error');if(!hint){hint=document.createElement('span');hint.className='field-error';hint.id=`${input.id}-error`;label.append(hint);}hint.textContent=message;input.setAttribute('aria-describedby',[input.getAttribute('aria-describedby'),hint.id].filter(Boolean).join(' '));}input.focus();}
    else box.scrollIntoView({block:'nearest'});
    return false;
  }
  function validate(){
    const fields=[...$('#phone').querySelectorAll('input,textarea,select')];
    fields.forEach(el=>el.removeAttribute('aria-invalid'));
    $('#phone .form-errors').innerHTML='';$('#phone').querySelectorAll('.field-error').forEach(el=>el.remove());
    for(const input of fields){if(input.disabled)continue;if(input.required&&!input.value.trim())return error('Add this detail to continue.',input);if(input.value&&!input.validity.valid)return error(input.type==='email'?'Enter a valid email address.':'Check this value before continuing.',input);}
    const el=key=>$('#phone').querySelector(`[data-field="${key}"]`);
    const requireCheck=key=>!el(key)||el(key).checked;
    const id=current.id;
    const workflowError=workflows.problem(id);if(workflowError)return error(workflowError);
    if(id==='register-farmer'&&!state.noPhone&&!state.phone.trim())return error('Enter a phone number or choose “This farmer has no phone”.',el('phone'));
    if(id==='collection-dates'){
      if(state.harvest==='exact'&&state.harvestDate>state.collectionDate)return error('Harvest must be on or before the collection date.',el('harvestDate'));
      if(state.harvest==='range'&&(state.harvestFrom>state.harvestTo||state.harvestTo>state.collectionDate))return error('Choose a valid harvest range ending on or before collection.',el('harvestTo'));
    }
    if(id==='collection-weight'&&(Number(state.gross)<=Number(state.tare)))return error('Filled weight must be greater than the empty bucket weight.',el('gross'));
    if(id==='collection-payment'&&Number(state.price)<=0)return error('Enter a price greater than zero.',el('price'));
    if(id==='collection-payment'&&state.payment==='paid'&&Number(state.paidAmount||net()*state.price)!==net()*Number(state.price))return error('This “Paid now” example needs the full agreed amount. Record partial payments separately in the product.',el('paidAmount'));
    if(id==='collection-buckets'&&(Number(state.bucketOne)<=0||Number(state.bucketTwo)<=0||Math.abs(Number(state.bucketOne)+Number(state.bucketTwo)-net())>.00001))return error(`The two bucket weights must add up to ${net()} kg, with honey in each bucket.`,el('bucketOne'));
    if(id==='processing-inputs'&&(Number(state.processInputOne)>15||Number(state.processInputTwo)>15||Number(state.processInputOne)<0||Number(state.processInputTwo)<0||Number(state.processInputOne)+Number(state.processInputTwo)<=0))return error('Choose an amount within the 15 kg available in each bucket.',el('processInputOne'));
    if(id==='processing-details'&&state.processMethod==='Extract honeycomb')return error('These example inputs contain honey. Select honeycomb inputs before recording extraction.',el('processMethod'));
    if(id==='processing-details'&&Math.abs(Number(state.honeyOutput)+Number(state.processLoss)-Number(state.processInputOne)-Number(state.processInputTwo))>.00001)return error('Honey output and loss must equal the total weight taken.',el('honeyOutput'));
    if(id==='bottling-inputs'&&(Number(state.bottleInput||29.5)>29.5||Number(state.bottleInput||29.5)<=0))return error('Enter an amount within the 29.5 kg available.',el('bottleInput'));
    if(id==='bottling-details'&&(!Number.isInteger(Number(state.jars))||Number(state.jars)<=0))return error('Enter a whole number of jars greater than zero.',el('jars'));
    if(id==='bottling-details'&&Math.abs(Number(state.jars)*Number(state.jarSize)/1000+Number(state.bottleRemaining)+Number(state.bottleLoss)-Number(state.bottleInput||29.5))>.00001)return error('Bottled honey, remaining honey and loss must equal the input weight.',el('bottleRemaining'));
    if(id==='receive-arrival'&&Number(state.receivedWeight)<=0)return error('Enter the received weight greater than zero.',el('receivedWeight'));
    if(id==='fix-details'&&!(state.correctedNoPhone??true)&&!state.correctedPhone?.trim())return error('Enter the corrected number or choose no phone.',el('correctedPhone'));
    const confirmations={
      'source-review':['confirmSource'],'source-resolution-review':['resolutionConfirmed'],'location-confirm':['atApiary'],
      'bottling-release':['bottlingReleaseChecks'],'packaging-submit':['labelCheck','jarCheck'],'packaging-release':['packagingApproval'],
      'problem-impact':['scopeConfirmed'],'problem-release':['allRestrictionsCleared'],'recall-confirm':['recallScopeConfirmed','recallResponseConfirmed'],
      'publication-review':['publicationChecked'],'publication-confirm':['publishApproval'],'problem-close':['closureEvidence','closureStock','closurePublic','closureFollowup'],
      'document-detail':['instructionRead']
    };
    for(const key of confirmations[id]||[]){if(!requireCheck(key))return error('Review and confirm this item before continuing.',el(key));}
    return true;
  }
  function isPrimary(target){return Boolean(target.closest('.app-footer')&&!target.classList.contains('text-action'));}
  function handleAction(action){
    if(workflows.editAction(action,render))return;
    if(action==='amend-cancel'){workflows.action(action,navigate,render,error);return;}
    if(action==='print'){window.print();return;}
    if(action==='scan'){state.arrivalCode='HB-7K2M';render();announce('Example scan entered HB-7K2M. Camera access was not requested.');return;}
    if(action==='location'){state.latitude='2.71000';state.longitude='32.30000';render();announce('Example GPS position selected. Your real location was not requested.');return;}
    if(action==='help'){announce('Share the record code, what you were trying to do, and the message on screen with your company support team.');return;}
    if(!validate())return;
    if(workflows.action(action,navigate,render,error))return;
    if(action==='lookup'){
      const code=(state.publicCode||'').trim().toUpperCase();
      navigate({'HB-261027-A':'public-batch','HB-261027-B':'public-blend','HB-261027-C':'public-no-profile','HB-261028-I':'public-infused','HB-RECALL':'public-recalled','HB-RETRY':'public-unavailable'}[code]||'public-not-found');return;
    }
    if(action==='sync'){state.syncStatus='synced';if(state.deliveryState==='Waiting to sync')workflows.simulateDelivery('Queued');render();announce('Example: records synced. The optional photo is still waiting to upload.');return;}
    if(action==='quality-decision'){navigate(state.qualityDecision==='release'?'quality-release-saved':'problem-open');return;}
    if(action==='problem-decision'){navigate({'retest':'problem-retest','hold':'problem-hold','release':'problem-release','reject':'problem-reject','recall':'problem-recall'}[state.problemDecision]);return;}
  }
  document.addEventListener('click',event=>{
    const delivery=event.target.closest('[data-delivery-simulation]');if(delivery){workflows.simulateDelivery(delivery.dataset.deliverySimulation);render();return;}
    const open=event.target.closest('[data-open-screen]');if(open){boardMode=false;navigate(open.dataset.openScreen);render();window.scrollTo({top:0});return;}
    const go=event.target.closest('#phone [data-go]');if(go){if(isPrimary(go)){if(!validate())return;if(workflows.primary(current.id,go.dataset.go,navigate))return;}navigate(go.dataset.go);return;}
    const action=event.target.closest('#phone [data-action]');if(action){handleAction(action.dataset.action);return;}
    const filter=event.target.closest('#phone [data-filter]');if(filter){state.stockFilter=filter.dataset.filter;render();return;}
    const link=event.target.closest('.directory a,.journey-links a,.studio-brand');if(link){boardMode=false;$('.directory')?.classList.remove('open');if(link.getAttribute('href')===location.hash)render();}
  });
  document.addEventListener('input',event=>{
    const input=event.target;if(!input.closest('#phone'))return;rememberField(input);recalc();
    if(input.dataset.field==='farmerSearch'){
      const query=input.value.toLowerCase();let matches=0;$('#phone').querySelectorAll('[data-search-results] .row-link').forEach(row=>{row.hidden=!row.textContent.toLowerCase().includes(query);if(!row.hidden)matches++;});
      const empty=$('#phone [data-search-empty]');if(empty)empty.hidden=Boolean(matches);
    }
  });
  document.addEventListener('change',event=>{
    const input=event.target;if(!input.closest('#phone'))return;rememberField(input);
    if(['holderSame','farmerName'].includes(input.dataset.field)&&state.holderSame)state.holderName=state.farmerName;
    if(input.dataset.field==='recipientKind'){state.recipientNumber=input.value==='farmer'?(state.contactPhone||(state.noPhone?'':state.phone)||''):'';state.recipientApproval=false;state.receiptDestinationConfirmed=false;}
    if(['recipientNumber','receiptChannel'].includes(input.dataset.field))state.receiptDestinationConfirmed=false;
    if(input.hasAttribute('data-photo')&&input.files[0]){
      const file=input.files[0];if(!file.type.startsWith('image/')){announce('Choose an image file for this preview.');return;}
      if(state.photoPreview)URL.revokeObjectURL(state.photoPreview);state.photoPreview=URL.createObjectURL(file);render();announce('Photo shown locally for this example. Nothing has been uploaded.');return;
    }
    if(workflows.fieldChanged(input.dataset.field)||['noPhone','receivingPlace','harvest','payment','receiptStatus','sameAsPhone','holderSame','processMethod','recipientKind','receiptMethod','ingredient','problemIngredient'].includes(input.dataset.field)){
      const top=$('#phone .app-scroll').scrollTop,key=input.dataset.field,value=input.value;
      render();$('#phone .app-scroll').scrollTop=top;
      const focus=[...$('#phone').querySelectorAll(`[data-field="${key}"]`)].find(x=>x.value===value)||$('#phone').querySelector(`[data-field="${key}"]`);focus?.focus({preventScroll:true});
    }
  });
  document.addEventListener('submit',event=>{if(event.target.closest('#phone')){event.preventDefault();const primary=$('#phone .app-footer .primary');primary?.click();}});
  $('#view-toggle').addEventListener('click',()=>{boardMode=!boardMode;render();});
  $('#print').addEventListener('click',()=>window.print());
  $('#previous-screen').addEventListener('click',()=>{const i=screens.indexOf(current);if(i>0)navigate(screens[i-1].id);});
  $('#next-screen').addEventListener('click',()=>{const i=screens.indexOf(current);if(i<screens.length-1)navigate(screens[i+1].id);});
  $('#screen-search').addEventListener('input',()=>{directory();if(boardMode)renderBoard();});
  window.addEventListener('hashchange',render);
  document.addEventListener('keydown',event=>{if(event.altKey&&['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();$(event.key==='ArrowLeft'?'#previous-screen':'#next-screen').click();}});
  // A compact screen selector keeps the full reference usable on actual phones.
  const jump=document.createElement('select');jump.className='screen-jump';jump.setAttribute('aria-label','Choose a reference screen');jump.innerHTML=groups.map(([key,n,title])=>`<optgroup label="${n} ${title}">${screens.filter(s=>s.group===key).map(s=>`<option value="${s.id}">${s.title}</option>`).join('')}</optgroup>`).join('');
  jump.addEventListener('change',()=>{boardMode=false;navigate(jump.value);});
  const mobileJump=document.createElement('div');mobileJump.className='mobile-jump';mobileJump.style.cssText='padding:0 16px 14px;';mobileJump.append(jump);
  $('#studio-main').insertBefore(mobileJump,$('#single-view'));
  const style=document.createElement('style');style.textContent='.mobile-jump{display:none}@media(max-width:700px){.mobile-jump{display:block}.phone{height:calc(100svh - 217px)}}@media print{.mobile-jump{display:none!important}}';document.head.append(style);
  window.addEventListener('hashchange',()=>jump.value=current.id);
  render();jump.value=current.id;
  // Read-only fixture metadata allows automated completeness and layout checks.
  window.HBReference={screens:screens.map(({id,group,title,role,next,label,note})=>({id,group,title,role,next,label,note})),navigate,render};
})();
