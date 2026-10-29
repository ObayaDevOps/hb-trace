'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { Alert } from '@/components/ui/alert';

import { useState } from 'react';
import { CheckCircle2, FileText, RotateCcw, Save, WifiOff } from 'lucide-react';
import { queueOfflineCommand } from '@/lib/offline/outbox';
import { LOCAL_DEMO_ACTOR_ID } from '@/lib/sync-types';
import { Field } from './ui';

export default function PurchaseEntryForm() {
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  async function submitForm(event) {
    event.preventDefault();
    setError('');
    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      await queueOfflineCommand('purchase.submit', {
        farmerReference: String(formData.get('supplier') || ''),
        apiaryReference: String(formData.get('apiary') || ''),
        collectionDate: String(formData.get('collectionDate') || ''),
        product: String(formData.get('material') || 'honeycomb'),
        quantityKg: String(formData.get('quantity') || ''),
        grade: String(formData.get('grade') || ''),
        agreedPrice: String(formData.get('price') || ''),
        currency: 'UGX',
        paymentReference: String(formData.get('paymentReference') || ''),
        receiptState: String(formData.get('receiptState') || ''),
        note: String(formData.get('note') || ''),
      }, { actorId: LOCAL_DEMO_ACTOR_ID });
      setSaved(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'The purchase could not be saved locally.');
    }
  }

  function clearForm(event) {
    setSaved(false);
    setError('');
    event.currentTarget.form?.reset?.();
  }

  return (
    <form onSubmit={submitForm}>
      <div className="callout" role="note" style={{ marginBottom: '1rem' }}>
        <WifiOff aria-hidden="true" size={15} />
        <span><strong>Offline-capable capture.</strong> This demo stages the purchase locally. A server decision is still required before material allocation.</span>
      </div>
      <div className="form-grid">
        <p className="form-subhead">Source and collection</p>
        <Field label="Supplier / farmer record" htmlFor="purchase-supplier" required hint="Choose an existing record or create a draft profile first.">
          <NativeSelect id="purchase-supplier" name="supplier" defaultValue="mirembe" required>
            <NativeSelectOption value="mirembe">Mirembe Cooperative · SUP-014</NativeSelectOption>
            <NativeSelectOption value="kato">Kato Family Apiary · SUP-009</NativeSelectOption>
            <NativeSelectOption value="nabirye">Nabirye Apiary Group · SUP-006</NativeSelectOption>
          </NativeSelect>
        </Field>
        <Field label="Apiary / collection location" htmlFor="purchase-apiary" required>
          <NativeSelect id="purchase-apiary" name="apiary" defaultValue="apiary-014" required>
            <NativeSelectOption value="apiary-014">Apiary 014 · Central region</NativeSelectOption>
            <NativeSelectOption value="apiary-009">Apiary 009 · Central region</NativeSelectOption>
            <NativeSelectOption value="apiary-006">Apiary 006 · Central region</NativeSelectOption>
          </NativeSelect>
        </Field>
        <Field label="Collection date" htmlFor="purchase-date" required>
          <Input id="purchase-date" name="collectionDate" type="date" defaultValue="2026-09-03" required />
        </Field>
        <Field label="Material received" htmlFor="purchase-material" required>
          <NativeSelect id="purchase-material" name="material" defaultValue="honeycomb" required>
            <NativeSelectOption value="honeycomb">Honeycomb</NativeSelectOption>
          </NativeSelect>
        </Field>
        <Field label="Quantity" htmlFor="purchase-quantity" required hint="Canonical quantity is recorded in kilograms in the server model.">
          <div className="input-with-suffix"><Input id="purchase-quantity" name="quantity" type="number" min="0.1" step="0.1" defaultValue="48" required /><span>kg</span></div>
        </Field>
        <Field label="Grade / receiving note" htmlFor="purchase-grade" required>
          <NativeSelect id="purchase-grade" name="grade" defaultValue="a" required>
            <NativeSelectOption value="a">A · receiving grade</NativeSelectOption>
            <NativeSelectOption value="b">B · receiving grade</NativeSelectOption>
            <NativeSelectOption value="review">Needs quality review</NativeSelectOption>
          </NativeSelect>
        </Field>

        <hr className="form-divider" />
        <p className="form-subhead">Payment and receipt</p>
        <Field label="Agreed price" htmlFor="purchase-price" required>
          <div className="input-with-prefix"><span>UGX</span><Input id="purchase-price" name="price" type="number" min="0" step="1" defaultValue="264000" required /></div>
        </Field>
        <Field label="Payment reference" htmlFor="purchase-payment" hint="Use a reference rather than storing unnecessary payment details.">
          <Input id="purchase-payment" name="paymentReference" placeholder="e.g. MM-4821" />
        </Field>
        <Field label="Receipt state" htmlFor="purchase-receipt" required>
          <NativeSelect id="purchase-receipt" name="receiptState" defaultValue="issue" required>
            <NativeSelectOption value="issue">Issue receipt with pending confirmation</NativeSelectOption>
            <NativeSelectOption value="confirmed">Record farmer confirmation</NativeSelectOption>
            <NativeSelectOption value="paper">Paper receipt supplied; confirm later</NativeSelectOption>
          </NativeSelect>
        </Field>
        <Field label="Staff note" htmlFor="purchase-note" className="field-full">
          <Textarea id="purchase-note" name="note" placeholder="Add a concise operational note. Do not add sensitive personal details here." />
        </Field>
      </div>
      {error ? <Alert variant="destructive" className="inline-warning">{error}</Alert> : null}
      <div className="form-actions">
        {saved ? <span className="form-status" role="status"><CheckCircle2 aria-hidden="true" size={14} /> Saved on this device · not server-confirmed</span> : <span className="form-status muted-form-status">Required fields are marked *</span>}
        <Button className="quiet-button" type="button" onClick={clearForm}><RotateCcw aria-hidden="true" size={15} /> Clear</Button>
        <Button className="secondary-button" type="button"><FileText aria-hidden="true" size={15} /> Preview receipt</Button>
        <Button className="primary-button" type="submit"><Save aria-hidden="true" size={15} /> Save purchase draft</Button>
      </div>
    </form>
  );
}
