import { NextResponse } from 'next/server';
import { runtimeConfig } from '@/lib/runtime-config';
import { requireAnyRole } from '@/server/auth/authorization';
import { getLocalPersistenceAdapter, LOCAL_DEMO_ORGANIZATION_ID } from '@/server/commands/local';
import { MAX_IMPORT_SOURCE_BYTES, stageImport, type ImportKind } from '@/server/imports/local';
import { PersistenceError } from '@/server/persistence';

export const dynamic = 'force-dynamic';

const IMPORT_KINDS: readonly ImportKind[] = ['farmers', 'apiaries'];
export async function POST(request: Request) {
  const authorization = await requireAnyRole(['collection_procurement', 'supervisor', 'administrator']);
  if (!authorization.ok) {
    return NextResponse.json(
      { error: { code: authorization.reason === 'not-configured' ? 'AUTH_NOT_CONFIGURED' : 'AUTH_REQUIRED', message: 'An authenticated import preview is required.' } },
      { status: authorization.status, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const kind = new URL(request.url).searchParams.get('kind') as ImportKind | null;
  if (!kind || !IMPORT_KINDS.includes(kind)) {
    return NextResponse.json(
      { error: { code: 'INVALID_IMPORT_KIND', message: 'kind must be farmers or apiaries.' } },
      { status: 422, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  if (runtimeConfig.mode === 'hosted') {
    return NextResponse.json(
      { error: { code: 'PERSISTENCE_NOT_CONFIGURED', message: 'Hosted import persistence is not enabled yet; no source file was saved.' } },
      { status: 501, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_IMPORT_SOURCE_BYTES) {
    return NextResponse.json(
      { error: { code: 'IMPORT_TOO_LARGE', message: 'CSV/XLSX preview is limited to 2 MiB.' } },
      { status: 413, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  let source: Uint8Array;
  let fileName = request.headers.get('x-file-name') || new URL(request.url).searchParams.get('filename') || 'import.csv';
  let mediaType = request.headers.get('content-type') || undefined;
  if ((mediaType || '').toLowerCase().startsWith('multipart/form-data')) {
    const form = await request.formData();
    const file = form.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: { code: 'IMPORT_FILE_REQUIRED', message: 'Multipart requests must include a file field.' } },
        { status: 422, headers: { 'Cache-Control': 'no-store' } },
      );
    }
    source = new Uint8Array(await file.arrayBuffer());
    fileName = file.name || fileName;
    mediaType = file.type || mediaType;
  } else {
    source = new Uint8Array(await request.arrayBuffer());
  }
  if (source.byteLength > MAX_IMPORT_SOURCE_BYTES) {
    return NextResponse.json(
      { error: { code: 'IMPORT_TOO_LARGE', message: 'CSV/XLSX preview is limited to 2 MiB.' } },
      { status: 413, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  try {
    const staged = await stageImport(getLocalPersistenceAdapter(), {
      organizationId: LOCAL_DEMO_ORGANIZATION_ID,
      actorId: authorization.identity.actorId,
      kind,
      source: { bytes: source, filename: fileName, mediaType },
    });
    return NextResponse.json(
      {
        data: { batch: staged.batch, asset: staged.asset, rows: staged.rows, preview: staged.preview },
        meta: { dryRun: true, committed: false, replayed: staged.replayed, local: true },
      },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    const status = error instanceof PersistenceError && error.code === 'already_exists' ? 409 : 422;
    return NextResponse.json(
      { error: { code: error instanceof PersistenceError ? error.code.toUpperCase() : 'IMPORT_PREVIEW_FAILED', message: error instanceof Error ? error.message : 'The import could not be previewed.' } },
      { status, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
