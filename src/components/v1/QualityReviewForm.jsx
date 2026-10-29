'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { Alert } from '@/components/ui/alert';

import { useState } from 'react';
import { AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Field } from './ui';

export default function QualityReviewForm() {
  const [moisture, setMoisture] = useState('18.4');
  const [saved, setSaved] = useState(false);
  const overLimit = Number(moisture) > 20;

  function submitForm(event) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <form onSubmit={submitForm}>
      <div className="callout" role="note" style={{ marginBottom: '1rem' }}>
        <ShieldCheck aria-hidden="true" size={15} />
        <span><strong>Quality review staging.</strong> Release, hold and reject actions require an authorized online server decision.</span>
      </div>
      <div className="form-grid">
        <Field label="Lot to review" htmlFor="quality-lot" required>
          <NativeSelect id="quality-lot" name="lot" defaultValue="MAT-H-0847" required>
            <NativeSelectOption value="MAT-H-0847">MAT-H-0847 · Honey</NativeSelectOption>
            <NativeSelectOption value="MAT-H-0842">MAT-H-0842 · Honey · held</NativeSelectOption>
            <NativeSelectOption value="MAT-W-0118">MAT-W-0118 · Beeswax</NativeSelectOption>
          </NativeSelect>
        </Field>
        <Field label="Measurement date" htmlFor="quality-date" required>
          <Input id="quality-date" name="date" type="date" defaultValue="2026-09-03" required />
        </Field>
        <Field label="Moisture result" htmlFor="quality-moisture" required hint="Demo rule shown for honey: no more than 20% m/m.">
          <div className="input-with-suffix"><Input id="quality-moisture" name="moisture" type="number" min="0" max="100" step="0.1" value={moisture} onChange={(event) => { setMoisture(event.target.value); setSaved(false); }} required /><span>% m/m</span></div>
        </Field>
        <Field label="Method / report reference" htmlFor="quality-method" required>
          <Input id="quality-method" name="method" defaultValue="Handheld meter · HM-02" required />
        </Field>
        <Field label="Disposition" htmlFor="quality-disposition" required className="field-full">
          <NativeSelect id="quality-disposition" name="disposition" defaultValue={overLimit ? 'hold' : 'release'} required>
            <NativeSelectOption value="release">Stage release for authorization</NativeSelectOption>
            <NativeSelectOption value="hold">Place / keep on hold</NativeSelectOption>
            <NativeSelectOption value="reject">Stage rejection for authorization</NativeSelectOption>
          </NativeSelect>
        </Field>
        <Field label="Review rationale" htmlFor="quality-rationale" required className="field-full" hint="Explain the result and any next action. Do not infer fault to a source or region.">
          <Textarea id="quality-rationale" name="rationale" defaultValue={overLimit ? 'Reading requires investigation and a documented disposition.' : 'Reading recorded within the active honey rule set; final authorization pending.'} required />
        </Field>
      </div>
      {overLimit ? <Alert variant="destructive" className="inline-warning"><AlertTriangle aria-hidden="true" size={15} /> Above the demo moisture threshold. Keep the lot held until an authorized reviewer records the next action.</Alert> : null}
      <div className="form-actions">
        {saved ? <span className="form-status" role="status"><CheckCircle2 aria-hidden="true" size={14} /> Review staged locally · not server-authorized</span> : <span className="form-status muted-form-status">Final disposition remains a server action</span>}
        <Button className="secondary-button" type="button" onClick={() => setSaved(false)}>Clear status</Button>
        <Button className="primary-button" type="submit"><ShieldCheck aria-hidden="true" size={15} /> Stage quality review</Button>
      </div>
    </form>
  );
}
