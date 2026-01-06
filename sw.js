const cacheName = 's3-v2.5-heartbeat'; 

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
