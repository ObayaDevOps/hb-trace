import {readFileSync, existsSync} from 'node:fs';
import {resolve, dirname, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import ts from 'typescript';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const readCache = new Map();
const read = p => {if (!readCache.has(p)) readCache.set(p,readFileSync(resolve(root,p),'utf8')); return readCache.get(p);};
export const hash = text => createHash('sha256').update(text).digest('hex');
const astCache = new Map();
export function codeText(ref) {
  const text = read(ref.path);
  if (!ref.symbol && !ref.screen && !ref.screenPatch) return text;
  let cached = astCache.get(ref.path);
  if (!cached || cached.text !== text) {
    const ast = ts.createSourceFile(ref.path, text, ts.ScriptTarget.Latest, true, ref.path.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    const entries = new Map();
    const add = (key,node) => entries.set(key,[...(entries.get(key)||[]),node.getText(ast)]);
    function visit(node) {
      if (ts.isCallExpression(node) && node.arguments[0]?.text) {
        const name=node.expression.getText(ast);
        if (name==='screen') add('screen:'+node.arguments[0].text,node);
        if (['change','append'].includes(name)) add('patch:'+node.arguments[0].text,node);
      }
      if (node.name && (ts.isDeclarationStatement(node) || ts.isVariableDeclaration(node) || ts.isMethodDeclaration(node))) add('symbol:'+node.name.getText(ast),node);
      ts.forEachChild(node,visit);
    }
    visit(ast);cached={text,entries};astCache.set(ref.path,cached);
  }
  const matches=cached.entries.get(ref.screenPatch ? 'patch:'+ref.screenPatch : ref.screen ? 'screen:'+ref.screen : 'symbol:'+ref.symbol);
  if (!matches?.length) throw Error(`Missing selector ${ref.path} :: ${ref.screen || ref.symbol}`);
  return matches.join('\n');
}
function requirementText(id, sources) {
  const r = sources.requirements[id];
  if (!r) throw Error(`Unknown requirement ${id}`);
  const text = read(r.path);
  const start = `<!-- requirement:${id} -->`, end = `<!-- /requirement:${id} -->`;
  if (text.split(start).length !== 2 || text.split(end).length !== 2) throw Error(`Missing/ambiguous block ${id}`);
  const from = text.indexOf(start) + start.length, to = text.indexOf(end);
  if (to < from) throw Error(`Reversed block ${id}`);
  return text.slice(from, to).trim();
}
function load() {
  return [JSON.parse(read('docs/implementation/manifest.json')), JSON.parse(read('docs/implementation/source-map.json')), JSON.parse(read('docs/implementation/coverage.json'))];
}
function briefing(task, manifest, sources) {
  return [read(manifest.worker), read(task.path),
    ...task.requirements.map(id => `\n## ${id} — ${sources.requirements[id]?.path}\n${requirementText(id, sources)}`),
    ...task.screens.map(id => `\n## Screen ${id}\n${read(manifest.screens[id].path)}`)
  ].join('\n');
}
export function validate(manifest, sources, coverage) {
  readCache.clear(); // One consistent file snapshot per read-only validation pass.
  const errors=[], attempt=fn=>{try {fn();} catch(e) {errors.push(e.message);}};
  if (hash(read(manifest.worker))!==manifest.workerHash) errors.push('Changed common worker instructions; review baseline');
  const seenRequirements=new Set();
  for (const path of new Set(sources.sections.map(s=>s.path))) attempt(()=>{
    for (const match of read(path).matchAll(/<!-- requirement:([^ ]+) -->/g)) {
      const id=match[1];
      if (seenRequirements.has(id)) throw Error(`Duplicate requirement ${id}`);
      if (!sources.requirements[id]) throw Error(`Uncatalogued requirement ${id}`);
      seenRequirements.add(id);
    }
  });
  for (const id of Object.keys(coverage.requirements)) if (!sources.requirements[id]) errors.push(`Unknown coverage requirement ${id}`);
  const tasks = new Map();
  for (const task of manifest.tasks) {
    if (tasks.has(task.id)) errors.push(`Duplicate task ${task.id}`);
    tasks.set(task.id,task);
  }
  const visiting=new Set(), done=new Set();
  function visit(id) {
    if (visiting.has(id)) throw Error(`Dependency cycle at ${id}`);
    if (done.has(id)) return;
    const t=tasks.get(id); if (!t) throw Error(`Missing task ${id}`);
    visiting.add(id); t.dependencies.forEach(visit); visiting.delete(id); done.add(id);
  }
  for (const [id,r] of Object.entries(sources.requirements)) attempt(()=>{
    if (hash(requirementText(id,sources))!==r.sha256) throw Error(`Changed authoritative block ${id}; review dependent task fingerprints`);
    if (!coverage.requirements[id]?.length) throw Error(`Unmapped requirement ${id}`);
    for (const owner of coverage.requirements[id]) {
      const task=tasks.get(owner);
      if (!task || !task.requirements.includes(id)) throw Error(`Coverage mismatch ${id} -> ${owner}`);
    }
  });
  const inventory=[...read('docs/mobile-ui-screen-inventory.md').matchAll(/index\.html#([^)]*)\)/g)].map(m=>m[1]);
  for (const id of inventory) attempt(()=>{
    const owner=coverage.screens[id];
    if (!manifest.screens[id] || !tasks.get(owner)?.screens.includes(id)) throw Error(`Unmapped screen ${id}`);
  });
  for (const [id,s] of Object.entries(manifest.screens)) attempt(()=>{
    if (!inventory.includes(id)) throw Error(`Unknown screen ${id}`);
    if (hash(read(s.path))!==s.sha256) throw Error(`Changed screen packet ${id}`);
    if (hash(codeText(s.code))!==s.code.sha256 || (s.overrides||[]).some(r=>hash(codeText(r))!==r.sha256)) throw Error(`Stale screen reference ${id}`);
  });
  for (const task of manifest.tasks) attempt(()=>{
    visit(task.id);
    if (!['planned','ready','active','blocked','accepted','stale'].includes(task.status)) throw Error(`Invalid status ${task.id}`);
    if (hash(read(task.path))!==task.sha256) throw Error(`Changed task packet ${task.id}; review fingerprint`);
    if (new Set(task.requirements).size!==task.requirements.length) throw Error(`Duplicate references ${task.id}`);
    for (const id of task.requirements) {
      if (task.sourceHashes[id]!==hash(requirementText(id,sources))) throw Error(`Stale task ${task.id}: ${id}`);
      if (!coverage.requirements[id]?.includes(task.id)) throw Error(`Reverse coverage missing ${task.id}: ${id}`);
    }
    for (const ref of task.code) if (hash(codeText(ref))!==ref.sha256) throw Error(`Stale code reference ${task.id}: ${ref.path} :: ${ref.symbol||'file'}`);
    for (const d of task.decisions) {
      const path=`docs/implementation/decisions/${d}.md`;
      if (!existsSync(resolve(root,path))) throw Error(`Missing decision ${d}`);
      if (task.decisionHashes[d]!==hash(read(path))) throw Error(`Stale decision ${task.id}: ${d}`);
    }
    if (task.status==='active') {
      const dispatch=JSON.parse(read(`docs/implementation/state/tasks/${task.id}.dispatch.json`));
      if (dispatch.taskId!==task.id || !dispatch.allowedFiles?.length || !dispatch.files?.length) throw Error(`Incomplete dispatch ${task.id}`);
      if (!Number.isFinite(dispatch.extraContextBytes) || dispatch.extraContextBytes<0) throw Error(`Missing context accounting ${task.id}`);
      for (const id of task.requirements) if (dispatch.requirements?.[id]!==hash(requirementText(id,sources))) throw Error(`Stale dispatch requirement ${task.id}: ${id}`);
      for (const field of ['files','decisions','prerequisites','interfaceExcerpts']) {
        if (!Array.isArray(dispatch[field])) throw Error(`Missing dispatch ${field}: ${task.id}`);
        for (const ref of dispatch[field]) if (hash(read(ref.path))!==ref.sha256) throw Error(`Stale dispatch ${task.id}: ${ref.path}`);
      }
      for (const d of task.decisions) if (!dispatch.decisions.some(r=>r.path===`docs/implementation/decisions/${d}.md`)) throw Error(`Missing dispatch decision ${task.id}: ${d}`);
      for (const id of task.dependencies) {
        const prerequisite=tasks.get(id);
        if (prerequisite?.status!=='accepted' || !dispatch.prerequisites.some(r=>r.path===prerequisite.evidence)) throw Error(`Missing accepted dispatch prerequisite ${task.id}: ${id}`);
      }
      if (Buffer.byteLength(briefing(task,manifest,sources))+dispatch.extraContextBytes>manifest.budgets.briefingBytes && !task.budgetException) throw Error(`Dispatch context too large ${task.id}`);
    }
    if (task.screens.length>3 && !task.budgetException) throw Error(`Too many screens ${task.id}`);
    if (read(task.path).split(/\s+/).length>manifest.budgets.taskWords && !task.budgetException) throw Error(`Task instructions too long ${task.id}`);
    const bytes=Buffer.byteLength(briefing(task,manifest,sources));
    if (bytes>manifest.budgets.briefingBytes && !task.budgetException) throw Error(`Briefing too large ${task.id}: ${bytes} bytes`);
    if (task.status==='accepted') {
      if (!task.evidence || !existsSync(resolve(root, task.evidence))) throw Error(`Missing acceptance evidence ${task.id}`);
      if (task.dependencies.some(id=>tasks.get(id)?.status!=='accepted')) throw Error(`Unaccepted prerequisite ${task.id}`);
    }
  });
  if (read(manifest.worker).split(/\s+/).length>manifest.budgets.workerWords) errors.push('Common worker instructions too long');
  if (read('docs/implementation/state/current.md').split(/\s+/).length>1000) errors.push('Coordinator checkpoint too long');
  // Only maintained planning/specification Markdown: no broad repository scan.
  const pages=new Set([manifest.worker, ...manifest.tasks.map(t=>t.path), ...Object.values(sources.requirements).map(r=>r.path), ...sources.originals.map(o=>o.path), ...manifest.documents]);
  for (const p of pages) attempt(()=>{
    for (const m of read(p).matchAll(/\]\(([^\s)]+)\)/g)) {
      const url=m[1]; if (/^[a-z]+:/i.test(url)) continue;
      const [file,anchor]=url.split('#'); const target=file ? resolve(root,dirname(p),file) : resolve(root,p);
      if (!existsSync(target)) throw Error(`Broken link ${p}: ${url}`);
      if (anchor && target.endsWith('.md')) {
        const content=readFileSync(target,'utf8');
        const anchors=[...content.matchAll(/^#{1,6} (.+)$/gm)].map(x=>x[1].toLowerCase().replace(/[^\p{L}\p{N}_\- ]/gu,'').replaceAll(' ','-'));
        if (!anchors.includes(anchor) && !content.includes(`id="${anchor}"`)) throw Error(`Broken anchor ${p}: ${url}`);
      }
    }
  });
  return errors;
}
function main() {
  const [manifest,sources,coverage]=load(); const [command,id]=process.argv.slice(2);
  if (command==='check') {
    const errors=validate(manifest,sources,coverage);
    if (errors.length) {console.error(errors.join('\n')); process.exitCode=1; return;}
    console.log(`Planning checks passed: ${manifest.tasks.length} tasks, ${Object.keys(sources.requirements).length} requirement blocks, ${Object.keys(manifest.screens).length} screens. No application tests run.`);
  } else if (command==='task') {
    const task=manifest.tasks.find(t=>t.id===id); if (!task) throw Error(`Unknown task ${id}`);
    if (hash(read(manifest.worker))!==manifest.workerHash) throw Error('Changed worker instructions');
    for (const d of task.decisions) if (task.decisionHashes[d]!==hash(read(`docs/implementation/decisions/${d}.md`))) throw Error(`Stale decision ${d}`);
    // Refuse stale selected content without flooding the worker with unrelated packets.
    for (const rid of task.requirements) if (task.sourceHashes[rid]!==hash(requirementText(rid,sources))) throw Error(`Stale requirement ${rid}; coordinator review required`);
    for (const ref of task.code) if (hash(codeText(ref))!==ref.sha256) throw Error(`Stale code reference ${ref.path}`);
    if (hash(read(task.path))!==task.sha256) throw Error(`Changed task packet ${id}`);
    for (const sid of task.screens) {
      const s=manifest.screens[sid];
      if (hash(read(s.path))!==s.sha256 || hash(codeText(s.code))!==s.code.sha256 || (s.overrides||[]).some(r=>hash(codeText(r))!==r.sha256)) throw Error(`Stale screen ${sid}`);
    }
    const text=briefing(task,manifest,sources);
    if (Buffer.byteLength(text)>manifest.budgets.briefingBytes && !task.budgetException) throw Error('Briefing exceeds context budget');
    console.log(`Planning briefing only. Status: ${task.status}. Coordinator must verify prerequisites and decisions before dispatch.\n\n${text}`);
  } else if (command==='impact') {
    const affected=new Set(manifest.tasks.filter(t=>t.id===id || t.requirements.includes(id) || t.code.some(r=>r.path===id || r.symbol===id) || t.decisions.includes(id) || t.screens.includes(id)).map(t=>t.id));
    if (!affected.size) throw Error(`No matching task, requirement, decision, screen, code path or symbol: ${id}`);
    let size; do {size=affected.size; for (const t of manifest.tasks) if (t.dependencies.some(d=>affected.has(d))) affected.add(t.id);} while(size!==affected.size);
    console.log(manifest.tasks.filter(t=>affected.has(t.id)).map(t=>`${t.id}\t${t.title}`).join('\n'));
  } else throw Error('Use check, task <task-id>, or impact <requirement/task/decision/screen/code-path/symbol>');
}
if (process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try {main();} catch(e) {console.error(e.message); process.exitCode=1;}
}
