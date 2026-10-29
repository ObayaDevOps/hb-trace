import { Card } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import {
  BookOpenCheck,
  ClipboardCheck,
  GitBranch,
  PackageCheck,
  RefreshCw,
  Sprout,
} from 'lucide-react';
import { demoActivity, demoAttention, demoMetrics, demoStock } from './mock-data';
import { MetricCard, ModePill, PageIntro, Panel, SectionHeader, StatusBadge } from './ui';

const quickActions = [
  { href: '/staff/sourcing', title: 'Record a purchase', detail: 'Capture honeycomb and issue a receipt', icon: Sprout },
  { href: '/staff/material', title: 'Trace a material', detail: 'Follow source contributions and outputs', icon: GitBranch },
  { href: '/staff/quality', title: 'Review quality', detail: 'Record a check or open a hold', icon: ClipboardCheck },
  { href: '/staff/packaging', title: 'Stage packaging', detail: 'Link a batch, format and lot code', icon: PackageCheck },
  { href: '/staff/operations?tab=forms', title: 'Upload a form', detail: 'Add a signed paper record as evidence', icon: RefreshCw },
  { href: '/staff/operations?tab=sops', title: 'Open SOP library', detail: 'Find current controlled guidance', icon: BookOpenCheck },
];

export default function StaffDashboard() {
  return (
    <div>
      <PageIntro
        eyebrow="Operations overview · 03 September 2026"
        title="Good morning, Amina."
        description="A focused view of stock, work waiting for review and records that need a next step."
        actions={<><ModePill /><Link className={buttonVariants({ variant: 'default', className: 'primary-button' })} href="/staff/sourcing">New purchase <Sprout aria-hidden="true" size={15} /></Link></>}
      />

      <div className="callout" role="note" style={{ marginBottom: '1.2rem' }}>
        <RefreshCw aria-hidden="true" size={16} />
        <span><strong>Demo/local mode.</strong> Counts and activity below are typed sample projections. They are not connected to Supabase, authentication, or live synchronization.</span>
      </div>

      <section aria-labelledby="stock-metrics-heading">
        <h2 id="stock-metrics-heading" className="sr-only">Stock and review metrics</h2>
        <div className="metrics-grid">
          {demoMetrics.map((metric) => <MetricCard metric={metric} key={metric.label} />)}
        </div>
      </section>

      <div className="dashboard-grid">
        <Panel
          title="Needs attention"
          description="Prioritized work from the current local fixture"
          action={<Link className={buttonVariants({ variant: 'link', className: 'text-button' })} href="/staff/quality">View queues <span aria-hidden="true">↗</span></Link>}
        >
          <div className="attention-list">
            {demoAttention.map((item) => (
              <div className={`attention-item tone-${item.tone}`} key={item.title}>
                <div className="attention-copy">
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                </div>
                <Link className={buttonVariants({ variant: 'link', className: 'text-button' })} href={item.href}>{item.action} <span aria-hidden="true">↗</span></Link>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Stock snapshot" description="Derived quantities by material type">
          <div className="stock-grid">
            {demoStock.map((stock, index) => (
              <Card className="stock-card" key={stock.type}>
                <div className="stock-card-top"><h3>{stock.type}</h3><StatusBadge tone={stock.tone}>Available</StatusBadge></div>
                <strong>{stock.amount}</strong>
                <p>{stock.lots} · {stock.location}</p>
                <p>Ageing: {stock.age}</p>
                <div className="stock-bar" aria-label={`${stock.type} stock level`}><span style={{ width: `${[42, 76, 30][index]}%` }} /></div>
              </Card>
            ))}
          </div>
          <p className="muted-copy" style={{ fontSize: '0.66rem', margin: '0.85rem 0 0' }}>Last fixture refresh: 03 Sep 2026 · 09:42 EAT</p>
        </Panel>
      </div>

      <div className="dashboard-grid">
        <Panel
          title="Recent activity"
          description="Latest capture and review events"
          action={<Link className={buttonVariants({ variant: 'link', className: 'text-button' })} href="/staff/sourcing">Open activity <span aria-hidden="true">↗</span></Link>}
        >
          <div className="table-wrap">
            <Table className="v1-table">
              <TableHeader><TableRow><TableHead>Event</TableHead><TableHead>Reference</TableHead><TableHead>Operator</TableHead><TableHead>When</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
              <TableBody>
                {demoActivity.map((item) => (
                  <TableRow key={`${item.reference}-${item.event}`}>
                    <TableCell><strong>{item.event}</strong></TableCell>
                    <TableCell className="table-primary">{item.reference}</TableCell>
                    <TableCell>{item.operator}</TableCell>
                    <TableCell className="table-secondary">{item.when}</TableCell>
                    <TableCell><StatusBadge tone={item.tone}>{item.status}</StatusBadge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Panel>

        <Panel title="Quick actions" description="Common staff workflows">
          <div className="quick-actions">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return <Link className="quick-action" href={action.href} key={action.title}><Icon aria-hidden="true" size={17} /><span><strong>{action.title}</strong><span>{action.detail}</span></span></Link>;
            })}
          </div>
        </Panel>
      </div>

      <div style={{ marginTop: '1.15rem' }}>
        <SectionHeader eyebrow="Status language" title="Keep local and server states distinct" description="A record saved on this device is not yet a server-confirmed record." action={<Link className={buttonVariants({ variant: 'outline', className: 'secondary-button' })} href="/staff/sourcing?filter=local">Review local queue</Link>} />
        <div className="split-stat">
          <Card className="mini-stat"><span>Local capture</span><strong>3 pending</strong><StatusBadge tone="info">Pending locally</StatusBadge></Card>
          <Card className="mini-stat"><span>Server acknowledgement</span><strong>27 today</strong><StatusBadge tone="success">Safely acknowledged</StatusBadge></Card>
        </div>
      </div>
    </div>
  );
}
