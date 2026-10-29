import { Card } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { AlertTriangle, ClipboardCheck, FileWarning, ShieldAlert } from 'lucide-react';
import { demoQualityHolds, demoQualityReviews } from './mock-data';
import QualityReviewForm from './QualityReviewForm';
import { ModePill, PageIntro, Panel, SectionHeader, StatusBadge } from './ui';

export default function QualityPage() {
  return (
    <div>
      <PageIntro
        eyebrow="Quality & holds"
        title="Make the next decision visible."
        description="Record measurements, keep suspect lots contained and preserve the reason behind every release, hold or rejection."
        actions={<><ModePill /><Link className={buttonVariants({ variant: 'outline', className: 'secondary-button' })} href="/staff/operations?tab=forms"><FileWarning aria-hidden="true" size={15} /> Find evidence</Link></>}
      />

      <div className="split-stat triple-stat" style={{ marginBottom: '1.15rem' }}>
        <Card className="mini-stat"><span>Open holds</span><strong>2</strong><StatusBadge tone="danger">1 due today</StatusBadge></Card>
        <Card className="mini-stat"><span>Measurements this week</span><strong>21</strong><StatusBadge tone="success">18 reviewed</StatusBadge></Card>
        <Card className="mini-stat"><span>Open non-conformances</span><strong>3</strong><StatusBadge tone="warning">2 investigating</StatusBadge></Card>
      </div>

      <div className="two-column">
        <Panel title="Hold queue" description="Held material cannot be allocated, packed or published until disposition changes are authorized." action={<Link className={buttonVariants({ variant: 'link', className: 'text-button' })} href="/staff/quality?filter=holds">View all holds <span aria-hidden="true">↗</span></Link>}>
          {demoQualityHolds.map((hold) => (
            <Card className="hold-card" role="article" key={hold.id}>
              <div className="hold-card-top"><h3>{hold.material} <span className="table-secondary">{hold.id}</span></h3><StatusBadge tone={hold.tone}>Held</StatusBadge></div>
              <p>{hold.reason}</p>
              <div className="hold-card-foot"><small>Opened {hold.opened} · owner {hold.owner}</small><Link className={buttonVariants({ variant: 'outline', size: 'sm', className: 'small-button' })} href={`/staff/quality?hold=${hold.id}`}>Open hold</Link></div>
            </Card>
          ))}
          <div className="callout" style={{ marginTop: '0.9rem' }}><ShieldAlert aria-hidden="true" size={15} /><span><strong>Containment rule.</strong> A source concern flags affected material for investigation; it does not automatically assign fault to a farmer, apiary or region.</span></div>
        </Panel>

        <Panel title="Record a quality review" description="Stage a measurement and proposed disposition against a physical lot.">
          <QualityReviewForm />
        </Panel>
      </div>

      <div style={{ marginTop: '1.15rem' }}>
        <Panel title="Recent quality records" description="Measurements, rule context and review state remain separate from publication claims.">
          <div className="table-wrap">
            <Table className="v1-table">
              <TableHeader><TableRow><TableHead>Lot</TableHead><TableHead>Product</TableHead><TableHead>Result</TableHead><TableHead>Active rule / context</TableHead><TableHead>Method</TableHead><TableHead>Review</TableHead></TableRow></TableHeader>
              <TableBody>
                {demoQualityReviews.map((row) => (
                  <TableRow key={row.lot}>
                    <TableCell><strong>{row.lot}</strong></TableCell>
                    <TableCell>{row.product}</TableCell>
                    <TableCell className="table-number">{row.moisture}</TableCell>
                    <TableCell>{row.rule}</TableCell>
                    <TableCell><span className="table-secondary">{row.method}</span></TableCell>
                    <TableCell><StatusBadge tone={row.tone}>{row.review}</StatusBadge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Panel>
      </div>

      <div style={{ marginTop: '1.15rem' }}>
        <SectionHeader eyebrow="Corrective action" title="An out-of-limit result starts a record, not a conclusion." description="Use the non-conformance record to document investigation, corrective action, verification and closure." action={<Link className={buttonVariants({ variant: 'outline', className: 'secondary-button' })} href="/staff/operations?tab=forms&form=non-conformance"><ClipboardCheck aria-hidden="true" size={15} /> Open non-conformance form</Link>} />
        <div className="callout"><AlertTriangle aria-hidden="true" size={15} /><span><strong>Demo guidance.</strong> Uploading a completed form alone never releases a batch. The authorized quality decision and its audit history remain required.</span></div>
      </div>
    </div>
  );
}
