import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { autoResetStaleResources } from './autoReset';

describe('autoReset utility', () => {
  const originalLocation = window.location;
  const originalCaches = window.caches;
  const originalNavigator = navigator;
  const originalSessionStorage = window.sessionStorage;

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
    // Mock navigator.serviceWorker
    const mockReg = { unregister: vi.fn().mockResolvedValue(true) };
    const mockSw = { getRegistrations: vi.fn().mockResolvedValue([mockReg]) };
    Object.defineProperty(navigator, 'serviceWorker', {
      value: mockSw,
      writable: true,
      configurable: true,
    });
    // Mock sessionStorage
    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: vi.fn().mockReturnValue(null),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true,
      configurable: true,
    });
    // Mock location.reload
    Object.defineProperty(window, 'location', {
      ...originalLocation,
      reload: vi.fn(),
      search: '',
      hostname: 'localhost',
    });
  });

  afterEach(() => {
    window.location = originalLocation;
    window.caches = originalCaches;
    Object.defineProperty(navigator, 'serviceWorker', {
      value: originalNavigator.serviceWorker,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(window, 'sessionStorage', {
      value: originalSessionStorage,
      writable: true,
      configurable: true,
    });
    vi.restoreAllMocks();
  });

  it('menghapus semua cache (termasuk yang terkontaminasi HTML fallback)', async () => {
    const res = await autoResetStaleResources();

    expect(res.skipped).toBe(false);
    expect(res.caches).toBe(true);
    expect(res.serviceWorkers).toBe(true);
    // Semua cache di-reset total
    expect(window.caches.delete).toHaveBeenCalledWith('stale-cache-v1');
    expect(window.caches.delete).toHaveBeenCalledWith('static-v1.0.0');
    expect(window.caches.delete).toHaveBeenCalledWith('dynamic-v1.0.0');
  });

  it('meng-unregister service worker lama dan reload halaman', async () => {
    const res = await autoResetStaleResources();

    expect(res.serviceWorkers).toBe(true);
    expect(navigator.serviceWorker.getRegistrations).toHaveBeenCalled();
    // Reload dipicu setelah unregister
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('dapat di-skip menggunakan query param ?noclear=1', async () => {
    delete window.location;
    window.location = { ...originalLocation, search: '?noclear=1', hostname: 'localhost' };

    const res = await autoResetStaleResources();

    expect(res.skipped).toBe(true);
    expect(window.caches.delete).not.toHaveBeenCalled();
  });

  it('menghindari infinite reload loop dengan sessionStorage flag', async () => {
    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: vi.fn().mockReturnValue('1'),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true,
      configurable: true,
    });

    const res = await autoResetStaleResources();

    expect(window.caches.delete).not.toHaveBeenCalled();
    expect(window.location.reload).not.toHaveBeenCalled();
  });

  it('menangani browser tanpa cache API secara graceful', async () => {
    delete window.caches;

    const res = await autoResetStaleResources();

    expect(res.caches).toBe(false);
  });
});