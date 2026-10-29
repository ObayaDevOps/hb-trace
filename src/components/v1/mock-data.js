/**
 * HB-TRACE V1 demo fixtures.
 *
 * These records deliberately stay in the UI layer. They are shaped like the
 * application projections that the API will provide, but they are not a
 * substitute for server records or authorization.
 */

/** @typedef {'success'|'warning'|'danger'|'info'|'neutral'|'gold'} StatusTone */

/**
 * @typedef {Object} DashboardMetric
 * @property {string} label
 * @property {string} value
 * @property {string} meta
 * @property {string} href
 * @property {StatusTone} tone
 * @property {string} icon
 */

/** @type {DashboardMetric[]} */
export const demoMetrics = [
  {
    label: 'Honeycomb on hand',
    value: '312 kg',
    meta: '4 storage locations',
    href: '/staff/material?filter=honeycomb',
    tone: 'gold',
    icon: 'comb',
  },
  {
    label: 'Honey available',
    value: '1,284 kg',
    meta: '11 traceable lots',
    href: '/staff/material?filter=honey',
    tone: 'success',
    icon: 'droplet',
  },
  {
    label: 'Beeswax on hand',
    value: '86 kg',
    meta: '3 storage locations',
    href: '/staff/material?filter=beeswax',
    tone: 'info',
    icon: 'layers',
  },
  {
    label: 'Open holds',
    value: '2',
    meta: '1 needs action today',
    href: '/staff/quality?filter=holds',
    tone: 'danger',
    icon: 'shield-alert',
  },
];

export const demoStock = [
  { type: 'Honeycomb', amount: '312 kg', lots: '4 lots', location: 'Collection cold room', age: '0–6 days', tone: 'gold' },
  { type: 'Honey', amount: '1,284 kg', lots: '11 lots', location: 'Tank room / Store B', age: '2–28 days', tone: 'success' },
  { type: 'Beeswax', amount: '86 kg', lots: '3 lots', location: 'Dry store', age: '4–19 days', tone: 'info' },
];

export const demoAttention = [
  {
    title: 'Quality hold needs disposition',
    detail: 'MAT-H-0842 · moisture result is above the review threshold',
    action: 'Open quality queue',
    href: '/staff/quality?filter=holds',
    tone: 'danger',
  },
  {
    title: 'Evidence missing before packaging',
    detail: 'HB-26-0042 · processing form has not been attached',
    action: 'Review evidence',
    href: '/staff/operations?tab=forms',
    tone: 'warning',
  },
  {
    title: 'Three collection drafts are local only',
    detail: 'This device has not received a server acknowledgement',
    action: 'Open sync queue',
    href: '/staff/sourcing?filter=local',
    tone: 'info',
  },
  {
    title: 'SOP review due this week',
    detail: 'QC-003 · owner review due 06 Sep 2026',
    action: 'Open document library',
    href: '/staff/operations?tab=sops',
    tone: 'neutral',
  },
];

export const demoActivity = [
  { event: 'Purchase captured', reference: 'PUR-2026-018', operator: 'Collection desk', when: 'Today · 09:32', status: 'Saved locally', tone: 'info' },
  { event: 'Moisture recorded', reference: 'MAT-H-0847', operator: 'Quality desk', when: 'Today · 08:54', status: 'Awaiting review', tone: 'warning' },
  { event: 'Packaging run staged', reference: 'PKG-2026-009', operator: 'Production desk', when: 'Yesterday · 16:18', status: 'Needs approval', tone: 'neutral' },
  { event: 'Cleaning record submitted', reference: 'FRM-2026-044', operator: 'Production desk', when: 'Yesterday · 14:06', status: 'Under review', tone: 'warning' },
  { event: 'Batch publication revised', reference: 'HB-26-0042', operator: 'Quality manager', when: '02 Sep · 11:21', status: 'Published snapshot', tone: 'success' },
];

export const demoPurchases = [
  { id: 'PUR-2026-018', supplier: 'Mirembe Cooperative', apiary: 'Apiary 014', collected: '03 Sep 2026', quantity: '48 kg', grade: 'A', payment: 'Pending confirmation', status: 'Saved locally', tone: 'info' },
  { id: 'PUR-2026-017', supplier: 'Kato Family Apiary', apiary: 'Apiary 009', collected: '02 Sep 2026', quantity: '62 kg', grade: 'A', payment: 'Paid · mobile money', status: 'Confirmed', tone: 'success' },
  { id: 'PUR-2026-016', supplier: 'Nabirye Apiary Group', apiary: 'Apiary 006', collected: '01 Sep 2026', quantity: '37 kg', grade: 'B', payment: 'Dispute under review', status: 'Needs review', tone: 'warning' },
  { id: 'PUR-2026-015', supplier: 'Supplier 011', apiary: 'Apiary 003', collected: '31 Aug 2026', quantity: '54 kg', grade: 'A', payment: 'Confirmed', status: 'Server acknowledged', tone: 'success' },
];

