'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Info, MapPin, ShieldCheck } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert } from '@/components/ui/alert';
import { demoPublicBatch } from './mock-data';
import { ModePill, StatusBadge } from './ui';

function PublicBrand() {
  return (
    <Link className="v1-brand" href="/verify" aria-label="Humble Beeing public batch verification">
      <span className="brand-mark" aria-hidden="true">HB</span>
      <span className="brand-wordmark"><strong>Humble Beeing</strong><small>HONEY · BATCH VERIFICATION</small></span>
    </Link>
  );
}

function normalizeApiBatch(batch) {
  if (batch?.code) return batch;
  if (!batch?.publicCode) return null;
  return {
    code: batch.publicCode,
    product: batch.product,
    format: batch.packageSummary,
    packedOn: batch.packedOn,
    sourceSummary: batch.sourceSummary,
    quality: batch.timeline?.find((item) => item.label === 'Quality reviewed')?.detail || 'Quality record available',
    publication: batch.publicationRevision,
    timeline: (batch.timeline || []).map((item) => ({ stage: item.label, date: item.date, detail: item.detail })),
    facts: (batch.facts || []).map((item) => [item.label, item.value]),
  };
}

function PublicResult({ batch }) {
  return (
    <Card className="public-result" role="article" aria-labelledby="result-heading">
      <div className="public-result-header">
        <div>
          <p className="eyebrow">Approved publication snapshot</p>
          <h2 id="result-heading">{batch.code}</h2>
          <p>{batch.product} · {batch.format}</p>
        </div>
        <StatusBadge tone="success">Active batch page</StatusBadge>
      </div>

      <div className="public-result-content">
        <div className="result-summary" aria-label="Batch summary">
          <Card className="result-summary-card"><span>Packed on</span><strong>{batch.packedOn}</strong></Card>
          <Card className="result-summary-card"><span>Source summary</span><strong>{batch.sourceSummary}</strong></Card>
          <Card className="result-summary-card"><span>Quality record</span><strong>{batch.quality}</strong></Card>
        </div>

        <div className="section-header">
          <div>
            <p className="eyebrow">The record, at a glance</p>
            <h2>From source to packed batch</h2>
          </div>
        </div>
        <div className="public-timeline" aria-label="Batch production timeline">
          {batch.timeline.map((item) => (
            <div className="public-stage" key={item.stage}>
              <div className="public-stage-dot" aria-hidden="true" />
              <h3>{item.stage}</h3>
              <time>{item.date}</time>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="public-result-lower">
          <div>
            <p className="eyebrow">Public facts</p>
            <h3>What this page confirms</h3>
            <p>These details come from the approved batch revision. Private contact details, exact locations and internal investigation records are not displayed.</p>
            <dl className="public-facts">
              {batch.facts.map(([label, value]) => (
                <div className="public-fact" key={label}>
                  <dt><span>{label}</span></dt>
                  <dd><strong>{value}</strong></dd>
                </div>
              ))}
            </dl>
          </div>
          <aside className="public-claim" aria-label="Evidence summary">
            <p className="public-claim-label">Evidence summary</p>
            <p>The page is linked to purchase, material, quality and packaging records held in the staff workspace.</p>
            <small>Publication: {batch.publication}</small>
            <small>Location shown at regional level for privacy.</small>
          </aside>
        </div>
      </div>

      <div className="public-result-disclosure">
        <ShieldCheck aria-hidden="true" size={14} /> This is a batch/lot lookup. It does not identify or serialize an individual jar.
      </div>
    </Card>
  );
}

export default function VerificationPage({ initialCode = '', mode = 'local' }) {
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState(null);
  const [lookupState, setLookupState] = useState('idle');

  useEffect(() => {
    if (initialCode) setCode(initialCode.toUpperCase());
  }, [initialCode]);

  async function submitLookup(event) {
    event.preventDefault();
    const normalized = code.trim().toUpperCase();
    if (!normalized) {
      setResult(null);
      setLookupState('not-found');
      return;
    }
    if (mode === 'local' && normalized === demoPublicBatch.code) {
      setResult(demoPublicBatch);
      setLookupState('found');
      return;
    }

    if (mode === 'hosted') {
      setLookupState('loading');
      try {
        const response = await fetch(`/api/v1/public/batches/${encodeURIComponent(normalized)}`, { cache: 'no-store' });
        const body = await response.json();
        if (!response.ok || !body?.data) throw new Error(body?.error?.message || 'The public publication is unavailable.');
        const nextResult = normalizeApiBatch(body.data);
        if (!nextResult) throw new Error('The public publication has no approved projection.');
        setResult(nextResult);
        setLookupState('found');
        return;
      } catch {
        setResult(null);
        setLookupState('unavailable');
        return;
      }
    }

    setResult(null);
    setLookupState('not-found');
  }

  function loadSample() {
    setCode(demoPublicBatch.code);
    setLookupState('idle');
    setResult(null);
  }

  return (
    <div className="v1-public-root public-shell">
      <header className="public-header">
        <PublicBrand />
        <nav className="public-nav" aria-label="Public navigation">
          <span>For customers and partners</span>
          <Link className={buttonVariants({ variant: 'link', size: 'sm' })} href="/staff">Staff workspace ↗</Link>
        </nav>
      </header>

      <main className="public-hero">
        <div className="public-hero-grid">
          <div className="public-copy">
            <div className="public-kicker">Batch verification</div>
            <h1>Know the batch behind your honey.</h1>
            <p>Enter the batch or lot code printed on the product label to view its approved, privacy-safe production record.</p>
            <p className="public-note"><Info aria-hidden="true" size={15} /> {mode === 'local' ? 'Demo/local mode is active. This sample page uses one approved fixture and is not connected to live server data.' : 'Hosted mode is active. Only an approved public projection is returned; private operational records stay server-side.'}</p>
          </div>

          <Card className="lookup-card" role="region" aria-labelledby="lookup-heading">
            <CardHeader className="lookup-card-top">
              <div>
                <p className="lookup-card-label">Public lookup</p>
                <CardTitle><h2 id="lookup-heading">Check a batch or lot code</h2></CardTitle>
              </div>
              <ModePill publicMode mode={mode} />
            </CardHeader>
            <CardContent>
            <form className="lookup-form" onSubmit={submitLookup}>
              <Label htmlFor="public-batch-code">Batch or lot code</Label>
              <div className="lookup-input-wrap">
                <Input
                  id="public-batch-code"
                  name="batchCode"
                  onChange={(event) => setCode(event.target.value.toUpperCase())}
                  placeholder="e.g. HB-26-0042"
                  spellCheck="false"
                  value={code}
                  autoComplete="off"
                />
                <Button className="lookup-submit" type="submit">Check code <ArrowRight aria-hidden="true" size={14} /></Button>
              </div>
              <p className="lookup-hint">Use the batch/lot code, not an individual jar number.</p>
            </form>
            {mode === 'local' ? <div className="sample-codes">
              <span>Try sample:</span>
              <Button variant="outline" size="sm" type="button" onClick={loadSample}>{demoPublicBatch.code}</Button>
            </div> : null}
            {lookupState === 'not-found' ? (
              <Alert variant="destructive" className="lookup-message error"><Info aria-hidden="true" size={15} /> No active public batch was found for that code. Check the printed batch/lot code and try again.</Alert>
            ) : null}
            {lookupState === 'unavailable' ? (
              <Alert variant="destructive" className="lookup-message error"><Info aria-hidden="true" size={15} /> The hosted public publication is not available yet. No private operational data was returned.</Alert>
            ) : null}
            {lookupState === 'loading' ? (
              <Alert className="lookup-message" role="status"><Info aria-hidden="true" size={15} /> Checking the approved publication…</Alert>
            ) : null}
            {lookupState === 'found' ? (
              <Alert className="lookup-message success" role="status"><CheckCircle2 aria-hidden="true" size={15} /> Approved batch snapshot loaded.</Alert>
            ) : null}
            </CardContent>
          </Card>
        </div>

        {result ? <PublicResult batch={result} /> : (
          <Card className="public-result public-result-placeholder" role="region" aria-labelledby="before-lookup-heading">
            <div className="public-result-content">
              <p className="eyebrow">A clear public record</p>
              <h2 id="before-lookup-heading">Look up a code to see the approved timeline.</h2>
              <div className="result-summary" aria-label="Information available after lookup">
                <Card className="result-summary-card"><span>01</span><strong>Product and packed-batch summary</strong></Card>
                <Card className="result-summary-card"><span>02</span><strong>Source-to-pack stage timeline</strong></Card>
                <Card className="result-summary-card"><span>03</span><strong>Regional and quality details</strong></Card>
              </div>
            </div>
          </Card>
        )}
      </main>

      <footer className="public-footer">
        <span>© Humble Beeing Honey · public batch records</span>
        <span>{mode === 'local' ? 'Sample publication view · revision-safe by design' : 'Approved projection · revision-safe by design'}</span>
      </footer>
    </div>
  );
}
