'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

import { useState } from 'react';
import { Check, PackageCheck, QrCode, ShieldCheck } from 'lucide-react';
import { Field } from './ui';

export default function PackagingForm() {
  const [staged, setStaged] = useState(false);
  const [checks, setChecks] = useState({ quality: true, label: true, inventory: false });
  const readyCount = Object.values(checks).filter(Boolean).length;

  function toggleCheck(name) {
    setStaged(false);
    setChecks((current) => ({ ...current, [name]: !current[name] }));
  }

  function submitForm(event) {
    event.preventDefault();
    setStaged(true);
  }

  return (
    <form onSubmit={submitForm}>
      <div className="callout" role="note" style={{ marginBottom: '1rem' }}>
        <QrCode aria-hidden="true" size={15} />
        <span><strong>Batch code workflow.</strong> Create one durable code for the sale batch or lot. Individual jar serialization is outside V1.</span>
      </div>
      <div className="form-grid">
        <Field label="Material / product" htmlFor="pack-product" required>
          <NativeSelect id="pack-product" name="product" defaultValue="honey" required><NativeSelectOption value="honey">Humble Beeing Honey</NativeSelectOption><NativeSelectOption value="beeswax">Beeswax product</NativeSelectOption></NativeSelect>
        </Field>
        <Field label="Source lot" htmlFor="pack-source" required hint="Must be released and have required evidence before commit.">
          <NativeSelect id="pack-source" name="sourceLot" defaultValue="MAT-H-0847" required><NativeSelectOption value="MAT-H-0847">MAT-H-0847 · released</NativeSelectOption><NativeSelectOption value="MAT-H-0839">MAT-H-0839 · released</NativeSelectOption><NativeSelectOption value="MAT-H-0842">MAT-H-0842 · held (not eligible)</NativeSelectOption></NativeSelect>
        </Field>
        <Field label="Packaging date" htmlFor="pack-date" required><Input id="pack-date" name="packDate" type="date" defaultValue="2026-09-04" required /></Field>
        <Field label="Package format" htmlFor="pack-format" required><NativeSelect id="pack-format" name="format" defaultValue="250g" required><NativeSelectOption value="250g">250 g</NativeSelectOption><NativeSelectOption value="500g">500 g</NativeSelectOption><NativeSelectOption value="1kg">1 kg</NativeSelectOption></NativeSelect></Field>
        <Field label="Planned units" htmlFor="pack-units" required><Input id="pack-units" name="units" type="number" min="1" step="1" defaultValue="1920" required /></Field>
        <Field label="Batch / lot code" htmlFor="pack-code" required hint="Human-readable code mapped to a permanent internal batch ID."><Input id="pack-code" name="batchCode" defaultValue="HB-26-0042" required /></Field>
        <Field label="Packaging line / location" htmlFor="pack-line" required><Input id="pack-line" name="line" defaultValue="Line 01 · Packing room" required /></Field>
        <Field label="Operator note" htmlFor="pack-note"><Input id="pack-note" name="note" placeholder="Optional production note" /></Field>
      </div>
      <fieldset className="packaging-checks">
        <legend>Prerequisite checks · {readyCount}/3 selected</legend>
        <Label><Checkbox checked={checks.quality} onCheckedChange={() => toggleCheck('quality')} /><span><strong>Quality disposition reviewed</strong><small>Lot is released or has an authorized packaging disposition.</small></span><Check aria-hidden="true" size={15} /></Label>
        <Label><Checkbox checked={checks.label} onCheckedChange={() => toggleCheck('label')} /><span><strong>Label specification checked</strong><small>Product name, metric contents, producer, date and lot fields are present.</small></span><Check aria-hidden="true" size={15} /></Label>
        <Label><Checkbox checked={checks.inventory} onCheckedChange={() => toggleCheck('inventory')} /><span><strong>Packaging inventory recorded</strong><small>Packaging materials are available and the inventory record is linked.</small></span><Check aria-hidden="true" size={15} /></Label>
      </fieldset>
      <div className="form-actions">
        {staged ? <span className="form-status" role="status"><PackageCheck aria-hidden="true" size={14} /> Run staged locally · online commit required</span> : <span className="form-status muted-form-status">{readyCount === 3 ? 'Ready for review' : `${3 - readyCount} prerequisite check${3 - readyCount === 1 ? '' : 's'} remaining`}</span>}
        <Button className="secondary-button" type="button"><QrCode aria-hidden="true" size={15} /> Preview label</Button>
        <Button className="primary-button" type="submit"><PackageCheck aria-hidden="true" size={15} /> Stage packaging run</Button>
      </div>
    </form>
  );
}
