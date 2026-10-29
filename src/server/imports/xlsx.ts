import { createHash } from 'node:crypto';
import { inflateRawSync } from 'node:zlib';
import {
  FIXED_IMPORT_TEMPLATES,
  previewImportTable,
  type ImportKind,
  type ImportPreview,
  type ImportPreviewOptions,
  type ImportTableRow,
} from './fixed-template';

/** Keep workbook handling bounded; the preview route applies the same limit. */
export const MAX_XLSX_BYTES = 2 * 1024 * 1024;
const MAX_ZIP_ENTRIES = 256;
const MAX_ZIP_ENTRY_BYTES = 8 * 1024 * 1024;
const MAX_ZIP_UNCOMPRESSED_BYTES = 16 * 1024 * 1024;

export const XLSX_MEDIA_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

type XmlElement = {
  readonly attributes: string;
  readonly body: string;
};

function sha256(bytes: Uint8Array): string {
  return createHash('sha256').update(bytes).digest('hex');
}

function readUInt16(bytes: Uint8Array, offset: number): number {
  if (offset < 0 || offset + 2 > bytes.byteLength) throw new Error('XLSX archive is truncated.');
  return bytes[offset] | (bytes[offset + 1] << 8);
}

function readUInt32(bytes: Uint8Array, offset: number): number {
  if (offset < 0 || offset + 4 > bytes.byteLength) throw new Error('XLSX archive is truncated.');
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  ) >>> 0;
}

function assertRange(bytes: Uint8Array, start: number, length: number, message: string): void {
  if (start < 0 || length < 0 || start + length > bytes.byteLength) throw new Error(message);
}

function decodeUtf8(bytes: Uint8Array): string {
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    throw new Error('XLSX archive contains a file name or XML document that is not valid UTF-8.');
  }
}

function safeZipPath(name: string): string {
  const normalized = name.replaceAll('\\', '/');
  if (!normalized || normalized.startsWith('/') || normalized.includes('\0')) {
    throw new Error('XLSX archive contains an unsafe path.');
  }
  const parts = normalized.split('/');
  if (parts.some((part) => part === '..' || part === '.')) {
    throw new Error('XLSX archive contains an unsafe relative path.');
  }
  return normalized;
}

function findEndOfCentralDirectory(bytes: Uint8Array): number {
  const minimumOffset = Math.max(0, bytes.byteLength - 22 - 0xffff);
  for (let offset = bytes.byteLength - 22; offset >= minimumOffset; offset -= 1) {
    if (readUInt32(bytes, offset) === 0x06054b50) return offset;
  }
  throw new Error('XLSX archive has no end-of-central-directory record.');
}

function readZipEntries(source: Uint8Array): ReadonlyMap<string, Uint8Array> {
  if (source.byteLength < 22) throw new Error('XLSX archive is too small.');

  const end = findEndOfCentralDirectory(source);
  const disk = readUInt16(source, end + 4);
  const centralDirectoryDisk = readUInt16(source, end + 6);
  const entriesOnDisk = readUInt16(source, end + 8);
  const entryCount = readUInt16(source, end + 10);
  const centralDirectorySize = readUInt32(source, end + 12);
  const centralDirectoryOffset = readUInt32(source, end + 16);
  const commentLength = readUInt16(source, end + 20);

  if (disk !== 0 || centralDirectoryDisk !== 0 || entriesOnDisk !== entryCount) {
    throw new Error('Multi-disk XLSX archives are not supported.');
  }
  if (entryCount > MAX_ZIP_ENTRIES) throw new Error('XLSX archive contains too many entries.');
  if (end + 22 + commentLength > source.byteLength) throw new Error('XLSX archive comment is truncated.');
  assertRange(source, centralDirectoryOffset, centralDirectorySize, 'XLSX central directory is truncated.');

  const entries = new Map<string, Uint8Array>();
  let cursor = centralDirectoryOffset;
  let totalUncompressedBytes = 0;

  for (let index = 0; index < entryCount; index += 1) {
    if (readUInt32(source, cursor) !== 0x02014b50) throw new Error('XLSX central directory entry is invalid.');
    assertRange(source, cursor, 46, 'XLSX central directory entry is truncated.');

    const flags = readUInt16(source, cursor + 8);
    const method = readUInt16(source, cursor + 10);
    const compressedSize = readUInt32(source, cursor + 20);
    const uncompressedSize = readUInt32(source, cursor + 24);
    const nameLength = readUInt16(source, cursor + 28);
    const extraLength = readUInt16(source, cursor + 30);
    const commentSize = readUInt16(source, cursor + 32);
    const localHeaderOffset = readUInt32(source, cursor + 42);
    const entryLength = 46 + nameLength + extraLength + commentSize;
    assertRange(source, cursor, entryLength, 'XLSX central directory entry is truncated.');

    if ((flags & 0x0001) !== 0) throw new Error('Encrypted XLSX entries are not supported.');
    if (compressedSize === 0xffffffff || uncompressedSize === 0xffffffff || localHeaderOffset === 0xffffffff) {
      throw new Error('ZIP64 XLSX archives are not supported.');
    }
    if (uncompressedSize > MAX_ZIP_ENTRY_BYTES || totalUncompressedBytes + uncompressedSize > MAX_ZIP_UNCOMPRESSED_BYTES) {
      throw new Error('XLSX archive expands beyond the supported size.');
    }

    const name = safeZipPath(decodeUtf8(source.subarray(cursor + 46, cursor + 46 + nameLength)));
    if (entries.has(name)) throw new Error(`XLSX archive contains duplicate entry ${name}.`);

    if (readUInt32(source, localHeaderOffset) !== 0x04034b50) throw new Error('XLSX local file header is invalid.');
    const localNameLength = readUInt16(source, localHeaderOffset + 26);
    const localExtraLength = readUInt16(source, localHeaderOffset + 28);
    const dataOffset = localHeaderOffset + 30 + localNameLength + localExtraLength;
    assertRange(source, dataOffset, compressedSize, 'XLSX compressed entry is truncated.');
    const compressed = source.subarray(dataOffset, dataOffset + compressedSize);

    let uncompressed: Uint8Array;
    if (method === 0) {
      uncompressed = new Uint8Array(compressed);
    } else if (method === 8) {
      try {
        uncompressed = new Uint8Array(inflateRawSync(compressed));
      } catch {
        throw new Error(`XLSX entry ${name} could not be inflated.`);
      }
    } else {
      throw new Error(`XLSX entry ${name} uses an unsupported compression method.`);
    }

    if (uncompressed.byteLength !== uncompressedSize) throw new Error(`XLSX entry ${name} has an invalid size.`);
    entries.set(name, uncompressed);
    totalUncompressedBytes += uncompressedSize;
    cursor += entryLength;
  }

  if (cursor !== centralDirectoryOffset + centralDirectorySize) {
    throw new Error('XLSX central directory size does not match its entries.');
  }
  return entries;
}

