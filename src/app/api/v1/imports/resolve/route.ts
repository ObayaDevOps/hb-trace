import { NextResponse } from 'next/server';
import { runtimeConfig } from '@/lib/runtime-config';
import { requireAnyRole } from '@/server/auth/authorization';
import { getLocalPersistenceAdapter, LOCAL_DEMO_ORGANIZATION_ID } from '@/server/commands/local';
import { resolveImportDuplicate } from '@/server/imports/local';
import { PersistenceError, type ImportDuplicateDecision } from '@/server/persistence';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const authorization = await requireAnyRole(['collection_procurement', 'supervisor', 'administrator']);
  if (!authorization.ok) {
    return NextResponse.json(
      { error: { code: authorization.reason === 'not-configured' ? 'AUTH_NOT_CONFIGURED' : 'AUTH_REQUIRED', message: 'An authenticated duplicate review is required.' } },
      { status: authorization.status, headers: { 'Cache-Control': 'no-store' } },
    );
  }
  if (runtimeConfig.mode === 'hosted') {
    return NextResponse.json(
      { error: { code: 'PERSISTENCE_NOT_CONFIGURED', message: 'Hosted import persistence is not enabled yet; no decision was saved.' } },
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
  if (
    typeof body.batchId !== 'string' ||
    typeof body.rowId !== 'string' ||
    !['create', 'match', 'skip'].includes(String(body.decision))
  ) {
    return NextResponse.json(
      { error: { code: 'VALIDATION_ERROR', message: 'batchId, rowId and a create, match or skip decision are required.' } },
      { status: 422, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  try {
    const result = await resolveImportDuplicate(getLocalPersistenceAdapter(), {
      organizationId: LOCAL_DEMO_ORGANIZATION_ID,
      actorId: authorization.identity.actorId,
      batchId: body.batchId,
      rowId: body.rowId,
      decision: body.decision as ImportDuplicateDecision,
      matchedRecordId: typeof body.matchedRecordId === 'string' ? body.matchedRecordId : undefined,
    });
    return NextResponse.json(
      { data: result, meta: { saved: true, local: true } },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    return NextResponse.json(
      { error: { code: error instanceof PersistenceError ? error.code.toUpperCase() : 'DUPLICATE_REVIEW_FAILED', message: error instanceof Error ? error.message : 'The duplicate decision could not be saved.' } },
      { status: error instanceof PersistenceError && error.code === 'version_conflict' ? 409 : 422, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
