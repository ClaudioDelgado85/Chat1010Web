const CACHE_NAME = 'infracciones-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './infracciones_generales.txt',
  './js/main.js',
  './js/config.js',
  './js/searchManager.js',
  './js/uiManager.js',
  './js/utils.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Si está en caché, devuélvelo
        }
        return fetch(event.request); // Si no, búscalo en la red
      })
  );
});
