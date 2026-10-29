'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BookOpenCheck, CheckCircle2, ClipboardCheck, Download, FileCheck2, FileText, Info, UploadCloud } from 'lucide-react';
import { demoForms, demoRequirements, demoSops } from './mock-data';
import { Field, ModePill, PageIntro, Panel, StatusBadge } from './ui';

const tabs = [
  { id: 'forms', label: 'Forms & evidence' },
  { id: 'sops', label: 'SOP library' },
  { id: 'requirements', label: 'Requirements register' },
];

function FormsTab() {
  const [selectedForm, setSelectedForm] = useState(demoForms[0]);
  const [fileName, setFileName] = useState('');
  const [saved, setSaved] = useState(false);

  function submitEvidence(event) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <div className="two-column">
      <Panel title="Controlled form library" description="Current A4 templates are presented here for printing. Historical versions remain read-only for audit.">
        <div className="doc-list">
          {demoForms.map((form) => (
            <div className={`doc-row ${selectedForm.code === form.code ? 'doc-row-selected' : ''}`} key={form.title}>
              <span className="doc-icon"><FileText aria-hidden="true" size={16} /></span>
              <Button className="doc-select" type="button" onClick={() => { setSelectedForm(form); setSaved(false); }} aria-pressed={selectedForm.code === form.code}>
                <span className="doc-copy"><strong>{form.title}</strong><span>{form.code} · {form.version} · {form.pages} · review {form.review}</span></span>
              </Button>
              <Button className="small-button" type="button" onClick={() => setSaved(false)}><Download aria-hidden="true" size={13} /> A4</Button>
            </div>
          ))}
        </div>
        <p className="muted-copy" style={{ fontSize: '0.66rem', margin: '0.9rem 0 0' }}>The linked PDF files are not bundled in this demo. Download and print wiring will use the controlled-document asset endpoint.</p>
      </Panel>

      <Panel title="Capture completed paper record" description={`Selected form: ${selectedForm.title} · ${selectedForm.version}`}>
        <form onSubmit={submitEvidence}>
          <div className="callout" role="note" style={{ marginBottom: '1rem' }}><Info aria-hidden="true" size={15} /><span><strong>Paper remains authoritative.</strong> Upload the original-resolution photo or PDF as a retrievable evidence copy; never overwrite an earlier upload.</span></div>
          <div className="form-grid">
            <Field label="Form type" htmlFor="evidence-form" required><NativeSelect id="evidence-form" value={selectedForm.code} onChange={(event) => { const next = demoForms.find((form) => form.code === event.target.value); if (next) setSelectedForm(next); setSaved(false); }}><NativeSelectOption value={selectedForm.code}>{selectedForm.title} · {selectedForm.version}</NativeSelectOption>{demoForms.filter((form) => form.code !== selectedForm.code).map((form) => <NativeSelectOption value={form.code} key={form.title}>{form.title} · {form.version}</NativeSelectOption>)}</NativeSelect></Field>
            <Field label="Completion date" htmlFor="evidence-date" required><Input id="evidence-date" type="date" defaultValue="2026-09-03" required /></Field>
            <Field label="Responsible person" htmlFor="evidence-person" required><Input id="evidence-person" defaultValue="Amina M. · demo" required /></Field>
        <Field label="Batch / lot link" htmlFor="evidence-batch" hint="Optional when the form is not batch-specific."><Input id="evidence-batch" placeholder="e.g. HB-26-0042" /></Field>
            <div className="field field-full">
              <Label htmlFor="evidence-file">Original upload <span className="required-mark" aria-hidden="true"> *</span></Label>
              <div className="file-drop"><span className="file-drop-icon"><UploadCloud aria-hidden="true" size={19} /></span><p><Label htmlFor="evidence-file">Choose a photo or PDF</Label> of the signed paper record.</p><small>Original-resolution upload · page order retained · private evidence in production</small><Input className="sr-only" id="evidence-file" type="file" accept="image/*,.pdf" onChange={(event) => { setFileName(event.target.files?.[0]?.name || ''); setSaved(false); }} required />{fileName ? <p className="file-name" role="status">Selected: {fileName}</p> : null}</div>
            </div>
            <Field label="Evidence note" htmlFor="evidence-note" className="field-full"><Textarea id="evidence-note" placeholder="Describe the pages or any legibility issue without altering the original." /></Field>
          </div>
          <div className="form-actions">{saved ? <span className="form-status" role="status"><CheckCircle2 aria-hidden="true" size={14} /> Evidence metadata staged locally</span> : <span className="form-status muted-form-status">Reviewer can verify or request a clearer upload</span>}<Button className="primary-button" type="submit"><FileCheck2 aria-hidden="true" size={15} /> Save evidence metadata</Button></div>
        </form>
      </Panel>
    </div>
  );
}

