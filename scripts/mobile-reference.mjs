import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {chromium} from 'playwright';
import {execFileSync} from 'node:child_process';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const exporting=process.argv.includes('--export');
const out=resolve(root,'docs/mobile-ui-previews');
const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE}:{})});
const page=await browser.newPage({viewport:{width:1440,height:1100}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const snapshots=new Map();
const url=pathToFileURL(resolve(root,'public/design/mobile-ui/index.html')).href;
const go=async id=>{await page.evaluate(id=>HBReference.navigate(id),id);await page.waitForFunction(id=>document.querySelector('#phone form')?.dataset.screen===id,id);};
const here=async id=>assert.equal(await page.locator('#phone form').getAttribute('data-screen'),id);
const f=k=>page.locator(`#phone [data-field="${k}"]`);
const fill=async(k,v)=>{await f(k).fill(String(v));await f(k).blur();};
const primary=async()=>{await page.locator('#phone .app-footer > button').first().click();};
const advance=async id=>{await primary();await page.waitForFunction(id=>document.querySelector('#phone form')?.dataset.screen===id,id);await capture();};
const capture=async()=>{if(!exporting)return;const data=await page.evaluate(()=>{
  const phone=document.querySelector('#phone'),clone=phone.cloneNode(true);
  const originals=[...phone.querySelectorAll('input,textarea,select')];
  clone.querySelectorAll('input,textarea,select').forEach((el,i)=>{const original=originals[i];if(el.tagName==='TEXTAREA')el.textContent=original.value;else if(el.tagName==='SELECT')[...el.options].forEach(o=>o.toggleAttribute('selected',o.value===original.value));else{el.setAttribute('value',original.value);el.toggleAttribute('checked',original.checked);}el.removeAttribute('aria-invalid');});
  clone.querySelectorAll('.form-errors').forEach(el=>el.innerHTML='');clone.querySelectorAll('.field-error').forEach(el=>el.remove());
  return {id:phone.querySelector('form').dataset.screen,html:clone.outerHTML};
});snapshots.set(data.id,data.html);};
const blocked=async phrase=>{await primary();assert.match(await page.locator('#phone .form-errors').innerText(),phrase);};
const reviewReason=async()=>{await here('amendment-review');await fill('amendmentReason','Corrected the saved detail after checking with the farmer.');await primary();};
try {
  await page.goto(url);
  const metadata=await page.evaluate(()=>({screens:HBReference.screens,groups:HB.groups}));
  assert.equal(new Set(metadata.screens.map(s=>s.id)).size,metadata.screens.length);
  // Check every stable destination and every unit, including 036's shared-field pattern.
  for(const width of [320,390,1440]){
    await page.setViewportSize({width,height:1100});
    for(const screen of metadata.screens){
      await go(screen.id);
      const issues=await page.evaluate(()=>{
        const problems=[];const content=document.querySelector('#phone .app-content');
        if(content.scrollWidth>content.clientWidth+1)problems.push(`content overflow ${content.scrollWidth}/${content.clientWidth}`);
        if(document.documentElement.scrollWidth>innerWidth+1)problems.push('page overflow');
        const ids=new Set(HB.screens.map(s=>s.id));
        document.querySelectorAll('#phone [data-go],#phone a[href^="#"]').forEach(el=>{const to=el.dataset.go||el.getAttribute('href').slice(1);if(!ids.has(to))problems.push(`missing destination: ${to}`);});
        document.querySelectorAll('#phone .input-unit').forEach(el=>{const i=el.querySelector('input').getBoundingClientRect(),u=el.querySelector('.unit').getBoundingClientRect();if(u.left<i.left||u.right>i.right||u.top<i.top||u.bottom>i.bottom)problems.push('unit outside its own input');if(Math.abs((u.top+u.bottom-i.top-i.bottom)/2)>2)problems.push('unit not vertically centred');});
        return problems;
      });
      assert.deepEqual(issues,[],`${width}px · ${screen.id}`);
      if(width===1440)await capture();
    }
  }
  console.log(`Layout and destinations: ${metadata.screens.length} screens at 320, 390 and 1440 px.`);
  await page.goto(url);await go('profile-contact');
  await fill('mobileMoney','+256700000010');await blocked(/holder|detail/i);
  await f('holderSame').check();assert.equal(await f('holderName').inputValue(),'Grace A.');
  await f('holderSame').uncheck();await fill('holderName','Alex Example');await fill('contactPhone','+256700000011');
  await capture();await advance('amendment-review');await blocked(/detail/i);
  assert.match(await page.locator('#phone').innerText(),/Previous/);assert.match(await page.locator('#phone').innerText(),/Alex Example/);
  await page.locator('#phone [data-action="amend-cancel"]').click();await here('profile-contact');
  assert.equal(await f('mobileMoney').inputValue(),'');assert.equal(await f('holderName').inputValue(),'');
  await fill('mobileMoney','+256700000010');await fill('holderName','Alex Example');await fill('contactPhone','+256700000011');
  await advance('amendment-review');await reviewReason();await go('amendment-history');await capture();
  assert.match(await page.locator('#phone').innerText(),/Alex Example/);
  assert.equal(await page.evaluate(()=>HB.state.amendments.length),1);
  // Draft edits on a new registration do not require explanation.
  await go('register-farmer');await fill('farmerName','Grace A.');await advance('register-apiary');
  // First receipt response is independent of delivery; contact defaults differ from payment.
  await go('receipt-confirm');
  await page.locator('#phone [data-field="receiptStatus"][value="unavailable"]').check();
  await fill('receiptNote','Farmer will review later.');await f('receiptMethod').selectOption('SMS');
  await advance('receipt-delivery');assert.equal(await f('recipientNumber').inputValue(),'+256700000011');
  await blocked(/confirm/i);await f('receiptDestinationConfirmed').check();await advance('receipt-delivery-status');
  const receipt=await page.evaluate(()=>HB.state.receiptRequest);assert.equal(receipt.id,'DEL-COL-1042-1');
  assert.match(await page.locator('#phone').innerText(),/Waiting to sync/);
  for(const status of ['Queued','Failed'])await page.locator(`[data-delivery-simulation="${status}"]`).click();
  await capture();const failedDeliverySnapshot=snapshots.get('receipt-delivery-status');await page.locator('#phone [data-action="receipt-retry"]').click();
  for(const status of ['Sent','Delivery confirmed'])await page.locator(`[data-delivery-simulation="${status}"]`).click();
  assert.equal(await page.evaluate(()=>HB.state.receiptRequest.id),receipt.id);
  assert.equal(await page.evaluate(()=>HB.state.receiptStatus),'unavailable');
  assert.equal(await page.evaluate(()=>Math.max(...HB.state.deliveryAttempts.map(a=>a.attempt))),2);
  // Wax extraction, bucket balance, partial multi-source processing and retained stock.
  await go('processing-honeycomb');await fill('combRaw','6');await blocked(/30 kg/);await fill('combRaw','5');
  await advance('raw-wax-storage');await fill('rawTwo','4');await blocked(/bucket weights/);await fill('rawTwo','3');
  await capture();await advance('extraction-review');await advance('wax-stock');
  assert.equal(await page.evaluate(()=>HB.workflows.raw.find(l=>l.id==='RW-204A').available),2);
  await go('wax-release');await fill('waxReleaseEvidence','RAW-204-CHECKS');await f('waxReleaseChecked').check();await capture();await advance('wax-stock');
  assert.equal(await page.evaluate(()=>HB.workflows.raw.find(l=>l.id==='RW-204A').status),'Released for wax processing');
  await go('wax-inputs');await fill('take-RW-201','5');await blocked(/available/);await fill('take-RW-201','0');await fill('take-RW-204A','2');await capture();
  await advance('wax-process');await fill('waxLoss','1');await blocked(/equal/);await fill('waxLoss','0.1');
  await capture();await advance('wax-review');await advance('finished-wax');
  assert.deepEqual(await page.evaluate(()=>HB.workflows.raw.map(l=>l.available)),[4,2,0,3]);
  await go('wax-history');await capture();await go('wax-problem');await capture();
  // Purchase without supplier batch, g conversion, subsequent controlled eligibility.
  await go('ingredient-purchase');await f('ingredient').selectOption('Other');await blocked(/detail/i);
  await fill('ingredientOther','Ginger');await fill('purchaseQuantity','500');await f('purchaseUnit').selectOption('g');
  await capture();await advance('ingredient-purchase-review');await advance('ingredient-stock');
  assert.deepEqual(await page.evaluate(()=>{const l=HB.workflows.ingredients.at(-1);return [l.id,l.available,l.supplierBatch,l.eligible]}),['ING-103',0.5,'',false]);
  // A deliberate new purchase may have identical values; replaying a save is idempotent.
  await go('ingredient-purchase-review');await advance('ingredient-stock');assert.equal(await page.evaluate(()=>HB.workflows.ingredients.length),3);
  await advance('ingredient-purchase');await advance('ingredient-purchase-review');await advance('ingredient-stock');
  assert.equal(await page.evaluate(()=>HB.workflows.ingredients.at(-1).id),'ING-104');
  await go('ingredient-release');await fill('ingredientEvidence','ING-CHECK-103');await f('ingredientReleaseChecked').check();await advance('ingredient-stock');
  // Dropdowns start with one row; add/remove preserves only selected stock allocations.
  await go('infused-bottling');await blocked(/completion/);
  await go('infusion-honey');assert.equal(await page.locator('#phone select').count(),1);await blocked(/detail/i);
  await f('honeyChoice0').selectOption('H-108');await fill('honeyWeight0','30');await blocked(/available/);await fill('honeyWeight0','10');
  await page.locator('#phone [data-action="infusion-add-honey"]').click();
  assert.equal(await f('honeyChoice1').locator('option[value="H-108"]').count(),0);
  await f('honeyChoice1').selectOption('H-109');await fill('honeyWeight1','5');
  await page.locator('#phone [data-action="infusion-remove-honey-1"]').click();
  assert.equal(await page.evaluate(()=>HB.workflows.selectedInputs('honey').length),1);
  await page.locator('#phone [data-action="infusion-add-honey"]').click();await f('honeyChoice2').selectOption('H-109');await fill('honeyWeight2','5');await capture();
  await advance('infusion-ingredients');assert.equal(await page.locator('#phone select').count(),1);await blocked(/detail/i);
  await f('ingredientChoice0').selectOption('ING-101');await fill('ingredientWeight0','3');await blocked(/available/);await fill('ingredientWeight0','0.3');
  await page.locator('#phone [data-action="infusion-add-ingredient"]').click();await f('ingredientChoice1').selectOption('ING-102');await fill('ingredientWeight1','0.1');
  await page.locator('#phone [data-action="infusion-remove-ingredient-1"]').click();await capture();
  await advance('infusion-start');assert.equal(await f('infusionContainer').count(),0);await capture();
  await advance('infusion-review');await advance('infusion-bucket-label');
  const bucketLabel=await page.evaluate(()=>HB.state.infusion.bucketLabel);
  assert.equal(bucketLabel,'Shea Grove honey + River apiary honey · Vanilla · 2026-10-27');
  await advance('infusing-stock');assert.equal(await page.evaluate(()=>HB.state.infusion.labelWritten),true);
  assert.deepEqual(await page.evaluate(()=>HB.workflows.ingredients.slice(0,2).map(l=>Number(l.available.toFixed(2)))),[1.7,1]);
  assert.deepEqual(await page.evaluate(()=>HB.workflows.honey.map(l=>l.available)),[19.5,5]);
  await go('ingredient-stock');await capture();
  await go('infused-bottling');await blocked(/completion/);
  await go('infusion-checks');await capture();
  assert.deepEqual(await page.evaluate(()=>HB.workflows.checkSchedule().map(c=>[c.day,c.due])),[[7,'2026-11-03'],[14,'2026-11-10'],[21,'2026-11-17'],[28,'2026-11-24']]);
  async function recordCheck(day,date){
    await go('infusion-checks');await page.locator(`#phone [data-action="infusion-check-new-${day}"]`).click();await here('infusion-check-record');
    await blocked(/detail/i);await fill('infusionCheckAt',`${date}T10:00`);
    await f('infusionVisualCheck').check();await f('infusionStirred').selectOption('Stirred');
    await f('infusionFermentation').selectOption(day===14?'Uncertain':'No signs observed');
    if(day===14)await fill('infusionCheckNotes','Observation needs a quality-owner review.');
    await fill('infusionMoisture','18.4');await fill('infusionInstrument','METER-02');
    if(day===7){
      await fill('infusionCheckAt','2026-11-02T10:00');await blocked(/scheduled date/);await fill('infusionCheckAt',`${date}T10:00`);
      await fill('infusionMoisture','101');await blocked(/value|percentage/);await fill('infusionMoisture','18.4');
      await f('infusionStirred').selectOption('Not stirred');await blocked(/detail/i);await fill('infusionStirReason','Not yet stirred while observations were being recorded.');await f('infusionStirred').selectOption('Stirred');
      await capture();
    }
    await advance('infusion-check-review');await advance('infusion-checks');
    const saved=await page.evaluate(()=>JSON.stringify(HB.state.infusion.checks));
    await go('infusion-check-review');await advance('infusion-checks');assert.equal(await page.evaluate(()=>JSON.stringify(HB.state.infusion.checks)),saved);
  }
  await recordCheck(7,'2026-11-03');await recordCheck(14,'2026-11-10');await recordCheck(21,'2026-11-17');
  assert.equal(await page.evaluate(()=>HB.state.infusion.checks.length),3);
  assert.equal(await page.evaluate(()=>HB.state.infusion.released||false),false);
  await go('infusion-finish');await fill('infusionEnd','2026-10-26T10:00');await blocked(/precede/);await fill('infusionEnd','2026-11-24T17:00');
  await fill('infusionProduct','16');await blocked(/account/);await fill('infusionProduct','15');
  await capture();await advance('infusion-finish-review');await advance('infusion-completed');
  await go('infused-bottling');await blocked(/quality release/);
  await go('infusion-release');await fill('infusionFollowupEvidence','QA-INF-201-FOLLOWUP');await f('infusionConcernsResolved').check();await blocked(/missing/);
  await recordCheck(28,'2026-11-24');
  await go('infusion-release');await f('infusionConcernsResolved').uncheck();await blocked(/concerns/);await f('infusionConcernsResolved').check();
  await blocked(/confirm/);await f('infusionReleaseChecked').check();await advance('infusion-completed');
  await go('infused-bottling');await fill('infusedBottleInput','16');await blocked(/available/);await fill('infusedBottleInput','15');await fill('infusedBottleDate','2026-11-25');
  await capture();await advance('infused-bottling-review');await advance('infused-label');
  assert.equal(await page.evaluate(()=>Number(HB.state.infusion.available.toFixed(2))),0.9);
  await advance('infused-packaging');await f('infusedPackagingChecked').check();await advance('infused-publication');
  await f('infusedPublicationChecked').check();await capture();await advance('public-infused');
  let publicText=await page.locator('#phone').innerText();assert.match(publicText,/Vanilla — used for infusion, then removed/);assert.ok(!publicText.includes('Rosemary'));assert.ok(!publicText.includes('METER-02'));
  for(const privateValue of ['Ark Organics','ING-101','INV-101','Alex Example','+256700000010','+256700000011'])assert.ok(!publicText.includes(privateValue),privateValue);
  await go('infusion-history');await capture();assert.match(await page.locator('#phone').innerText(),/HB-7K2M/);assert.match(await page.locator('#phone').innerText(),/ING-101/);
  await go('ingredient-impact');await capture();assert.match(await page.locator('#phone').innerText(),/HB-261028-I/);
  await f('problemIngredient').selectOption('ING-103');assert.match(await page.locator('#phone').innerText(),/No downstream use/);
  // Re-entering committed flows cannot consume a second time or change facts.
  const before=await page.evaluate(()=>JSON.stringify({infusion:HB.state.infusion,raw:HB.workflows.raw,ingredients:HB.workflows.ingredients}));
  for(const id of ['extraction-review','wax-review','infusion-review','infusion-finish-review','infused-bottling-review']){await go(id);await primary();}
  assert.equal(await page.evaluate(()=>JSON.stringify({infusion:HB.state.infusion,raw:HB.workflows.raw,ingredients:HB.workflows.ingredients})),before);
  // A saved collection cannot be rewritten through the original wizard.
  await go('collection-review');await advance('collection-saved');await go('collection-weight');await blocked(/authorized amendment/);
  // Alternative recipient needs explicit farmer approval (new isolated session).
  await page.goto(url);await go('receipt-confirm');await f('receiptMethod').selectOption('WhatsApp');await advance('receipt-delivery');
  assert.equal(await f('recipientNumber').inputValue(),'');await page.locator('#phone [data-field="recipientKind"][value="alternative"]').check();
  await fill('recipientNumber','+256700000012');await f('receiptDestinationConfirmed').check();await blocked(/approved/);
  await f('recipientApproval').check();await advance('receipt-delivery-status');assert.equal(await page.evaluate(()=>HB.state.receiptRequest.channel),'WhatsApp');
  assert.deepEqual(errors,[]);
  console.log('Workflow checks passed: holder names, amendments/cancellation, both receipt channels/retry, wax, purchase balances, dropdown selection, suggested bucket labels, weekly checks, infusion/release/bottling, lineage and public privacy.');

  if(exporting){
    if(failedDeliverySnapshot)snapshots.set('receipt-delivery-status',failedDeliverySnapshot);
    await mkdir(out,{recursive:true});
    let inventory='# Mobile UI screen inventory\n\nGenerated by `npm run reference:export`. Stable screen IDs are retained; display numbers follow journey order.\n\n';
    for(const [key,n,title] of metadata.groups){inventory+=`## ${n}. ${title}\n\n| # | Screen | Role | Next action |\n| --- | --- | --- | --- |\n`;for(const s of metadata.screens.filter(s=>s.group===key)){inventory+=`| ${String(metadata.screens.indexOf(s)+1).padStart(3,'0')} | [${s.title}](../public/design/mobile-ui/index.html#${s.id}) | ${s.role} | ${s.label||'Choose a task'} |\n`;}inventory+='\n';}
    await writeFile(resolve(root,'docs/mobile-ui-screen-inventory.md'),inventory);
    const styles=await readFile(resolve(root,'public/design/mobile-ui/styles.css'),'utf8');
    const escape=v=>v.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
    const artifact=await browser.newPage({viewport:{width:1440,height:1100}});
    const gallery=(items)=>items.map(s=>`<section class="export-page"><div class="export-caption">${String(metadata.screens.indexOf(s)+1).padStart(3,'0')} · ${escape(s.title)}<small>${s.id}</small></div><div class="export-frame">${snapshots.get(s.id)}</div></section>`).join('');
    const full=metadata.screens.map(s=>{assert.ok(snapshots.has(s.id),s.id);return s});
    await artifact.setContent(`<title>Humble Beeing · Mobile workflow reference</title><style>${styles}\nbody{margin:0;background:white}.export-page{height:1096px;width:770px;position:relative;break-after:page;overflow:hidden;box-sizing:border-box;padding:16px}.export-caption{font-size:16px;font-weight:600;line-height:1.4;margin-bottom:12px}.export-caption small{display:block;font-size:11px;color:#657369}.export-frame{width:390px;margin:auto;transform-origin:top center}.export-frame .phone{height:auto!important;min-height:0!important;overflow:visible!important;border-width:2px;border-radius:20px;box-shadow:none}.export-frame .app-scroll{overflow:visible;flex:none}.export-frame .phone-status{display:flex}.export-frame .app-content{padding-bottom:24px}@media print{@page{size:A4;margin:3mm}.export-page{break-inside:avoid}.export-frame .phone{width:390px}.export-caption{display:block}}</style>${gallery(full)}`);
    await artifact.evaluate(()=>document.querySelectorAll('.export-page').forEach(el=>{const frame=el.querySelector('.export-frame');const room=el.clientHeight-el.querySelector('.export-caption').offsetHeight-45;const scale=Math.min(1,room/frame.offsetHeight);frame.style.transform=`scale(${scale})`;}));
    await artifact.pdf({path:resolve(out,'mobile-ui-all-screens.pdf'),printBackground:true,preferCSSPageSize:true});
    const info=execFileSync('pdfinfo',[resolve(out,'mobile-ui-all-screens.pdf')],{encoding:'utf8'});
    assert.equal(Number(info.match(/Pages:\s+(\d+)/)[1]),metadata.screens.length,'one PDF page per screen');
    // Individual first-view screenshots from the reviewed step snapshots.
    const shots=['field-home','register-farmer','collection-weight','bucket-labels','hq-home','stock-item','bottling-details','public-batch','profile-contact','receipt-delivery','receipt-delivery-status','amendment-review','raw-wax-storage','wax-review','finished-wax','ingredient-stock','infusion-honey','infusion-ingredients','infusion-start','infusion-bucket-label','infusing-stock','infusion-checks','infusion-check-record','infusion-check-review','infusion-finish-review','public-infused'];
    for(const id of shots){await artifact.setContent(`<style>${styles}body{margin:0;background:#edf0e6;padding:20px}.phone{margin:auto}</style>${snapshots.get(id)}`);await artifact.locator('.phone').screenshot({path:resolve(out,`${id}.png`)});}
    const overview=['infusion-honey','infusion-ingredients','infusion-start','infusion-bucket-label','infusing-stock','infusion-checks','infusion-check-record','public-infused'];
    await artifact.setViewportSize({width:1740,height:1900});await artifact.setContent(`<style>${styles}body{padding:28px;background:#edf0e6}.overview{display:grid;grid-template-columns:repeat(4,390px);gap:28px}.tile>p{height:34px;margin:0 0 10px;font-size:15px;font-weight:600}.phone{box-shadow:none}</style><div class="overview">${overview.map(id=>`<div class="tile"><p>${escape(metadata.screens.find(s=>s.id===id).title)}</p>${snapshots.get(id)}</div>`).join('')}</div>`);await artifact.screenshot({path:resolve(out,'journey-overview.png'),fullPage:true});
    await page.goto(url);await page.setViewportSize({width:1440,height:1100});await go('production-home');await page.screenshot({path:resolve(out,'desktop-reference.png'),fullPage:true});
    await page.setViewportSize({width:390,height:1000});await go('profile-contact');await page.screenshot({path:resolve(out,'mobile-reference.png'),fullPage:true});
    await artifact.close();
    console.log(`Exported inventory, screenshots and verified ${metadata.screens.length}-page PDF.`);
  }
} finally {await browser.close();}
