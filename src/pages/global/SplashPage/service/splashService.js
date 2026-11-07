export const DEFAULT_SPLASH_DELAY = 5000;

export const getSplashDelay = (delay) => {
  const parsed = Number(delay);
  return Number.isFinite(parsed) ? Math.max(300, parsed) : DEFAULT_SPLASH_DELAY;
};

export const getLandingRoute = () => {
  const encryptedPath = jwtEncode({ page: "landingPage" });
  return `/${encryptedPath}`;
};

export const clearAppCache = () => {
  const currentVersion = (import.meta && import.meta.env && import.meta.env.VITE_APP_VERSION) || process.env.REACT_APP_APP_VERSION || '1.0.0';
  const storedVersion = localStorage.getItem('app_version');

  if (storedVersion !== currentVersion) {
    localStorage.clear();
    sessionStorage.clear();

    // Bersihkan Cookies Domain
    try {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = (eqPos > -1 ? cookie.substr(0, eqPos) : cookie).trim();
        if (name) {
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname};`;
        }
      }
    } catch (e) {
      console.error('Error clearing cookies:', e);
    }

    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      } catch (e) {
        console.error('Error clearing caches:', e);
      }
    }

    if ('serviceWorker' in navigator) {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const reg of registrations) {
          await reg.unregister();
        }
      } catch (e) {
        console.error('Error unregistering service workers:', e);
      }
    }

    localStorage.setItem('app_version', currentVersion);
  }
};