export const demoLineage = {
  backward: [
    { id: 'HB-26-0042', kind: 'Sale batch', title: 'HB-26-0042', subtitle: 'Packed honey · 250 g format', quantity: '1,920 units', detail: 'Packaging run PKG-2026-031 · 18 Aug 2026', tone: 'success' },
    { id: 'MAT-H-0847', kind: 'Honey lot', title: 'MAT-H-0847', subtitle: 'Blended honey lot', quantity: '486 kg allocated', detail: 'Blend BL-2026-014 · released for packing', tone: 'gold' },
    { id: 'TRX-2026-006', kind: 'Transformation', title: 'TRX-2026-006', subtitle: 'Separation and settling', quantity: '520 kg input', detail: 'Honey output 498 kg · beeswax output 19 kg', tone: 'info' },
    { id: 'PUR-2026-018', kind: 'Purchase', title: 'PUR-2026-018', subtitle: 'Honeycomb purchase', quantity: '132 kg', detail: 'Collection region: Central Uganda · 2 source partners', tone: 'neutral' },
  ],
  forward: [
    { id: 'PUR-2026-018', kind: 'Purchase', title: 'PUR-2026-018', subtitle: 'Honeycomb purchase', quantity: '132 kg', detail: 'Accepted · source record retained', tone: 'neutral' },
    { id: 'TRX-2026-006', kind: 'Transformation', title: 'TRX-2026-006', subtitle: 'Separation and settling', quantity: '520 kg input', detail: '2 outputs · exact source allocation recorded', tone: 'info' },
    { id: 'MAT-H-0847', kind: 'Honey lot', title: 'MAT-H-0847', subtitle: 'Blended honey lot', quantity: '486 kg allocated', detail: 'Quality review QR-2026-028 · released', tone: 'gold' },
    { id: 'HB-26-0042', kind: 'Sale batch', title: 'HB-26-0042', subtitle: 'Packed honey · 250 g format', quantity: '1,920 units', detail: 'Public snapshot active · batch code only', tone: 'success' },
  ],
};

export const demoMaterialRows = [
  { code: 'MAT-H-0847', material: 'Honey', quantity: '486 kg', location: 'Tank room', state: 'Released', tone: 'success', age: '28 days' },
  { code: 'MAT-H-0842', material: 'Honey', quantity: '104 kg', location: 'Quarantine bay', state: 'Held', tone: 'danger', age: '31 days' },
  { code: 'MAT-W-0118', material: 'Beeswax', quantity: '28 kg', location: 'Dry store', state: 'Available', tone: 'info', age: '19 days' },
  { code: 'MAT-C-0221', material: 'Honeycomb', quantity: '74 kg', location: 'Collection cold room', state: 'Available', tone: 'gold', age: '6 days' },
];

export const demoQualityHolds = [
  { id: 'HLD-014', material: 'MAT-H-0842', reason: 'Moisture reading requires investigation', opened: '02 Sep 2026', owner: 'Quality manager', next: 'Retest or document disposition', tone: 'danger' },
  { id: 'HLD-013', material: 'MAT-H-0835', reason: 'Missing laboratory report attachment', opened: '29 Aug 2026', owner: 'Quality desk', next: 'Attach report and review', tone: 'warning' },
];

export const demoQualityReviews = [
  { lot: 'MAT-H-0847', product: 'Honey', moisture: '18.4% m/m', rule: '≤ 20% m/m', method: 'Handheld meter', review: 'Awaiting sign-off', tone: 'warning' },
  { lot: 'MAT-H-0839', product: 'Honey', moisture: '19.1% m/m', rule: '≤ 20% m/m', method: 'Lab report LR-2026-041', review: 'Released', tone: 'success' },
  { lot: 'MAT-W-0118', product: 'Beeswax', moisture: 'Not recorded', rule: 'Applicability review pending', method: '—', review: 'Hold for specification', tone: 'danger' },
];

export const demoPackagingRuns = [
  { id: 'PKG-2026-009', batch: 'HB-26-0042', product: 'Honey', format: '250 g', units: '1,920', packed: '18 Aug 2026', state: 'Draft', tone: 'neutral' },
  { id: 'PKG-2026-008', batch: 'HB-26-0041', product: 'Honey', format: '500 g', units: '840', packed: '29 Aug 2026', state: 'Released', tone: 'success' },
  { id: 'PKG-2026-007', batch: 'HB-26-0039', product: 'Honey', format: '250 g', units: '1,440', packed: '26 Aug 2026', state: 'Withdrawn', tone: 'danger' },
];

