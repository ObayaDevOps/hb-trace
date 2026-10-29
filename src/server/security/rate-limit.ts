import 'server-only';

type Bucket = { count: number; resetAt: number };

const globalStore = globalThis as typeof globalThis & {
  __hbTraceRateLimits?: Map<string, Bucket>;
};
const buckets = globalStore.__hbTraceRateLimits ?? new Map<string, Bucket>();
globalStore.__hbTraceRateLimits = buckets;

export function requestAddress(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || request.headers.get('x-real-ip')?.trim() || 'anonymous';
}

export function checkRateLimit(
  key: string,
  limit = 60,
  windowMs = 60_000,
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  if (buckets.size > 10_000) {
    for (const [bucketKey, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(bucketKey);
    }
  }

  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: Math.max(0, limit - 1), retryAfterSeconds: Math.ceil(windowMs / 1000) };
  }

  current.count += 1;
  const remaining = Math.max(0, limit - current.count);
  return {
    allowed: current.count <= limit,
    remaining,
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
}