function xmlTagPattern(localName: string): RegExp {
  const name = `(?:(?:[A-Za-z_][\\w.-]*):)?${localName}`;
  return new RegExp(`<${name}\\b([^>]*?)(?:\\/>|>([\\s\\S]*?)<\\/${name}\\s*>)`, 'g');
}

function elements(xml: string, localName: string): XmlElement[] {
  const result: XmlElement[] = [];
  const pattern = xmlTagPattern(localName);
  for (const match of xml.matchAll(pattern)) {
    result.push({ attributes: match[1] ?? '', body: match[2] ?? '' });
  }
  return result;
}

function unescapeXml(value: string): string {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hexadecimal: string) => {
      const codePoint = Number.parseInt(hexadecimal, 16);
      return Number.isSafeInteger(codePoint) ? String.fromCodePoint(codePoint) : '';
    })
    .replace(/&#(\d+);/g, (_, decimal: string) => {
      const codePoint = Number.parseInt(decimal, 10);
      return Number.isSafeInteger(codePoint) ? String.fromCodePoint(codePoint) : '';
    })
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

function attribute(attributes: string, name: string): string | null {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = new RegExp(`(?:^|\\s)${escapedName}\\s*=\\s*(["'])([\\s\\S]*?)\\1`).exec(attributes);
  return match ? unescapeXml(match[2]) : null;
}

function textContent(xml: string): string {
  const cdata = xml.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
  return elements(cdata, 't').map((element) => unescapeXml(element.body)).join('');
}

function xmlDocument(bytes: Uint8Array, name: string): string {
  if (bytes.byteLength > MAX_ZIP_ENTRY_BYTES) throw new Error(`XLSX XML entry ${name} is too large.`);
  const xml = decodeUtf8(bytes).replace(/^\uFEFF/, '');
  if (xml.includes('<!DOCTYPE') || xml.includes('<!ENTITY')) throw new Error('XLSX XML entities are not supported.');
  return xml;
}

function resolveZipPath(sourcePath: string, target: string): string {
  if (target.includes('\0') || target.startsWith('http:') || target.startsWith('https:')) {
    throw new Error('External XLSX relationships are not supported.');
  }
  const parts = (target.startsWith('/') ? target.slice(1) : `${sourcePath.slice(0, sourcePath.lastIndexOf('/'))}/${target}`).split('/');
  const resolved: string[] = [];
  for (const part of parts) {
    if (!part || part === '.') continue;
    if (part === '..') {
      if (resolved.length === 0) throw new Error('XLSX relationship escapes the archive root.');
      resolved.pop();
    } else {
      resolved.push(part);
    }
  }
  return safeZipPath(resolved.join('/'));
}

function columnIndex(reference: string): number {
  const match = /^([A-Za-z]+)\d+$/.exec(reference);
  if (!match) throw new Error(`XLSX cell reference ${reference} is invalid.`);
  let value = 0;
  for (const character of match[1].toUpperCase()) value = value * 26 + character.charCodeAt(0) - 64;
  if (value < 1 || value > 16_384) throw new Error(`XLSX cell reference ${reference} is outside the supported sheet range.`);
  return value - 1;
}

