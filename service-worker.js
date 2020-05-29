const cacheName = "serieA";
var urlsToCache = [
  "/",
  "/index.html",

];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("evet jalan");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  var base_url = "https://api.football-data.org/v2/";

  const req = event.request;
  // console.log(req);

  if (/.*(json)$/.test(req.url.indexOf(base_url)> -1)) {
    event.respondWith(networkFirst(req));
  } else {
    event.respondWith(cacheFirst(req));
  }
});

async function networkFirst(req) {
  const cache = await caches.open(cacheName);
  try { 
    const fresh = await fetch(req);
    cache.put(req, fresh.clone());
    return fresh;
  } catch (e) { 
    const cachedResponse = await cache.match(req);
    return cachedResponse;
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(req, { ignoreSearch: true });
  return cachedResponse || networkFirst(req);
}