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
        "scripts/index.js",
        "scripts/albumManager.js",
        "index.html"
      ])
    })
  );
});
