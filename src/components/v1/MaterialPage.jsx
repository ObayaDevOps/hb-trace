'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Button, buttonVariants } from '@/components/ui/button';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowDownToLine, ArrowUpFromLine, GitBranch, Info, MapPin, Search } from 'lucide-react';
import { demoLineage, demoMaterialRows } from './mock-data';
import { FilterChip, ModePill, PageIntro, Panel, SectionHeader, StatusBadge } from './ui';

function LineagePath({ nodes }) {
  return (
    <div className="lineage-path">
      {nodes.map((node) => (
        <div className={`lineage-node tone-${node.tone}`} key={node.id}>
          <div className="lineage-node-dot" aria-hidden="true" />
          <Card className="lineage-card" role="article">
            <div className="lineage-card-top">
              <div><h3>{node.title} <span>{node.kind}</span></h3><p>{node.subtitle}</p></div>
              <StatusBadge tone={node.tone}>{node.tone === 'success' ? 'Released' : node.kind === 'Purchase' ? 'Accepted' : 'Recorded'}</StatusBadge>
            </div>
            <div className="lineage-card-bottom"><strong>{node.quantity}</strong><span>{node.detail}</span></div>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default function MaterialPage() {
  const [direction, setDirection] = useState('backward');
  const [selectedCode, setSelectedCode] = useState('HB-26-0042');
  const selectedNodes = demoLineage[direction];

  return (
    <div>
      <PageIntro
        eyebrow="Material ledger"
        title="See where a lot came from."
        description="Follow direct allocations from purchase through transformation, material lots and packaging. The view is read-only in demo/local mode."
        actions={<><ModePill /><Link className={buttonVariants({ variant: 'outline', className: 'secondary-button' })} href="/staff/quality"><GitBranch aria-hidden="true" size={15} /> Review quality links</Link></>}
      />

      <Panel title="Trace a material or batch" description="Recursive lineage will be served by the API; this surface uses a typed fixture for the interaction." className="lineage-panel">
        <div className="lineage-toolbar">
          <Label className="sr-only" htmlFor="lineage-record">Record to trace</Label>
          <div className="lineage-search-wrap"><Search aria-hidden="true" size={15} /><NativeSelect className="lineage-select" id="lineage-record" value={selectedCode} onChange={(event) => setSelectedCode(event.target.value)}><NativeSelectOption value="HB-26-0042">HB-26-0042 · sale batch</NativeSelectOption><NativeSelectOption value="MAT-H-0847">MAT-H-0847 · honey lot</NativeSelectOption><NativeSelectOption value="PUR-2026-018">PUR-2026-018 · purchase</NativeSelectOption></NativeSelect></div>
          <div className="lineage-toggle" role="group" aria-label="Lineage direction">
            <Button className={direction === 'backward' ? 'active' : ''} onClick={() => setDirection('backward')} type="button"><ArrowDownToLine aria-hidden="true" size={14} /> Backward trace</Button>
            <Button className={direction === 'forward' ? 'active' : ''} onClick={() => setDirection('forward')} type="button"><ArrowUpFromLine aria-hidden="true" size={14} /> Forward trace</Button>
          </div>
        </div>
        <div className="callout" style={{ marginBottom: '1rem' }}><Info aria-hidden="true" size={15} /><span><strong>{direction === 'backward' ? 'Backward trace' : 'Forward trace'} for {selectedCode}.</strong> Every node below represents an explicit record or direct allocation edge in the demo projection.</span></div>
        <LineagePath nodes={selectedNodes} />
      </Panel>

      <div className="two-column" style={{ marginTop: '1.15rem' }}>
        <Panel title="Material availability" description="Availability is derived from ledger entries, not manually edited states." action={<Link className={buttonVariants({ variant: 'link', className: 'text-button' })} href="/staff/material?filter=available">Filter available <span aria-hidden="true">↗</span></Link>}>
          <div className="filter-row" style={{ marginBottom: '0.9rem' }}>
            <FilterChip active>All materials</FilterChip>
            <FilterChip>Honey</FilterChip>
            <FilterChip>Honeycomb</FilterChip>
            <FilterChip>Beeswax</FilterChip>
          </div>
          <div className="table-wrap">
            <Table className="v1-table">
              <TableHeader><TableRow><TableHead>Lot</TableHead><TableHead>Material</TableHead><TableHead>Quantity</TableHead><TableHead>Location</TableHead><TableHead>State</TableHead></TableRow></TableHeader>
              <TableBody>
                {demoMaterialRows.map((row) => (
                  <TableRow key={row.code}>
                    <TableCell><strong>{row.code}</strong><span className="table-secondary">Age {row.age}</span></TableCell>
                    <TableCell>{row.material}</TableCell>
                    <TableCell className="table-number">{row.quantity}</TableCell>
                    <TableCell><span className="table-secondary"><MapPin aria-hidden="true" size={12} style={{ verticalAlign: 'middle' }} /> {row.location}</span></TableCell>
                    <TableCell><StatusBadge tone={row.tone}>{row.state}</StatusBadge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Panel>

        <Panel title="Lineage integrity checks" description="Guardrails the server will enforce at commit time.">
          <div className="checklist">
            <div className="check-item"><span className="check-icon check-icon-done">✓</span><p><strong>No over-allocation</strong>Allocated quantity cannot exceed available source quantity.</p></div>
            <div className="check-item"><span className="check-icon check-icon-done">✓</span><p><strong>Direct edges retained</strong>Every transformation keeps exact source contributions.</p></div>
            <div className="check-item"><span className="check-icon check-icon-done">✓</span><p><strong>Cycles rejected</strong>Lineage must resolve to one originating purchase, harvest or approved adjustment.</p></div>
            <div className="check-item"><span className="check-icon check-icon-pending">!</span><p><strong>Server transaction required</strong>Material allocation and transformation commits cannot be completed offline.</p></div>
          </div>
          <div className="callout" style={{ marginTop: '1rem' }}><GitBranch aria-hidden="true" size={15} /><span>Corrections to committed edges become linked reversals or amendments; history is not rewritten.</span></div>
        </Panel>
      </div>
    </div>
  );
}
