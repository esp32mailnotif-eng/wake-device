const CACHE = 'c3-wake-v1';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      c.addAll([
        './',
        './index.html',
        './manifest.webmanifest'
      ])
    )
  );
  self.skipWaiting();
});
