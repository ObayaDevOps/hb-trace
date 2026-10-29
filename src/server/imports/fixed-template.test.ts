import { describe, expect, it } from 'vitest';
import { previewCsvImport } from './fixed-template';

describe('fixed farmer and apiary imports', () => {
  it('previews valid rows and flags duplicate review without auto-merging', () => {
    const csv = [
      'external_reference,display_name,phone,email,region_name,consent_status,consent_policy_version',
      'SUP-001,"Mirembe Cooperative",+256700123456,ops@example.com,Central,granted,privacy-v1',
      'SUP-001,"Second row",+256700123457,,Central,granted,privacy-v1',
    ].join('\n');
    const preview = previewCsvImport('farmers', csv);

    expect(preview.summary).toEqual({ total: 2, valid: 1, correctionRequired: 1, duplicateReview: 0 });
    expect(preview.rows[1].issues[0]).toMatchObject({ code: 'duplicate_in_file', severity: 'error' });
  });

  it('reports fixed-header, relation and coordinate errors', () => {
    const csv = [
      'external_reference,farmer_external_reference,name,region_name,latitude,longitude,coordinate_precision_m',
      'API-001,SUP-404,Apiary 1,Central,91,,10',
    ].join('\n');
    const preview = previewCsvImport('apiaries', csv, { existingFarmerReferences: ['SUP-001'] });

    expect(preview.summary.correctionRequired).toBe(1);
    expect(preview.rows[0].issues.map((issue) => issue.code)).toEqual(expect.arrayContaining(['missing_relation', 'coordinate_pair', 'invalid_coordinate']));
  });

  it('returns a deterministic source hash for idempotent resubmission', () => {
    const csv = 'external_reference,display_name,phone,email,region_name,consent_status,consent_policy_version\n';
    expect(previewCsvImport('farmers', csv).sourceSha256).toBe(previewCsvImport('farmers', csv).sourceSha256);
  });

  it('does not silently truncate short or long rows', () => {
    const csv = [
      'external_reference,display_name,phone,email,region_name,consent_status,consent_policy_version',
      'SUP-SHORT,Amina,+256700123456,ops@example.com,Central,granted',
      'SUP-LONG,Amina,+256700123456,ops@example.com,Central,granted,privacy-v1,unexpected',
    ].join('\n');
    const preview = previewCsvImport('farmers', csv);

    expect(preview.rows.map((row) => row.issues.map((issue) => issue.code))).toEqual([
      expect.arrayContaining(['row_width', 'required']),
      expect.arrayContaining(['row_width']),
    ]);
    expect(preview.summary.correctionRequired).toBe(2);
  });
});
