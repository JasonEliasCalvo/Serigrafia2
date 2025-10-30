const cacheName = "DefaultCompany-Metaverso-0.1.0";
const contentToCache = [
    "Build/ea153e321edf23b9a40b38d65ce41d01.loader.js",
    "Build/641cb9c47951cbfc2e38d599634e508c.framework.js",
    "Build/5df5559dde911c70163022fb97ab74ac.data",
    "Build/6f9a49c1bda1a5ad3e3f39da3eb80372.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
