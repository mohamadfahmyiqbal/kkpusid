// Enhanced Service Worker for PWA Features
// Refactored and hardened based on Senior Fullstack Developer standards
// Follows ISO/IEC 27001:2022 security controls and OWASP best practices

const CACHE_NAME = 'koperasi-v2.0.0';
const STATIC_CACHE = 'static-v2.0.0';
const DYNAMIC_CACHE = 'dynamic-v2.0.0';

// Safe static asset patterns
const STATIC_ASSET_PATTERNS = [
  /^\/assets\//,
  /\.js$,
  /\.css$,
  /\.png$,
  /\.jpg$,
  /\.jpeg$,
  /\.svg$,
  /\.ico$,
  /\.woff2?$,
  /\.ttf$,
  /\.eot$,
  /\.webp$,
  /\.ico$,
];

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/icons/PUSlogo.png',
];

const isStaticAsset = (pathname) => STATIC_ASSET_PATTERNS.some((pattern) => pattern.test(pathname));

const isJSOrCSS = (pathname) => /\.js$|\.css$/.test(pathname);

// Validate cached response before using
const isValidCachedResponse = async (response, url) => {
  if (!response) return false;
  const contentType = response.headers?.get('content-type') || '';
  const pathname = new URL(url, self.location.href).pathname;

  if (isJSOrCSS(pathname)) {
    const isJS = contentType.includes('javascript') || contentType.includes('ecmascript') || contentType.includes('module');
    const isCSS = contentType.includes('css');
    if (!isJS && !isCSS) {
      return false;
    }
  }
  return true;
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');

  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        try {
          self.clients.claim();
        } catch (e) {
          console.warn('Service Worker: Tidak dapat claim clients:', e.message);
        }
      })
  );
});

// Fetch event - caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and non-http/https schemes
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Development bypass
  const isDevelopment = self.location.hostname === 'localhost' ||
    self.location.hostname === '127.0.0.1' ||
    self.location.port !== '';
  if (isDevelopment) {
    return;
  }

  // Handle different request types
  if (url.origin === self.location.origin) {
    if (isStaticAsset(url.pathname)) {
      // Static assets - Cache First (never cache HTML fallback for JS/CSS)
      event.respondWith(cacheFirst(request));
    } else if (url.pathname.startsWith('/api/')) {
      // API requests - Network First with fallback
      event.respondWith(networkFirst(request));
    } else {
      // Other same-origin requests (HTML navigation) - Stale While Revalidate
      event.respondWith(staleWhileRevalidate(request));
    }
  } else {
    // Cross-origin requests - Network First
    event.respondWith(networkFirst(request));
  }
});

// Cache First Strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    const valid = await isValidCachedResponse(cachedResponse, request.url);
    if (valid) {
      return cachedResponse;
    }
    console.warn('[SW] Cache terkontaminasi (HTML untuk JS/CSS) diabaikan:', request.url);
  }

  try {
    const networkResponse = await fetch(request);

    if (!networkResponse.ok) {
      return networkResponse;
    }

    const contentType = networkResponse.headers.get('content-type') || '';
    if (isJSOrCSS(request.url) && !contentType.includes('javascript') && !contentType.includes('css')) {
      return networkResponse;
    }

    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, networkResponse.clone());

    return networkResponse;
  } catch (error) {
    console.error('Cache First failed:', error);
    return new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
}

// Network First Strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.warn('Network First failed (falling back to cache):', error);

    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);

  const fetchPromise = fetch(request).then(async (networkResponse) => {
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch((error) => {
    console.warn('Fetch failed in staleWhileRevalidate:', error);
    return new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  });

  return cachedResponse || fetchPromise;
}

// Background Sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log('Service Worker: Background sync triggered');
  // Handle offline actions that need to be synced
}

// Periodic Sync for offline actions
self.addEventListener('periodic-sync', function (event) {
  event.waitUntil(syncPeriodicTasks());
});

async function syncPeriodicTasks() {
  console.log('Service Worker: Periodic sync triggered');
  // Handle periodic sync tasks (offline actions that need to be synced)
  // Implementation depends on specific sync requirements
}

// Push Notification Handler
self.addEventListener('push', function (event) {
  if (!event.data) {
    return;
  }

  const rawText = event.data.text();
  let title = "Koperasi PUS";
  let options = {
    icon: "/assets/icons/PUSlogo.png",
    badge: "/assets/icons/PUSlogo.png",
    vibrate: [100, 50, 100],
    data: { url: "/" },
    actions: [
      {
        action: "explore",
        title: "Buka",
        icon: "/assets/icons/PUSlogo.png",
      },
      {
        action: "close",
        title: "Tutup",
        icon: "/assets/icons/PUSlogo.png",
      },
    ],
  };

  try {
    const data = JSON.parse(rawText);
    title = data.title || title;
    options.body = data.body || options.body;
    options.data = data.url ? { url: data.url } : options.data;
  } catch (error) {
    options.body = rawText;
  }

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification Click Handler
self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  const targetUrl = event.notification.data?.url || '/';

  if (event.action === 'close') {
    return;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Try to focus an existing window with the same origin
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      // No matching window found, open a new one
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

// Message handling for communication with main app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
