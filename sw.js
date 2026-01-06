const cacheName = 's3-v2.1-final'; // Changed name to force update

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(['index.html', 'manifest.json']))
  );
  self.skipWaiting(); 
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
