// 1. Update this version number every time you change index.html
const cacheName = 's3-wake-pro-v2.7';

// 2. Files to store for offline use (App Shell)
const assets = [
  './',
  './index.html',
  './manifest.json',
  // Add icon paths here if you have them, e.g., './icon.png'
];

// INSTALL: Pre-cache the app files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('S3 Wake Pro: Pre-caching assets');
      return cache.addAll(assets);
    })
  );
  // Force the new service worker to become active immediately
  self.skipWaiting();
});

// ACTIVATE: Cleanup old caches from previous versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== cacheName) {
            console.log('S3 Wake Pro: Deleting old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  // Take control of all open tabs immediately
  return self.clients.claim();
});

// FETCH: Serve from cache first, then network (Offline-First)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached file if found, otherwise fetch from internet
      return cachedResponse || fetch(event.request);
    })
  );
});