export const demoPublicBatch = {
  code: 'HB-26-0042',
  product: 'Humble Beeing Honey',
  format: '250 g packed product',
  packedOn: '18 August 2026',
  region: 'Central Uganda',
  sourceSummary: '2 source partners · location generalized for privacy',
  publication: 'Approved snapshot · revision 03',
  quality: 'Moisture recorded at 18.4% m/m · review completed',
  timeline: [
    { stage: 'Source received', date: '04 Aug 2026', detail: 'Honeycomb received and assigned to an internal source record.', state: 'complete' },
    { stage: 'Materials separated', date: '06 Aug 2026', detail: 'Honey and beeswax outputs were recorded with direct source allocations.', state: 'complete' },
    { stage: 'Quality reviewed', date: '11 Aug 2026', detail: 'A moisture measurement was reviewed against the active honey rule set.', state: 'complete' },
    { stage: 'Packed as a batch', date: '18 Aug 2026', detail: 'The packaged product was assigned batch code HB-26-0042.', state: 'complete' },
  ],
  facts: [
    ['Batch code', 'HB-26-0042'],
    ['Product format', '250 g packed product'],
    ['Packed on', '18 August 2026'],
    ['Source region', 'Central Uganda'],
    ['Quality record', 'Moisture measurement reviewed'],
    ['Publication status', 'Active approved snapshot'],
  ],
};

export const demoForms = [
  { code: 'FRM-001', title: 'Cleaning Record', version: 'v1.2', owner: 'Production supervisor', review: '15 Oct 2026', status: 'Effective', tone: 'success', pages: '2 pages' },
  { code: 'FRM-002', title: 'Processing & Blending Form', version: 'v1.1', owner: 'Quality manager', review: '15 Oct 2026', status: 'Effective', tone: 'success', pages: '3 pages' },
  { code: 'FRM-003', title: 'Packed Product Record', version: 'v1.0', owner: 'Production supervisor', review: '01 Nov 2026', status: 'Effective', tone: 'success', pages: '2 pages' },
  { code: 'FRM-004', title: 'Equipment Maintenance Record', version: 'v1.0', owner: 'Technical lead', review: '01 Nov 2026', status: 'Effective', tone: 'success', pages: '2 pages' },
  { code: 'FRM-005', title: 'Employee Training Record', version: 'v1.0', owner: 'Quality manager', review: '01 Nov 2026', status: 'Effective', tone: 'success', pages: '1 page' },
  { code: 'FRM-006', title: 'Non-Conforming Materials Record', version: 'v1.0', owner: 'Quality manager', review: '01 Nov 2026', status: 'Effective', tone: 'success', pages: '2 pages' },
  { code: 'FRM-007', title: 'Packaging Inventory Record', version: 'v1.0', owner: 'Production supervisor', review: '01 Nov 2026', status: 'Effective', tone: 'success', pages: '2 pages' },
];

export const demoSops = [
  { code: 'QC-003', title: 'Cleaning Jars SOP / Jar Sanitisation', version: 'v2.0', owner: 'Quality manager', approver: 'Quality manager', effective: '01 Jun 2026', review: '06 Sep 2026', status: 'Review due', tone: 'warning', training: 'Required' },
  { code: 'PR-001', title: 'Processing Honey SOP', version: 'v1.4', owner: 'Production supervisor', approver: 'Quality manager', effective: '15 Jul 2026', review: '15 Jan 2027', status: 'Effective', tone: 'success', training: 'Required' },
  { code: 'HACCP-001', title: 'Honey Production HACCP Plan', version: 'v1.1', owner: 'Quality manager', approver: 'Quality manager', effective: '15 Jul 2026', review: '15 Jan 2027', status: 'Effective', tone: 'success', training: 'Reference' },
  { code: 'QC-003', title: 'Cleaning Jars SOP / Jar Sanitisation', version: 'v1.3', owner: 'Quality manager', approver: 'Quality manager', effective: '01 Jan 2026', review: 'Superseded', status: 'Historical', tone: 'neutral', training: 'Required' },
];

export const demoRequirements = [
  { source: 'US EAS 36:2020', title: 'Honey identity and quality checks', owner: 'Quality manager', cadence: 'Per batch', evidence: 'Lineage, measurement, lab result, packed-product record', status: 'Active working register', tone: 'success' },
  { source: 'US 28 EAS 39:2002', title: 'Cleaning, hygiene and corrective action', owner: 'Production supervisor', cadence: 'Per shift / event', evidence: 'Cleaning record, training, maintenance, non-conformance', status: 'Active working register', tone: 'success' },
  { source: 'US EAS 38:2014', title: 'Pre-packaged food label checks', owner: 'Quality manager', cadence: 'Each label revision', evidence: 'Label approval, packaging inventory, batch record', status: 'Active working register', tone: 'success' },
  { source: 'CERT/PC/F18', title: 'Distinctive mark readiness checklist', owner: 'Quality manager', cadence: 'Review cycle', evidence: 'Certification checklist and supporting records', status: 'Readiness only', tone: 'warning' },
  { source: 'US EAS 992:2020', title: 'Beeswax applicability review', owner: 'Quality manager', cadence: 'Before beeswax release', evidence: 'Licensed standard review and specification decision', status: 'Decision pending', tone: 'danger' },
];