function SopsTab() {
  const [notice, setNotice] = useState('');
  const current = demoSops.filter((sop) => sop.status !== 'Historical');
  return (
    <div className="two-column">
      <Panel title="Current controlled guidance" description="Only effective documents are prominent to production staff. Licensed source standards are not displayed here.">
        <div className="doc-list">
          {current.map((sop) => (
            <div className="doc-row" key={`${sop.code}-${sop.version}`}>
              <span className="doc-icon"><BookOpenCheck aria-hidden="true" size={16} /></span>
              <span className="doc-copy"><strong>{sop.title}</strong><span>{sop.code} · {sop.version} · owner {sop.owner} · effective {sop.effective} · review {sop.review}</span></span>
              <div className="doc-actions"><StatusBadge tone={sop.tone}>{sop.status}</StatusBadge><Button className="small-button" type="button" onClick={() => setNotice(`${sop.code} ${sop.version} opened in demo mode.`)}>Open</Button></div>
            </div>
          ))}
        </div>
        {notice ? <p className="inline-success" role="status"><CheckCircle2 aria-hidden="true" size={14} /> {notice}</p> : null}
      </Panel>

      <Panel title="Document controls" description="Version, approval and acknowledgement history are separate from practical training records.">
        <div className="list-stack">
          <div className="list-row"><div className="list-row-main"><strong>Approval before effective date</strong><p>A quality manager approves a revision, then the new version supersedes the former one.</p></div><StatusBadge tone="success">Required</StatusBadge></div>
          <div className="list-row"><div className="list-row-main"><strong>Staff acknowledgement</strong><p>Record who read a required SOP and when. Acknowledgement is not proof of practical competence.</p></div><StatusBadge tone="info">Tracked</StatusBadge></div>
          <div className="list-row"><div className="list-row-main"><strong>Review due 06 Sep 2026</strong><p>QC-003 needs an owner review before its next effective period.</p></div><StatusBadge tone="warning">Action</StatusBadge></div>
        </div>
        <div className="callout" style={{ marginTop: '1rem' }}><Info aria-hidden="true" size={15} /><span><strong>Production note.</strong> Staff guidance helps with retrieval and status language; it does not replace the controlled SOP or HACCP record.</span></div>
      </Panel>

      <Panel title="Document history" description="Superseded versions stay available to authorized staff and auditors." className="full-span-panel">
        <div className="table-wrap"><Table className="v1-table"><TableHeader><TableRow><TableHead>Document</TableHead><TableHead>Version</TableHead><TableHead>Owner / approver</TableHead><TableHead>Effective</TableHead><TableHead>State</TableHead><TableHead>Action</TableHead></TableRow></TableHeader><TableBody>{demoSops.map((sop) => <TableRow key={`${sop.title}-${sop.version}`}><TableCell><strong>{sop.title}</strong></TableCell><TableCell>{sop.version}</TableCell><TableCell><span className="table-secondary">{sop.owner} / {sop.approver}</span></TableCell><TableCell>{sop.effective}</TableCell><TableCell><StatusBadge tone={sop.tone}>{sop.status}</StatusBadge></TableCell><TableCell><Button className="small-button" type="button" onClick={() => setNotice(`${sop.code} history is read-only in demo mode.`)}>View history</Button></TableCell></TableRow>)}</TableBody></Table></div>
      </Panel>
    </div>
  );
}

function RequirementsTab() {
  return (
    <div>
      <div className="callout" role="note" style={{ marginBottom: '1rem' }}><Info aria-hidden="true" size={15} /><span><strong>Operational register, not certification.</strong> This workspace summarizes controls and evidence links. The quality owner must review source editions, applicability and limits before release decisions depend on them.</span></div>
      <div className="requirement-grid">
        {demoRequirements.map((requirement) => <Card className="compliance-card" role="article" key={requirement.source}><div className="compliance-card-top"><div><p className="eyebrow">{requirement.source}</p><h3>{requirement.title}</h3></div><StatusBadge tone={requirement.tone}>{requirement.status}</StatusBadge></div><p>Evidence: {requirement.evidence}</p><div className="compliance-meta"><span>Owner: {requirement.owner}</span><span>Frequency: {requirement.cadence}</span></div></Card>)}
      </div>
    </div>
  );
}

export default function OperationsPage() {
  const [activeTab, setActiveTab] = useState('forms');

  useEffect(() => {
    const requestedTab = new URLSearchParams(window.location.search).get('tab');
    if (tabs.some((tab) => tab.id === requestedTab)) setActiveTab(requestedTab);
  }, []);

  function changeTab(tab) {
    setActiveTab(tab);
    window.history.replaceState({}, '', `/staff/operations?tab=${tab}`);
  }

  return (
    <div>
      <PageIntro eyebrow="Operations & compliance" title="Keep the floor record moving." description="Print the current controlled forms, capture completed paper evidence and retrieve the SOP and requirements register in one workspace." actions={<ModePill />} />
      <div className="callout" role="note" style={{ marginBottom: '1.15rem' }}><ClipboardCheck aria-hidden="true" size={15} /><span><strong>Demo/local mode.</strong> PDFs, private asset upload, document approval and staff permissions are placeholders until the server adapters are wired.</span></div>
      <Tabs value={activeTab} onValueChange={changeTab}>
        <TabsList variant="line" className="tab-list" aria-label="Operations workspace tabs">
          {tabs.map((tab) => <TabsTrigger value={tab.id} className="tab-button" key={tab.id}>{tab.label}</TabsTrigger>)}
        </TabsList>
        <TabsContent value="forms"><FormsTab /></TabsContent>
        <TabsContent value="sops"><SopsTab /></TabsContent>
        <TabsContent value="requirements"><RequirementsTab /></TabsContent>
      </Tabs>
      <div style={{ marginTop: '1.15rem' }}><Link className="back-link" href="/staff">← Back to overview</Link></div>
    </div>
  );
}
