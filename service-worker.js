const CACHE_NAME = 'yoga-2-0-v2-0';
const APP_ASSETS = [
  './','./index.html','./styles.css','./data.js','./app.js','./manifest.webmanifest',
  './icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png','./icons/favicon-32.png',
  './images/app/89_portada_biblioteca.webp','./images/app/90_portada_modo_clase.webp','./images/app/91_portada_mis_clases.webp','./images/app/92_hero_yoga_2_0.webp'
];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))); self.clients.claim(); });
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const isImage = event.request.destination === 'image';
  if (isImage) {
    event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => { const copy=response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request,copy)); return response; })));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => { const copy=response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request,copy)); return response; }).catch(() => caches.match('./index.html'))));
});
