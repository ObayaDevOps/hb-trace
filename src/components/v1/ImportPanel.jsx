'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';

import Link from 'next/link';
import { CheckCircle2, FileUp, LoaderCircle, RotateCcw, Save, ShieldCheck, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { Panel, StatusBadge } from './ui';

const kinds = [
  { value: 'farmers', label: 'Farmers', template: '/templates/farmers-v1.csv' },
  { value: 'apiaries', label: 'Apiaries', template: '/templates/apiaries-v1.csv' },
];

function errorMessage(payload, fallback) {
  return payload?.error?.message || fallback;
}

function newOperationId() {
  return globalThis.crypto?.randomUUID?.() || '';
}

function rowIssues(row) {
  const details = row?.errorDetails;
  return Array.isArray(details?.issues) ? details.issues : [];
}

function rowCandidates(row) {
  const details = row?.errorDetails;
  return Array.isArray(details?.duplicateCandidates) ? details.duplicateCandidates : [];
}

export default function ImportPanel({ initialKind = 'farmers' }) {
  const [kind, setKind] = useState(initialKind || 'farmers');
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [decisions, setDecisions] = useState({});
  const [allowPartialReject, setAllowPartialReject] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const rows = result?.data?.rows || [];
  const batch = result?.data?.batch;
  const preview = result?.data?.preview;
  const activeKind = kinds.find((option) => option.value === kind) || kinds[0];

  function reset() {
    setFile(null);
    setResult(null);
    setDecisions({});
    setAllowPartialReject(false);
    setMessage('');
    setError('');
  }

  function changeKind(event) {
    const nextKind = event.target.value;
    setKind(nextKind);
    reset();
  }

  async function previewFile(event) {
    event.preventDefault();
    if (!file) {
      setError('Choose a CSV or XLSX file first.');
      return;
    }
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const response = await fetch(`/api/v1/imports/preview?kind=${encodeURIComponent(kind)}`, {
        method: 'POST',
        headers: {
          'content-type': file.type || 'application/octet-stream',
          'x-file-name': file.name,
        },
        body: file,
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(errorMessage(payload, 'The source file could not be previewed.'));
      setResult(payload);
      setDecisions({});
      setMessage(payload?.meta?.replayed ? 'This source was already staged; showing the existing local preview.' : 'Dry run complete. No farmer or apiary records were committed.');
    } catch (previewError) {
      setError(previewError instanceof Error ? previewError.message : 'The source file could not be previewed.');
    } finally {
      setBusy(false);
    }
  }

  function updateDecision(rowId, decision, matchedRecordId = '') {
    setDecisions((current) => ({ ...current, [rowId]: { decision, matchedRecordId } }));
  }

  async function resolveRow(row) {
    const selected = decisions[row.id];
    if (!selected?.decision) {
      setError(`Choose a duplicate decision for row ${row.rowNumber}.`);
      return;
    }
    if (selected.decision === 'match' && !selected.matchedRecordId) {
      setError(`Choose the existing record to match for row ${row.rowNumber}.`);
      return;
    }
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const response = await fetch('/api/v1/imports/resolve', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          batchId: batch.id,
          rowId: row.id,
          decision: selected.decision,
          matchedRecordId: selected.decision === 'match' ? selected.matchedRecordId : undefined,
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(errorMessage(payload, 'The duplicate decision could not be saved.'));
      setResult((current) => ({
        ...current,
        data: {
          ...current.data,
          batch: payload.data.batch,
          rows: current.data.rows.map((currentRow) => currentRow.id === row.id ? payload.data.row : currentRow),
        },
      }));
      setMessage(`Row ${row.rowNumber} marked ${selected.decision}.`);
    } catch (resolveError) {
      setError(resolveError instanceof Error ? resolveError.message : 'The duplicate decision could not be saved.');
    } finally {
      setBusy(false);
    }
  }

  async function commit() {
    if (!batch) return;
    const commitOperationId = newOperationId();
    if (!commitOperationId) {
      setError('This browser cannot create a safe commit operation ID.');
      return;
    }
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const response = await fetch('/api/v1/imports/commit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ batchId: batch.id, commitOperationId, allowPartialReject }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(errorMessage(payload, 'The import could not be committed.'));
      setResult((current) => ({ ...current, data: { ...current.data, batch: payload.data.batch, rows: current.data.rows } }));
      setMessage(payload.meta?.replayed ? 'The original commit result was replayed safely.' : `Import committed: ${payload.data.created} created, ${payload.data.matched} matched, ${payload.data.rejected} rejected, ${payload.data.skipped} skipped.`);
    } catch (commitError) {
      setError(commitError instanceof Error ? commitError.message : 'The import could not be committed.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <Panel title="Fixed-template import" description="Preview a private source file, resolve likely duplicates, then commit the batch once.">
      <div className="import-toolbar">
        <Label className="import-kind-label" htmlFor="import-kind">Record type
          <NativeSelect id="import-kind" value={kind} onChange={changeKind} disabled={busy}>
            {kinds.map((option) => <NativeSelectOption value={option.value} key={option.value}>{option.label}</NativeSelectOption>)}
          </NativeSelect>
        </Label>
        <a className={buttonVariants({ variant: 'link', className: 'text-button' })} href={activeKind.template} download>Download {activeKind.label.toLowerCase()} template ↗</a>
      </div>

      <form className="import-upload" onSubmit={previewFile}>
        <div className="file-drop">
          <span className="file-drop-icon"><FileUp aria-hidden="true" size={20} /></span>
          <p><Label htmlFor="import-file">Choose a {activeKind.label.toLowerCase()} CSV or XLSX file</Label> to run the server-side dry run.</p>
          <Input id="import-file" type="file" accept=".csv,text/csv,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={(event) => { setFile(event.target.files?.[0] || null); setResult(null); setMessage(''); setError(''); }} disabled={busy} />
          <small>Maximum 2 MiB. Original bytes are retained as private local evidence.</small>
          {file ? <p className="file-name">{file.name} · {(file.size / 1024).toFixed(1)} KiB</p> : null}
        </div>
        <div className="form-actions">
          {message ? <span className="form-status" role="status"><CheckCircle2 aria-hidden="true" size={14} /> {message}</span> : <span className="form-status muted-form-status">Dry run is required before commit.</span>}
          <Button className="quiet-button" type="button" onClick={reset} disabled={busy}><RotateCcw aria-hidden="true" size={15} /> Clear</Button>
          <Button className="primary-button" type="submit" disabled={!file || busy}>{busy ? <LoaderCircle className="spin" aria-hidden="true" size={15} /> : <FileUp aria-hidden="true" size={15} />} Preview file</Button>
        </div>
      </form>

      {error ? <Alert variant="destructive" className="inline-warning"><TriangleAlert aria-hidden="true" size={15} /> {error}</Alert> : null}

      {preview && batch ? (
        <div className="import-review" aria-live="polite">
          <div className="import-summary">
            <div><span>Batch</span><strong>{batch.id.slice(0, 8)}…</strong></div>
            <div><span>Rows</span><strong>{preview.summary.total}</strong></div>
            <div><span>Valid</span><strong>{preview.summary.valid}</strong></div>
            <div><span>Review / errors</span><strong>{preview.summary.duplicateReview} / {preview.summary.correctionRequired}</strong></div>
          </div>
          <div className="callout" role="note"><ShieldCheck aria-hidden="true" size={15} /><span><strong>Private source retained.</strong> SHA-256 {batch.sourceSha256.slice(0, 16)}… · {batch.status.replaceAll('_', ' ')}</span></div>

          {rows.length > 0 ? <div className="import-rows">
            {rows.map((row) => {
              const issues = rowIssues(row);
              const candidates = rowCandidates(row);
              const selected = decisions[row.id] || { decision: row.duplicateDecision || '', matchedRecordId: row.matchedRecordId || '' };
              return (
                <Card className="import-row" key={row.id}>
                  <div className="import-row-top"><strong>Row {row.rowNumber}</strong><StatusBadge tone={row.outcome === 'pending' && candidates.length === 0 && issues.length === 0 ? 'success' : issues.some((issue) => issue.severity === 'error') ? 'danger' : 'warning'}>{row.outcome.replaceAll('_', ' ')}</StatusBadge></div>
                  <p className="import-row-values">{String(row.normalizedValues?.external_reference || row.normalizedValues?.name || 'Unidentified row')} · {String(row.normalizedValues?.display_name || row.normalizedValues?.farmer_external_reference || '')}</p>
                  {issues.length > 0 ? <ul className="import-issues">{issues.map((issue, index) => <li key={`${issue.code}-${index}`}>{issue.message}</li>)}</ul> : null}
                  {candidates.length > 0 && row.outcome === 'pending' ? <div className="import-decision">
                    <Label htmlFor={`decision-${row.id}`}>Duplicate decision
                      <NativeSelect id={`decision-${row.id}`} value={selected.decision} onChange={(event) => updateDecision(row.id, event.target.value, '')} disabled={busy}>
                        <NativeSelectOption value="">Choose…</NativeSelectOption><NativeSelectOption value="match">Match existing</NativeSelectOption><NativeSelectOption value="skip">Skip row</NativeSelectOption><NativeSelectOption value="create">Create new record</NativeSelectOption>
                      </NativeSelect>
                    </Label>
                    {selected.decision === 'match' ? <Label htmlFor={`match-${row.id}`}>Existing candidate
                      <NativeSelect id={`match-${row.id}`} value={selected.matchedRecordId} onChange={(event) => updateDecision(row.id, 'match', event.target.value)} disabled={busy}>
                        <NativeSelectOption value="">Choose a candidate…</NativeSelectOption>
                        {candidates.map((candidate) => <NativeSelectOption value={candidate.recordId} key={candidate.recordId}>{candidate.recordId.slice(0, 8)}… · {candidate.reason.replaceAll('_', ' ')}</NativeSelectOption>)}
                      </NativeSelect>
                    </Label> : null}
                    <Button className="small-button" type="button" onClick={() => resolveRow(row)} disabled={busy || !selected.decision}>Save decision</Button>
                  </div> : null}
                </Card>
              );
            })}
          </div> : <p className="muted-copy">No data rows were parsed. Check the fixed header and the file type.</p>}

          <div className="import-commit">
            <Label className="check-item"><Checkbox checked={allowPartialReject} onCheckedChange={setAllowPartialReject} disabled={busy || batch.status !== 'correction_required'} /><span><strong>Allow partial rejection</strong><small>Commit valid rows and record validation-error rows as rejected.</small></span></Label>
            <Button className="primary-button" type="button" onClick={commit} disabled={busy || ['completed', 'partially_rejected'].includes(batch.status)}><Save aria-hidden="true" size={15} /> Commit import</Button>
          </div>
        </div>
      ) : null}

      <p className="muted-copy import-footnote"><Link href="/staff/operations?tab=requirements">Field guidance and requirements</Link> · hosted persistence remains disabled until the provider adapter is connected.</p>
    </Panel>
  );
}
