import { NextResponse } from 'next/server';
import { runtimeConfig } from '@/lib/runtime-config';
import { requireAnyRole } from '@/server/auth/authorization';
import { getLocalPersistenceAdapter, LOCAL_DEMO_ORGANIZATION_ID } from '@/server/commands/local';
import { commitImport } from '@/server/imports/local';
import { PersistenceError } from '@/server/persistence';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const authorization = await requireAnyRole(['collection_procurement', 'supervisor', 'administrator']);
  if (!authorization.ok) {
    return NextResponse.json(
      { error: { code: authorization.reason === 'not-configured' ? 'AUTH_NOT_CONFIGURED' : 'AUTH_REQUIRED', message: 'An authenticated import commit is required.' } },
      { status: authorization.status, headers: { 'Cache-Control': 'no-store' } },
    );
  }
  if (runtimeConfig.mode === 'hosted') {
    return NextResponse.json(
      { error: { code: 'PERSISTENCE_NOT_CONFIGURED', message: 'Hosted import persistence is not enabled yet; no records were committed.' } },
      { status: 501, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  let body: Record<string, unknown>;
  try {
    const parsed = await request.json();
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('object required');
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: { code: 'INVALID_JSON', message: 'Request body must be valid JSON.' } }, { status: 400 });
  }
  if (typeof body.batchId !== 'string' || typeof body.commitOperationId !== 'string') {
    return NextResponse.json(
      { error: { code: 'VALIDATION_ERROR', message: 'batchId and commitOperationId are required.' } },
      { status: 422, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  try {
    const result = await commitImport(getLocalPersistenceAdapter(), {
      organizationId: LOCAL_DEMO_ORGANIZATION_ID,
      actorId: authorization.identity.actorId,
      batchId: body.batchId,
      commitOperationId: body.commitOperationId,
      allowPartialReject: body.allowPartialReject === true,
    });
    return NextResponse.json(
      { data: result, meta: { committed: !result.replayed, replayed: result.replayed, local: true } },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    const status = error instanceof PersistenceError && ['version_conflict', 'idempotency_mismatch'].includes(error.code) ? 409 : 422;
    return NextResponse.json(
      { error: { code: error instanceof PersistenceError ? error.code.toUpperCase() : 'IMPORT_COMMIT_FAILED', message: error instanceof Error ? error.message : 'The import could not be committed.' } },
      { status, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
