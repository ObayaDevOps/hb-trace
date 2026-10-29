/**
 * Canonical JSON for command hashes. Object keys are sorted at every depth;
 * array order remains meaningful because command payloads may contain ordered
 * pages, measurements or attachment references.
 */
export function canonicalJson(value: unknown): string {
  const serialized = JSON.stringify(canonicalize(value));
  if (serialized === undefined) {
    throw new TypeError('Only JSON-serializable values can be hashed.');
  }
  return serialized;
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value !== null && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return Object.keys(record)
      .sort()
      .reduce<Record<string, unknown>>((sorted, key) => {
        sorted[key] = canonicalize(record[key]);
        return sorted;
      }, {});
  }
  return value;
}
