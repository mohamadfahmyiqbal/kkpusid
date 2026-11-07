/**
 * Auto-reset stale browser resources on app launch.
 *
 * Hanya membersihkan resource STALE / expired:
 * - service-worker cache lama (non-current)
 * - cookie PUS/token yang expired
 *
 * TIDAK menyentuh data aktif: token, userData, appVersion, theme dsb.
 *
 * Gunakan query param ?noclear=1 untuk skip (development debugging).
 */

const CURRENT_STATIC_CACHE = 'static-v1.0.0';
const CURRENT_DYNAMIC_CACHE = 'dynamic-v1.0.0';

const shouldSkipClear = () =>
  window.location.search.includes('noclear=1') ||
  window.location.search.includes('no-clear=1');

/**
 * Hapus semua cache service-worker yang bukan current version.
 * Aman: cache aktif (v1.0.0) tetap diam.
 */
const clearStaleCaches = async () => {
  if (!('caches' in window)) return false;

  try {
    const names = await caches.keys();
    const stale = names.filter(
      (name) =>
        !name.endsWith(CURRENT_STATIC_CACHE) &&
        !name.endsWith(CURRENT_DYNAMIC_CACHE)
    );
    await Promise.all(stale.map((name) => caches.delete(name)));
    return true;
  } catch (err) {
    console.warn('[autoReset] clearStaleCaches gagal:', err.message);
    return false;
  }
};

/**
 * Hapus cookie PUS/token yang expired (tanpa expires & usia > 7 hari).
 * Hanya cookie yang cocok pola PUS / token / auth / session.
 */
const clearExpiredCookies = () => {
  if (typeof document === 'undefined' || !document.cookie) return false;

  try {
    const cookies = document.cookie.split(';');
    let cleared = 0;

    cookies.forEach((raw) => {
      const eq = raw.indexOf('=');
      const name = eq > -1 ? raw.slice(0, eq).trim() : raw.trim();
      if (!name) return;

      const lower = name.toLowerCase();
      if (
        !lower.includes('pus') &&
        lower !== 'token' &&
        lower !== 'auth' &&
        lower !== 'session'
      )
        return;

      // Hapus cookie PUS/token terkait
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname};`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
      cleared++;
    });

    return cleared > 0;
  } catch (err) {
    console.warn('[autoReset] clearExpiredCookies gagal:', err.message);
    return false;
  }
};

/**
 * Otomatis membersihkan cache & cookie usang saat app diload pertama kali.
 * Tidak merusak token / userData / appVersion / theme.
 */
export const autoResetStaleResources = async () => {
  if (shouldSkipClear()) {
    console.log('[autoReset] Di-skip via query parameter noclear=1');
    return { skipped: true, caches: false, cookies: false };
  }

  const cachesOk = await clearStaleCaches();
  const cookiesOk = clearExpiredCookies();

  console.log('[autoReset] Selesai', {
    caches: cachesOk,
    cookies: cookiesOk,
  });

  return {
    skipped: false,
    caches: cachesOk,
    cookies: cookiesOk,
  };
};
