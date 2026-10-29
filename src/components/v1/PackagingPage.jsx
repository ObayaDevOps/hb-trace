import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { Eye, PackageCheck, QrCode, Send, ShieldCheck } from 'lucide-react';
import { demoPackagingRuns, demoPublicBatch } from './mock-data';
import PackagingForm from './PackagingForm';
import { ModePill, PageIntro, Panel, SectionHeader, StatusBadge } from './ui';

export default function PackagingPage() {
  return (
    <div>
      <PageIntro
        eyebrow="Packaging & publication"
        title="Turn a released lot into a public batch page."
        description="Link the product, source lot, package format and external code. Publication stays separate from operational facts and requires an approved snapshot."
        actions={<><ModePill /><Link className={buttonVariants({ variant: 'outline', className: 'secondary-button' })} href="/verify"><Eye aria-hidden="true" size={15} /> Open public view</Link></>}
      />

      <div className="split-stat triple-stat" style={{ marginBottom: '1.15rem' }}>
        <Card className="mini-stat"><span>Runs this month</span><strong>9</strong><StatusBadge tone="success">7 closed</StatusBadge></Card>
        <Card className="mini-stat"><span>Awaiting publication</span><strong>2</strong><StatusBadge tone="warning">Needs approval</StatusBadge></Card>
        <Card className="mini-stat"><span>Active public pages</span><strong>18</strong><StatusBadge tone="info">Revision tracked</StatusBadge></Card>
      </div>

      <div className="two-column">
        <Panel title="New packaging run" description="Create a draft run and attach the batch/lot code to the released source material.">
          <PackagingForm />
        </Panel>
        <div className="dashboard-section">
          <Panel title="Publication gate" description="A public page is created from an immutable approved revision, not mutable operational tables.">
            <div className="pipeline">
              <div className="pipeline-step done"><span>1</span><div><strong>Packaging run committed</strong><small>Product, quantity, format and lot code recorded.</small></div><StatusBadge tone="success">Complete</StatusBadge></div>
              <div className="pipeline-step done"><span>2</span><div><strong>Quality disposition released</strong><small>Authorized reviewer confirms the source lot can move forward.</small></div><StatusBadge tone="success">Complete</StatusBadge></div>
              <div className="pipeline-step current"><span>3</span><div><strong>Public fields reviewed</strong><small>Regional location and approved evidence summary checked for privacy.</small></div><StatusBadge tone="warning">Review</StatusBadge></div>
              <div className="pipeline-step"><span>4</span><div><strong>Publication revision approved</strong><small>Freeze the public snapshot and retain its revision history.</small></div><StatusBadge tone="neutral">Pending</StatusBadge></div>
            </div>
            <div className="callout" style={{ marginTop: '1rem' }}><ShieldCheck aria-hidden="true" size={15} /><span><strong>No automatic claims.</strong> A quality result or uploaded certificate does not publish a consumer-facing claim by itself.</span></div>
          </Panel>

          <Panel title="Public preview" description="Sample rendering of the approved consumer-facing projection.">
            <div className="publication-preview">
              <div className="publication-preview-head"><span>HUMBLE BEEING · PUBLIC BATCH</span><QrCode aria-hidden="true" size={18} /></div>
              <div className="publication-preview-body"><p className="eyebrow">Approved batch snapshot</p><h3>{demoPublicBatch.code}</h3><p>{demoPublicBatch.product} · {demoPublicBatch.format}</p><div className="preview-facts"><div><span>Packed on</span><strong>{demoPublicBatch.packedOn}</strong></div><div><span>Source region</span><strong>{demoPublicBatch.region}</strong></div><div><span>Quality record</span><strong>Reviewed</strong></div><div><span>Revision</span><strong>03 · active</strong></div></div></div>
              <div className="preview-footer"><ShieldCheck aria-hidden="true" size={14} /> Shows whitelisted fields only · batch code, not individual jar</div>
            </div>
            <div className="form-actions" style={{ marginTop: '0.8rem' }}><Link className={buttonVariants({ variant: 'outline', className: 'secondary-button' })} href="/verify">Open sample page <Eye aria-hidden="true" size={15} /></Link><Button className="primary-button" type="button"><Send aria-hidden="true" size={15} /> Send for approval</Button></div>
          </Panel>
        </div>
      </div>

      <div style={{ marginTop: '1.15rem' }}>
        <Panel title="Packaging runs" description="Drafts and releases remain linked to their source material and publication revision." action={<Link className={buttonVariants({ variant: 'link', className: 'text-button' })} href="/staff/packaging?filter=all">View all <span aria-hidden="true">↗</span></Link>}>
          <div className="table-wrap">
            <Table className="v1-table">
              <TableHeader><TableRow><TableHead>Run</TableHead><TableHead>Batch / product</TableHead><TableHead>Format</TableHead><TableHead>Units</TableHead><TableHead>Packed</TableHead><TableHead>State</TableHead></TableRow></TableHeader>
              <TableBody>
                {demoPackagingRuns.map((run) => (
                  <TableRow key={run.id}><TableCell><strong>{run.id}</strong></TableCell><TableCell><span className="table-primary">{run.batch}</span><span className="table-secondary">{run.product}</span></TableCell><TableCell>{run.format}</TableCell><TableCell className="table-number">{run.units}</TableCell><TableCell>{run.packed}</TableCell><TableCell><StatusBadge tone={run.tone}>{run.state}</StatusBadge></TableCell></TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Panel>
      </div>

      <div style={{ marginTop: '1.15rem' }}><SectionHeader eyebrow="Identifier policy" title="One durable identity, many label presentations." description="A damaged label can be replaced without changing the internal batch identity. Public URLs continue to resolve through the code mapping." action={<Link className={buttonVariants({ variant: 'outline', className: 'secondary-button' })} href="/staff/material"><PackageCheck aria-hidden="true" size={15} /> View source lineage</Link>} /></div>
    </div>
  );
}

