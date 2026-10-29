import { createHash } from 'node:crypto';
import { Decimal } from '@/domain';

export type ImportKind = 'farmers' | 'apiaries';
export type ImportIssueSeverity = 'error' | 'warning';

export type ImportIssue = {
  rowNumber: number;
  field: string | null;
  code: string;
  message: string;
  severity: ImportIssueSeverity;
};

export type ImportRow = {
  rowNumber: number;
  raw: Record<string, string>;
  normalized: Record<string, string>;
  issues: ImportIssue[];
  outcome: 'valid' | 'correction_required' | 'duplicate_review';
};

export type ImportPreview = {
  kind: ImportKind;
  templateVersion: string;
  sourceSha256: string;
  headers: string[];
  headerIssues: string[];
  rows: ImportRow[];
  summary: {
    total: number;
    valid: number;
    correctionRequired: number;
    duplicateReview: number;
  };
};

export const FIXED_IMPORT_TEMPLATES: Readonly<Record<ImportKind, {
  version: string;
  columns: readonly string[];
  description: string;
}>> = {
  farmers: {
    version: 'farmers-v1',
    columns: ['external_reference', 'display_name', 'phone', 'email', 'region_name', 'consent_status', 'consent_policy_version'],
    description: 'Existing farmer records. Do not include signatures, identity documents or exact home coordinates.',
  },
  apiaries: {
    version: 'apiaries-v1',
    columns: ['external_reference', 'farmer_external_reference', 'name', 'region_name', 'latitude', 'longitude', 'coordinate_precision_m'],
    description: 'Existing apiary records. Coordinates are optional and remain private operational fields.',
  },
};

export type ImportPreviewOptions = {
  existingExternalReferences?: readonly string[];
  existingFarmerReferences?: readonly string[];
};

export type ImportTableRow = {
  readonly rowNumber: number;
  readonly values: readonly string[];
};

function sha256(value: string): string {
  return createHash('sha256').update(value, 'utf8').digest('hex');
}

function normalize(value: string): string {
  return value.replace(/^\uFEFF/, '').trim().replace(/\s+/g, ' ');
}

function parseCsv(value: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    if (quoted) {
      if (character === '"' && value[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        cell += character;
      }
      continue;
    }

    if (character === '"' && cell.length === 0) {
      quoted = true;
    } else if (character === ',') {
      row.push(cell);
      cell = '';
    } else if (character === '\n' || character === '\r') {
      if (character === '\r' && value[index + 1] === '\n') index += 1;
      row.push(cell);
      if (row.some((item) => item.trim() !== '')) rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += character;
    }
  }

  if (quoted) throw new Error('CSV contains an unterminated quoted field.');
  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    if (row.some((item) => item.trim() !== '')) rows.push(row);
  }
  return rows;
}

