export type DemoStage = {
  label: string;
  date: string;
  detail: string;
  status: "approved" | "recorded";
};

export type DemoClaim = {
  wording: string;
  support: string;
  validUntil: string;
  status: "current" | "review due";
};

export type DemoBatch = {
  publicCode: string;
  product: string;
  packageSummary: string;
  packedOn: string;
  status: "published" | "withdrawn";
  response: string;
  region: string;
  sourceSummary: string;
  publicationRevision: string;
  timeline: DemoStage[];
  claims: DemoClaim[];
  facts: Array<{ label: string; value: string }>;
  story: {
    title: string;
    body: string;
  };
};

export const demoBatches: Record<string, DemoBatch> = {
  "HB-26-0042": {
    publicCode: "HB-26-0042",
    product: "Humble Beeing Honey",
    packageSummary: "250 g glass jar · Lot HB-26-0042",
    packedOn: "18 Aug 2026",
    status: "published",
    response: "Approved batch publication",
    region: "Greater Masaka region",
    sourceSummary: "3 contributing apiary records · identity protected",
    publicationRevision: "PUB-2026-08-18-0042",
    timeline: [
      { label: "Source recorded", date: "04 Aug 2026", detail: "Honeycomb purchase accepted and receipt issued.", status: "approved" },
      { label: "Separated", date: "06 Aug 2026", detail: "Honey and beeswax outputs were assigned traceable lot IDs.", status: "approved" },
      { label: "Quality reviewed", date: "11 Aug 2026", detail: "Moisture recorded at 18.6% m/m; release approved.", status: "approved" },
      { label: "Packed", date: "18 Aug 2026", detail: "Packaging run completed with the published batch code.", status: "approved" },
    ],
    claims: [
      { wording: "Traceability record available", support: "Source, separation, quality and packaging records are linked in the approved publication.", validUntil: "18 Nov 2026", status: "current" },
      { wording: "Moisture checked at 18.6% m/m", support: "Quality review QV-2026-0811 and measurement M-2026-0811.", validUntil: "18 Nov 2026", status: "current" },
    ],
    facts: [
      { label: "Batch / lot code", value: "HB-26-0042" },
      { label: "Product", value: "Honey" },
      { label: "Pack size", value: "250 g" },
      { label: "Packed", value: "18 Aug 2026" },
      { label: "Publication revision", value: "PUB-2026-08-18-0042" },
    ],
    story: {
      title: "A record you can follow",
      body: "This page shows the approved facts selected for public sharing. Farmer names, phone numbers, signatures and exact locations stay private.",
    },
  },
};

export const demoDashboard = {
  mode: "local demo",
  lastUpdated: "03 Sep 2026, 09:40 EAT",
  stock: [
    { label: "Honeycomb", value: "186.4 kg", detail: "6 traceable lots", href: "/staff/material?type=honeycomb" },
    { label: "Honey", value: "92.8 kg", detail: "4 available lots", href: "/staff/material?type=honey" },
    { label: "Beeswax", value: "21.3 kg", detail: "2 available lots", href: "/staff/material?type=beeswax" },
  ],
  attention: [
    { label: "Held / quarantined", value: "2", detail: "Requires quality decision", tone: "danger", href: "/staff/quality?filter=held" },
    { label: "Missing evidence", value: "5", detail: "Forms or lab reports", tone: "warning", href: "/staff/operations?tab=forms&filter=missing" },
    { label: "Awaiting review", value: "7", detail: "Across records and documents", tone: "info", href: "/staff/quality?filter=review" },
    { label: "Failed sync", value: "1", detail: "Needs staff resolution", tone: "danger", href: "/staff/operations?tab=forms&filter=sync" },
  ],
  activity: [
    { time: "09:32", type: "Quality", title: "Moisture result reviewed", detail: "QV-2026-0811 · released", tone: "success" },
    { time: "08:58", type: "Source", title: "Purchase receipt issued", detail: "RCPT-2026-0903-014 · saved locally", tone: "info" },
    { time: "Yesterday", type: "Packaging", title: "Packing run committed", detail: "HB-26-0042 · 250 g", tone: "neutral" },
    { time: "Yesterday", type: "Evidence", title: "Cleaning record uploaded", detail: "CR-2026-0902-006 · under review", tone: "warning" },
  ],
};

export const demoForms = [
  { code: "FRM-CLN", title: "Cleaning Record", version: "1.2", owner: "Quality", status: "Effective", review: "30 Sep 2026" },
  { code: "FRM-PBL", title: "Processing & Blending Form", version: "1.0", owner: "Production", status: "Effective", review: "15 Oct 2026" },
  { code: "FRM-PCK", title: "Packed Product Record", version: "1.1", owner: "Quality", status: "Effective", review: "30 Sep 2026" },
  { code: "FRM-EQM", title: "Equipment Maintenance Record", version: "1.0", owner: "Production", status: "Effective", review: "01 Nov 2026" },
  { code: "FRM-TRN", title: "Employee Training Record", version: "1.0", owner: "Administration", status: "Effective", review: "01 Dec 2026" },
  { code: "FRM-NCM", title: "Non-Conforming Materials Record", version: "1.0", owner: "Quality", status: "Effective", review: "30 Sep 2026" },
  { code: "FRM-PKG", title: "Packaging Inventory Record", version: "1.0", owner: "Production", status: "Effective", review: "15 Oct 2026" },
];

export const demoSops = [
  { code: "QC-003", title: "Cleaning Jars SOP / Jar Sanitisation", version: "2.1", owner: "Quality manager", effective: "01 Jul 2026", review: "01 Jan 2027", training: "Required" },
  { code: "PR-001", title: "Processing Honey SOP", version: "1.0", owner: "Production supervisor", effective: "15 Aug 2026", review: "15 Feb 2027", training: "Required" },
  { code: "HACCP-001", title: "Honey Production HACCP Plan", version: "1.0", owner: "Quality manager", effective: "15 Aug 2026", review: "15 Feb 2027", training: "Read acknowledgement" },
];

export function getDemoBatch(code: string) {
  return demoBatches[code.trim().toUpperCase()];
}
