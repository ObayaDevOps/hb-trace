import { Card } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { Download, FileText, ReceiptText, Sprout } from 'lucide-react';
import { demoPurchases } from './mock-data';
import PurchaseEntryForm from './PurchaseEntryForm';
import ImportPanel from './ImportPanel';
import { ModePill, PageIntro, Panel, SectionHeader, StatusBadge } from './ui';

export default function SourcingPage({ importKind = null }) {
  return (
    <div>
      <PageIntro
        eyebrow="Sourcing & purchases"
        title="Capture a purchase cleanly."
        description="Register the source relationship, record the honeycomb received and issue a receipt without overwriting the history later."
        actions={<><ModePill /><a className={buttonVariants({ variant: 'outline', className: 'secondary-button' })} href="/templates/farmers-v1.csv" download><Download aria-hidden="true" size={15} /> Farmer CSV</a><a className={buttonVariants({ variant: 'outline', className: 'secondary-button' })} href="/templates/apiaries-v1.csv" download><Download aria-hidden="true" size={15} /> Apiary CSV</a></>}
      />

      {importKind ? <div style={{ marginBottom: '1.15rem' }}><ImportPanel initialKind={importKind} /></div> : null}

      <div className="split-stat triple-stat" style={{ marginBottom: '1.15rem' }}>
        <Card className="mini-stat"><span>Purchases this week</span><strong>14</strong><StatusBadge tone="success">2 awaiting confirmation</StatusBadge></Card>
        <Card className="mini-stat"><span>Local drafts</span><strong>3</strong><StatusBadge tone="info">Pending locally</StatusBadge></Card>
        <Card className="mini-stat"><span>Receipt disputes</span><strong>1</strong><StatusBadge tone="warning">Needs review</StatusBadge></Card>
      </div>

      <div className="two-column">
        <Panel title="New purchase / harvest record" description="A complete source record is the starting point for later material lineage.">
          <PurchaseEntryForm />
        </Panel>

        <div className="dashboard-section">
          <Panel title="Receipt workflow" description="Keep the original transaction and any later response linked.">
            <div className="list-stack">
              <div className="list-row"><div className="list-row-main"><strong>1 · Create a stable receipt</strong><p>Generate a transaction code and non-sensitive supplier reference.</p></div><StatusBadge tone="success">Ready</StatusBadge></div>
              <div className="list-row"><div className="list-row-main"><strong>2 · Give the farmer a copy</strong><p>Print or share the receipt. If offline, state that it is saved on this named device.</p></div><StatusBadge tone="info">Staff step</StatusBadge></div>
              <div className="list-row"><div className="list-row-main"><strong>3 · Record confirmation or dispute</strong><p>A disagreement creates a linked review; it never edits the original purchase.</p></div><StatusBadge tone="warning">Follow-up</StatusBadge></div>
            </div>
            <div className="callout" style={{ marginTop: '1rem' }}><ReceiptText aria-hidden="true" size={15} /><span><strong>Receipt preview is local.</strong> PDF generation and farmer delivery will be connected through the API integration.</span></div>
          </Panel>

          <Panel title="Source register" description="Fixed-template bulk onboarding uses a dry-run, duplicate-review and one-time commit path." className="source-register-panel">
            <div className="list-stack">
              <div className="list-row"><div className="list-row-main"><strong>Farmers and apiaries</strong><p>100 farmers · 100 apiaries in the pilot fixture</p></div><div className="doc-actions"><Link className={buttonVariants({ variant: 'outline', size: 'sm', className: 'small-button' })} href="/staff/sourcing?import=farmers">Farmers</Link><Link className={buttonVariants({ variant: 'outline', size: 'sm', className: 'small-button' })} href="/staff/sourcing?import=apiaries">Apiaries</Link></div></div>
              <div className="list-row"><div className="list-row-main"><strong>Download fixed templates</strong><p>Versioned columns with row-level validation and duplicate review.</p></div><div className="doc-actions"><a className={buttonVariants({ variant: 'outline', size: 'sm', className: 'small-button' })} href="/templates/farmers-v1.csv" download><FileText aria-hidden="true" size={13} /> Farmers</a><a className={buttonVariants({ variant: 'outline', size: 'sm', className: 'small-button' })} href="/templates/apiaries-v1.csv" download><FileText aria-hidden="true" size={13} /> Apiaries</a></div></div>
            </div>
          </Panel>
        </div>
      </div>

      <div style={{ marginTop: '1.15rem' }}>
        <Panel title="Recent purchases" description="Demo records show the separate local, confirmation and review states." action={<Link className={buttonVariants({ variant: 'link', className: 'text-button' })} href="/staff/sourcing?filter=all">View all <span aria-hidden="true">↗</span></Link>}>
          <div className="table-wrap">
            <Table className="v1-table">
              <TableHeader><TableRow><TableHead>Transaction</TableHead><TableHead>Supplier / apiary</TableHead><TableHead>Collected</TableHead><TableHead>Quantity</TableHead><TableHead>Payment</TableHead><TableHead>State</TableHead></TableRow></TableHeader>
              <TableBody>
                {demoPurchases.map((purchase) => (
                  <TableRow key={purchase.id}>
                    <TableCell><strong>{purchase.id}</strong><span className="table-secondary">Honeycomb</span></TableCell>
                    <TableCell><span className="table-primary">{purchase.supplier}</span><span className="table-secondary">{purchase.apiary}</span></TableCell>
                    <TableCell>{purchase.collected}</TableCell>
                    <TableCell className="table-number">{purchase.quantity} · grade {purchase.grade}</TableCell>
                    <TableCell><span className="table-secondary">{purchase.payment}</span></TableCell>
                    <TableCell><StatusBadge tone={purchase.tone}>{purchase.status}</StatusBadge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Panel>
      </div>

      <p className="muted-copy" style={{ fontSize: '0.68rem', marginTop: '0.8rem' }}><Sprout aria-hidden="true" size={13} style={{ verticalAlign: 'middle' }} /> Source identities, receipts, imports and payment details are server-authorized. Local command and import paths are available in demo mode; hosted provider writes remain disabled.</p>
    </div>
  );
}
