const CACHE_NAME = 'budget-tracker-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // 注意：以下の2行は、実際のstyleとscriptの中身を省略した場合のものです。
  // 完全なHTMLファイルを使っている場合は、この2行は不要です。
  // '/style.css', 
  // '/script.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});