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

const shouldSkipClear = () =>
  window.location.search.includes('noclear=1') ||
  window.location.search.includes('no-clear=1');

/**
 * Hapus seluruh cache service-worker (termasuk current version).
 * Cache v1 lama terkontaminasi respons HTML fallback yang dicampur
 * sebagai aset JS/CSS, sehingga perlu dibersihkan total agar
 * aset baru dari server di-fetch ulang dengan benar.
 */
const clearAllCaches = async () => {
  if (!('caches' in window)) return false;

  try {
    const names = await caches.keys();
    await Promise.all(names.map((name) => caches.delete(name)));
    return true;
  } catch (err) {
    console.warn('[autoReset] clearAllCaches gagal:', err.message);
    return false;
  }
};

/**
 * Unregister semua service worker lama agar SW baru (v2.0.0) aktif
 * tanpa perlu hard refresh manual dari user.
 */
const unregisterServiceWorkers = async () => {
  if (!('serviceWorker' in navigator)) return false;

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(
      registrations.map((reg) => reg.unregister())
    );
    console.log('[autoReset] Service workers di-unregister:', registrations.length);
    return true;
  } catch (err) {
    console.warn('[autoReset] unregisterServiceWorkers gagal:', err.message);
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
 * Otomatis membersihkan cache & cookie usang serta unregister SW lama
 * saat app diload pertama kali. Tidak merusak token / userData / appVersion / theme.
 * Saat selesai, halaman akan reload otomatis agar SW baru v2.0.0 aktif
 * tanpa perlu hard refresh manual.
 */
export const autoResetStaleResources = async () => {
  if (shouldSkipClear()) {
    console.log('[autoReset] Di-skip via query parameter noclear=1');
    return { skipped: true, caches: false, cookies: false };
  }

  // Hindari infinite reload loop: hanya jalankan sekali per sesi
  const hasReset = sessionStorage.getItem('pus_auto_reset_done') === '1';

  if (!hasReset) {
    const cachesOk = await clearAllCaches();
    const swOk = await unregisterServiceWorkers();
    const cookiesOk = clearExpiredCookies();

    console.log('[autoReset] Selesai', {
      caches: cachesOk,
      serviceWorkers: swOk,
      cookies: cookiesOk,
    });

    // Tandai sebagai sudah di-reset untuk mencegah infinite reload loop
    sessionStorage.setItem('pus_auto_reset_done', '1');

    // Reload halaman agar SW baru v2.0.0 aktif dan aset baru di-fetch ulang dari server
    if (swOk) {
      window.location.reload();
    }

    return {
      skipped: false,
      caches: cachesOk,
      serviceWorkers: swOk,
      cookies: cookiesOk,
    };
  }

  console.log('[autoReset] Sudah di-reset dalam sesi ini, melewatkan.');
  return { skipped: false, caches: true, serviceWorkers: true, cookies: true };
};
