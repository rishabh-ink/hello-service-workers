var CACHE_NAME = "taylorSwiftDiscography";
var VERSION = "v1";

this.addEventListener("install", function onInstall(event) {
  console.log("[serviceWorker.js] onInstall()", { event });

  event.waitUntil(
    caches.open(`${CACHE_NAME}-${VERSION}`).then(function onCacheOpen(cache) {
      console.log("[serviceWorker.js] onCacheOpen()", "Caching offline resources", { event });

      cache.addAll([
        "images/default.jpg",
        "styles/index.css",
        "offline.html"
      ])
    })
  );
});

this.addEventListener("fetch", function onFetch(event) {
  console.log("[serviceWorker.js] onFetch()", { url: event.request.url });

  event.respondWith(
    fetch(event.request).then(function onFetchFulfilled(response) {
      console.log("[serviceWorker.js] onFetchFulfilled()", "Fetched response", { response });

      return response;
    }).catch(function onFetchRejected(error) {
      console.log("[serviceWorker.js] onFetchRejected()", "Fetch failed, responding with cached resources", { error });

      return caches.open(`${CACHE_NAME}-${VERSION}`).then(function onCacheOpen(cache) {
        console.log("[serviceWorker.js] onCacheOpen()", { cache });

        return cache.match("offline.html");
      });
    })
  );
});
