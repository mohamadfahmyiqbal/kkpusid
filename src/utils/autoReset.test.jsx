import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { autoResetStaleResources } from './autoReset';

describe('autoReset utility', () => {
  const originalLocation = window.location;
  const originalCaches = window.caches;

  beforeEach(() => {
    // Reset document.cookie
    document.cookie = '';
    // Mock caches
    window.caches = {
      keys: vi.fn().mockResolvedValue(['stale-cache-v1', 'static-v1.0.0', 'dynamic-v1.0.0']),
      delete: vi.fn().mockResolvedValue(true),
      open: vi.fn(),
      match: vi.fn(),
    };
  });

  afterEach(() => {
    window.location = originalLocation;
    window.caches = originalCaches;
    vi.restoreAllMocks();
  });

  it('membersihkan cache usang tapi mempertahankan cache versi aktif', async () => {
    const res = await autoResetStaleResources();

    expect(res.skipped).toBe(false);
    expect(res.caches).toBe(true);
    // Hanya stale-cache-v1 yang dihapus, static-v1.0.0 & dynamic-v1.0.0 tidak
    expect(window.caches.delete).toHaveBeenCalledWith('stale-cache-v1');
    expect(window.caches.delete).not.toHaveBeenCalledWith('static-v1.0.0');
    expect(window.caches.delete).not.toHaveBeenCalledWith('dynamic-v1.0.0');
  });

  it('dapat di-skip menggunakan query param ?noclear=1', async () => {
    delete window.location;
    window.location = { ...originalLocation, search: '?noclear=1', hostname: 'localhost' };

    const res = await autoResetStaleResources();

    expect(res.skipped).toBe(true);
    expect(window.caches.delete).not.toHaveBeenCalled();
  });

  it('menangani browser tanpa cache API secara graceful', async () => {
    delete window.caches;

    const res = await autoResetStaleResources();

    expect(res.caches).toBe(false);
  });
});