function addIssue(
  issues: ImportIssue[],
  rowNumber: number,
  field: string | null,
  code: string,
  message: string,
  severity: ImportIssueSeverity = 'error',
): void {
  issues.push({ rowNumber, field, code, message, severity });
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validPhone(value: string): boolean {
  return /^\+?[1-9][0-9]{6,14}$/.test(value.replace(/[\s().-]/g, ''));
}

function validDecimalInRange(value: string, minimum: string, maximum: string): boolean {
  try {
    const decimal = Decimal.from(value);
    return decimal.greaterThanOrEqual(minimum) && decimal.lessThanOrEqual(maximum);
  } catch {
    return false;
  }
}

function validateRow(kind: ImportKind, rowNumber: number, raw: Record<string, string>, options: ImportPreviewOptions): ImportRow {
  const normalized = Object.fromEntries(Object.entries(raw).map(([key, value]) => [key, normalize(value)]));
  const issues: ImportIssue[] = [];
  const externalReference = normalized.external_reference;
  const existingExternalReferences = new Set(options.existingExternalReferences?.map((value) => normalize(value).toLowerCase()));
  const existingFarmerReferences = new Set(options.existingFarmerReferences?.map((value) => normalize(value).toLowerCase()));

  if (!externalReference) addIssue(issues, rowNumber, 'external_reference', 'required', 'External reference is required.');
  if (externalReference && existingExternalReferences.has(externalReference.toLowerCase())) {
    addIssue(issues, rowNumber, 'external_reference', 'duplicate_candidate', 'Reference already exists; resolve the match before commit.', 'warning');
  }

  if (kind === 'farmers') {
    if (!normalized.display_name) addIssue(issues, rowNumber, 'display_name', 'required', 'Display name is required.');
    if (normalized.phone && !validPhone(normalized.phone)) addIssue(issues, rowNumber, 'phone', 'invalid_phone', 'Phone must use a valid international-style number.');
    if (normalized.email && !validEmail(normalized.email)) addIssue(issues, rowNumber, 'email', 'invalid_email', 'Email is not valid.');
    if (!['pending', 'granted', 'withdrawn', 'not_required'].includes(normalized.consent_status)) {
      addIssue(issues, rowNumber, 'consent_status', 'invalid_consent', 'Consent status must be pending, granted, withdrawn or not_required.');
    }
    if (!normalized.consent_policy_version) addIssue(issues, rowNumber, 'consent_policy_version', 'required', 'Consent policy version is required.');
  } else {
    if (!normalized.farmer_external_reference) addIssue(issues, rowNumber, 'farmer_external_reference', 'required', 'Farmer external reference is required.');
    if (normalized.farmer_external_reference && options.existingFarmerReferences && !existingFarmerReferences.has(normalized.farmer_external_reference.toLowerCase())) {
      addIssue(issues, rowNumber, 'farmer_external_reference', 'missing_relation', 'Farmer reference was not found in the supplied existing/reference set.');
    }
    if (!normalized.name) addIssue(issues, rowNumber, 'name', 'required', 'Apiary name is required.');
    const hasLatitude = Boolean(normalized.latitude);
    const hasLongitude = Boolean(normalized.longitude);
    if (hasLatitude !== hasLongitude) addIssue(issues, rowNumber, 'latitude', 'coordinate_pair', 'Latitude and longitude must be supplied together.');
    if (hasLatitude && !validDecimalInRange(normalized.latitude, '-90', '90')) addIssue(issues, rowNumber, 'latitude', 'invalid_coordinate', 'Latitude must be an exact decimal between -90 and 90.');
    if (hasLongitude && !validDecimalInRange(normalized.longitude, '-180', '180')) addIssue(issues, rowNumber, 'longitude', 'invalid_coordinate', 'Longitude must be an exact decimal between -180 and 180.');
    if (normalized.coordinate_precision_m && !validDecimalInRange(normalized.coordinate_precision_m, '0', '100000000')) addIssue(issues, rowNumber, 'coordinate_precision_m', 'invalid_precision', 'Coordinate precision must be a non-negative exact decimal.');
  }

  const hasError = issues.some((issue) => issue.severity === 'error');
  const hasWarning = issues.some((issue) => issue.severity === 'warning');
  return {
    rowNumber,
    raw,
    normalized,
    issues,
    outcome: hasError ? 'correction_required' : hasWarning ? 'duplicate_review' : 'valid',
  };
}

export function previewImportTable(
  kind: ImportKind,
  table: readonly ImportTableRow[],
  sourceSha256: string,
  options: ImportPreviewOptions = {},
): ImportPreview {
  const template = FIXED_IMPORT_TEMPLATES[kind];
  const headers = (table[0]?.values ?? []).map(normalize);
  const headerIssues: string[] = [];
  if (headers.length !== template.columns.length || headers.some((header, index) => header !== template.columns[index])) {
    headerIssues.push(`Expected fixed ${kind} columns in this order: ${template.columns.join(', ')}.`);
  }

  if (headerIssues.length > 0) {
    return {
      kind,
      templateVersion: template.version,
      sourceSha256,
      headers,
      headerIssues,
      rows: [],
      summary: { total: 0, valid: 0, correctionRequired: 0, duplicateReview: 0 },
    };
  }

  const rows: ImportRow[] = [];
  const seenReferences = new Set<string>();
  for (const tableRow of table.slice(1)) {
    const raw = Object.fromEntries(template.columns.map((column, columnIndex) => [column, tableRow.values[columnIndex] ?? '']));
    const row = validateRow(kind, tableRow.rowNumber, raw, options);
    if (tableRow.values.length !== template.columns.length) {
      addIssue(
        row.issues,
        row.rowNumber,
        null,
        'row_width',
        `Expected ${template.columns.length} values but found ${tableRow.values.length}. Correct the row before commit.`,
      );
      row.outcome = 'correction_required';
    }
    const reference = row.normalized.external_reference.toLowerCase();
    if (reference && seenReferences.has(reference)) {
      addIssue(row.issues, row.rowNumber, 'external_reference', 'duplicate_in_file', 'External reference is repeated in this file; resolve it before commit.');
      row.outcome = 'correction_required';
    }
    if (reference) seenReferences.add(reference);
    rows.push(row);
  }

  return {
    kind,
    templateVersion: template.version,
    sourceSha256,
    headers,
    headerIssues,
    rows,
    summary: {
      total: rows.length,
      valid: rows.filter((row) => row.outcome === 'valid').length,
      correctionRequired: rows.filter((row) => row.outcome === 'correction_required').length,
      duplicateReview: rows.filter((row) => row.outcome === 'duplicate_review').length,
    },
  };
}

export function previewCsvImport(kind: ImportKind, csv: string, options: ImportPreviewOptions = {}): ImportPreview {
  const sourceSha256 = sha256(csv);
  let parsed: string[][];
  try {
    parsed = parseCsv(csv);
  } catch (error) {
    return {
      kind,
      templateVersion: FIXED_IMPORT_TEMPLATES[kind].version,
      sourceSha256,
      headers: [],
      headerIssues: [error instanceof Error ? error.message : 'CSV could not be parsed.'],
      rows: [],
      summary: { total: 0, valid: 0, correctionRequired: 0, duplicateReview: 0 },
    };
  }

  return previewImportTable(
    kind,
    parsed.map((values, index) => ({ rowNumber: index + 1, values })),
    sourceSha256,
    options,
  );
}

export function csvTemplate(kind: ImportKind): string {
  const template = FIXED_IMPORT_TEMPLATES[kind];
  return `${template.columns.join(',')}\n`;
}
