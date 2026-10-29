import { deflateRawSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import { previewXlsxImport } from './xlsx';

type ZipEntry = { readonly name: string; readonly content: string };

function xlsxEscape(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function makeZip(entries: readonly ZipEntry[]): Uint8Array {
  const localParts: Buffer[] = [];
  const centralParts: Buffer[] = [];
  let offset = 0;

  for (const entry of entries) {
    const name = Buffer.from(entry.name, 'utf8');
    const content = Buffer.from(entry.content, 'utf8');
    const compressed = deflateRawSync(content);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(8, 8);
    local.writeUInt16LE(8, 10);
    local.writeUInt32LE(0, 14);
    local.writeUInt32LE(compressed.byteLength, 18);
    local.writeUInt32LE(content.byteLength, 22);
    local.writeUInt16LE(name.byteLength, 26);
    local.writeUInt16LE(0, 28);
    localParts.push(local, name, compressed);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(8, 8);
    central.writeUInt16LE(8, 10);
    central.writeUInt32LE(0, 16);
    central.writeUInt32LE(compressed.byteLength, 20);
    central.writeUInt32LE(content.byteLength, 24);
    central.writeUInt16LE(name.byteLength, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(offset, 42);
    centralParts.push(central, name);
    offset += local.byteLength + name.byteLength + compressed.byteLength;
  }

  const localData = Buffer.concat(localParts);
  const centralDirectory = Buffer.concat(centralParts);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralDirectory.byteLength, 12);
  end.writeUInt32LE(localData.byteLength, 16);
  return Buffer.concat([localData, centralDirectory, end]);
}

function makeFarmersWorkbook(): Uint8Array {
  const values = [
    'external_reference',
    'display_name',
    'phone',
    'email',
    'region_name',
    'consent_status',
    'consent_policy_version',
    'SUP-XLSX-001',
    'Mirembe Cooperative',
    '+256700123456',
    'ops@example.com',
    'Central',
    'granted',
    'privacy-v1',
  ];
  const sharedStrings = `<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="${values.length}" uniqueCount="${values.length}">${values.map((value) => `<si><t>${xlsxEscape(value)}</t></si>`).join('')}</sst>`;
  const rows = [
    values.slice(0, 7),
    values.slice(7, 14),
  ].map((row, rowIndex) => `<row r="${rowIndex + 1}">${row.map((_, columnIndex) => {
    const reference = `${String.fromCharCode(65 + columnIndex)}${rowIndex + 1}`;
    const sharedIndex = rowIndex === 0 ? columnIndex : columnIndex + 7;
    return `<c r="${reference}" t="s"><v>${sharedIndex}</v></c>`;
  }).join('')}</row>`).join('');
  const worksheet = `<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${rows}</sheetData></worksheet>`;
  const workbook = `<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Farmers" sheetId="1" r:id="rId1"/></sheets></workbook>`;
  const relationships = `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>`;
  return makeZip([
    { name: 'xl/workbook.xml', content: workbook },
    { name: 'xl/_rels/workbook.xml.rels', content: relationships },
    { name: 'xl/sharedStrings.xml', content: sharedStrings },
    { name: 'xl/worksheets/sheet1.xml', content: worksheet },
  ]);
}

describe('fixed XLSX import preview', () => {
  it('reads compressed shared-string cells and preserves worksheet row numbers', () => {
    const preview = previewXlsxImport('farmers', makeFarmersWorkbook());

    expect(preview.headerIssues).toEqual([]);
    expect(preview.summary).toEqual({ total: 1, valid: 1, correctionRequired: 0, duplicateReview: 0 });
    expect(preview.rows[0]).toMatchObject({
      rowNumber: 2,
      normalized: { external_reference: 'SUP-XLSX-001', display_name: 'Mirembe Cooperative' },
    });
    expect(preview.sourceSha256).toMatch(/^[0-9a-f]{64}$/);
  });

  it('rejects a non-XLSX archive without attempting to interpret it as a table', () => {
    const preview = previewXlsxImport('farmers', new TextEncoder().encode('not a zip archive'));

    expect(preview.rows).toEqual([]);
    expect(preview.headerIssues[0]).toContain('XLSX');
  });
});
