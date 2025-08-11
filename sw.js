const CACHE_NAME = 'recetario-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://cdn.tailwindcss.com'
];
self.addEventListener('install', event => {
  // Realiza la instalación: abre la caché y agrega los recursos principales.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierta');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // Estrategia: Cache, falling back to network
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        // Si la petición de navegación falla, muestra la página offline.
        return caches.match('./index.html');
      });
    })
  );
});
