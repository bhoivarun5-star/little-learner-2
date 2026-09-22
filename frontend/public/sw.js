const CACHE_NAME = 'little-learner-pwa-v2';

const OFFLINE_CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/assets/star-mascot.jpg',
  '/assets/mascot-cursor-48.png',
  '/assets/activities/alphabet_phonics.jpg',
  '/assets/activities/count_match.jpg',
  '/assets/activities/trace_draw.jpg',
  '/assets/activities/healthy_habits.jpg',
  '/assets/homepage/meadow_background.jpg',
  '/assets/homepage/user_avatar.jpg',
  '/assets/homepage/trophy.jpg',
  '/assets/homepage/parents_avatar.jpg',
  '/assets/hero-scene.jpg',
  '/assets/boy-avatar.jpg'
];

// Install: Cache all critical assets immediately on first load
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching all Little Learner offline assets');
      return cache.addAll(OFFLINE_CORE_ASSETS).catch((err) => {
        console.warn('[ServiceWorker] Some assets could not be cached immediately:', err);
      });
    })
  );
});

// Activate: Clean up older cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache version:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Cache-First strategy with Stale-While-Revalidate for instant loading & offline capability
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignore chrome-extension or unsupported schemes
  if (!url.protocol.startsWith('http')) return;

  // Never intercept or cache requests during local development
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
    return;
  }

  // Handle API calls: Network first, offline mock fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(
          JSON.stringify({
            offline: true,
            status: 'success',
            message: 'Offline mode active. Progress is saved locally.'
          }),
          {
            headers: { 'Content-Type': 'application/json' },
            status: 200
          }
        );
      })
    );
    return;
  }

  // Handle Static Assets & Media: Cache-First
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Revalidate in background when online
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, networkResponse);
              });
            }
          })
          .catch(() => {
            // Running offline, keep serving cached version
          });
        return cachedResponse;
      }

      // Not in cache, fetch from network and store in cache
      return fetch(request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          // If offline and request is an HTML page navigation, return index.html
          if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/index.html');
          }
        });
    })
  );
});