function cellValue(body: string, type: string | null, sharedStrings: readonly string[]): string {
  if (elements(body, 'f').length > 0) throw new Error('Formula cells are not accepted in fixed-template imports.');
  const value = elements(body, 'v')[0]?.body ?? '';
  const decodedValue = unescapeXml(value);

  if (type === 's') {
    const index = Number.parseInt(decodedValue, 10);
    if (!Number.isInteger(index) || index < 0 || index >= sharedStrings.length) {
      throw new Error('XLSX shared-string cell points to a missing value.');
    }
    return sharedStrings[index];
  }
  if (type === 'inlineStr') return textContent(body);
  if (type === 'b') return decodedValue === '1' ? 'TRUE' : 'FALSE';
  return decodedValue;
}

function readTable(entries: ReadonlyMap<string, Uint8Array>): ImportTableRow[] {
  const workbookPath = 'xl/workbook.xml';
  const workbookBytes = entries.get(workbookPath);
  const relationshipsBytes = entries.get('xl/_rels/workbook.xml.rels');
  if (!workbookBytes || !relationshipsBytes) throw new Error('XLSX workbook relationships are missing.');

  const workbook = xmlDocument(workbookBytes, workbookPath);
  const relationships = xmlDocument(relationshipsBytes, 'xl/_rels/workbook.xml.rels');
  const sheet = elements(workbook, 'sheet')[0];
  const relationshipId = sheet ? attribute(sheet.attributes, 'r:id') ?? attribute(sheet.attributes, 'id') : null;
  if (!relationshipId) throw new Error('XLSX workbook has no first worksheet.');

  const relationship = elements(relationships, 'Relationship').find((item) => attribute(item.attributes, 'Id') === relationshipId);
  const target = relationship ? attribute(relationship.attributes, 'Target') : null;
  if (!target || attribute(relationship?.attributes ?? '', 'TargetMode') === 'External') {
    throw new Error('XLSX first worksheet relationship is missing or external.');
  }
  const worksheetPath = resolveZipPath(workbookPath, target);
  const worksheetBytes = entries.get(worksheetPath);
  if (!worksheetBytes) throw new Error('XLSX first worksheet is missing.');

  const sharedStringsBytes = entries.get('xl/sharedStrings.xml');
  const sharedStrings = sharedStringsBytes
    ? elements(xmlDocument(sharedStringsBytes, 'xl/sharedStrings.xml'), 'si').map((item) => textContent(item.body))
    : [];
  const worksheet = xmlDocument(worksheetBytes, worksheetPath);
  const table: ImportTableRow[] = [];
  let previousRowNumber = 0;

  for (const row of elements(worksheet, 'row')) {
    const declaredRowNumber = attribute(row.attributes, 'r');
    const rowNumber = declaredRowNumber ? Number.parseInt(declaredRowNumber, 10) : previousRowNumber + 1;
    if (!Number.isInteger(rowNumber) || rowNumber < 1 || rowNumber > 1_048_576 || rowNumber <= previousRowNumber) {
      throw new Error('XLSX worksheet row numbers are invalid or out of order.');
    }
    previousRowNumber = rowNumber;

    const values: string[] = [];
    let hasValue = false;
    let nextColumn = 0;
    for (const cell of elements(row.body, 'c')) {
      const reference = attribute(cell.attributes, 'r');
      const index = reference ? columnIndex(reference) : nextColumn;
      nextColumn = index + 1;
      const value = cellValue(cell.body, attribute(cell.attributes, 't'), sharedStrings);
      values[index] = value;
      if (value !== '') hasValue = true;
    }
    if (hasValue) table.push({ rowNumber, values });
  }

  return table;
}

/**
 * Preview the first worksheet of a fixed-template XLSX workbook. Only the
 * workbook relationship, shared strings and cell values needed by the fixed
 * templates are read; formulas, external relationships and ZIP64 archives are
 * rejected rather than interpreted.
 */
export function previewXlsxImport(
  kind: ImportKind,
  source: Uint8Array,
  options: ImportPreviewOptions = {},
): ImportPreview {
  const sourceBytes = new Uint8Array(source);
  const sourceSha256 = sha256(sourceBytes);
  try {
    if (sourceBytes.byteLength > MAX_XLSX_BYTES) throw new Error('XLSX preview is limited to 2 MiB.');
    const table = readTable(readZipEntries(sourceBytes));
    return previewImportTable(kind, table, sourceSha256, options);
  } catch (error) {
    return {
      kind,
      templateVersion: FIXED_IMPORT_TEMPLATES[kind].version,
      sourceSha256,
      headers: [],
      headerIssues: [error instanceof Error ? error.message : 'XLSX could not be parsed.'],
      rows: [],
      summary: { total: 0, valid: 0, correctionRequired: 0, duplicateReview: 0 },
    };
  }
}
