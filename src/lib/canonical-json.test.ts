import { describe, expect, it } from 'vitest';
import { canonicalJson } from './canonical-json';

describe('canonical JSON', () => {
  it('sorts nested object keys without changing array order', () => {
    expect(canonicalJson({ z: { b: 2, a: 1 }, a: [{ y: 2, x: 1 }, 3] })).toBe(
      '{"a":[{"x":1,"y":2},3],"z":{"a":1,"b":2}}',
    );
  });

  it('rejects values that cannot be represented as JSON', () => {
    expect(() => canonicalJson({ value: 1n })).toThrow(TypeError);
  });
});
