import { describe, it, expect } from 'vitest';
import { formatRupiah, parseRawNumber } from './utils/helper/formatRupiah';

describe('App smoke test', () => {
  it('formatRupiah dan parseRawNumber fungsional', () => {
    expect(formatRupiah(10000)).toBe('10.000');
    expect(parseRawNumber('Rp 50.000')).toBe('50000');
  });

  it('utils helper tersedia di Modul App', async () => {
    const helpers = await import('./utils/helpers');
    expect(typeof helpers.requiresAuth).toBe('function');
    expect(typeof helpers.jwtEncode).toBe('function');
    expect(typeof helpers.jwtDecodePage).toBe('function');
  });
});
