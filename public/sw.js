const CACHE_VERSION = 1;
const STATIC_CACHE = `static-cache-v${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-cache-v${CACHE_VERSION}`;
const MEDIA_CACHE = `media-cache-v${CACHE_VERSION}`;

const STATIC_ASSETS = [
  '/',
  '/dashboard',
  '/app',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/fonts/GeistVF.woff',
  '/fonts/GeistMonoVF.woff'
];

// Cache strategies
const networkFirst = async (request) => {
  try {
    const response = await fetch(request);
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || Promise.reject('no-match');
  }
};

const cacheFirst = async (request) => {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  try {
    const response = await fetch(request);
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    return Promise.reject('no-match');
  }
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)),
      caches.open(MEDIA_CACHE),
      caches.open(DYNAMIC_CACHE)
    ])
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    if (request.method === 'GET') {
      event.respondWith(networkFirst(request));
    } else {
      // For non-GET requests, attempt online first
      event.respondWith(
        fetch(request).catch(() => {
          // If offline, store in IndexedDB for later sync
          return Response.json({ 
            error: 'offline',
            message: 'Request queued for background sync'
          }, { status: 503 });
        })
      );
    }
    return;
  }

  // Handle media files
  if (url.pathname.includes('/media/')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Handle static assets
  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image' ||
    request.destination === 'font'
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Default to network-first for everything else
  event.respondWith(networkFirst(request));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (
              ![STATIC_CACHE, DYNAMIC_CACHE, MEDIA_CACHE].includes(cacheName)
            ) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Clean up old IndexedDB data
      clients.claim()
    ])
  );
});

// Handle background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'runash-sync') {
    event.waitUntil(syncManager.processQueue());
  }
});

// Handle push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192.png',
    badge: '/icons/badge.png',
    data: data.data,
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      if (clientList.length > 0) {
        clientList[0].focus();
      } else {
        clients.openWindow('/dashboard');
      }
    })
  );
});