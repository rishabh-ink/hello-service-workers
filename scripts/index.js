window.addEventListener("load", function onLoad() {
  if("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/serviceWorker.js", {
      scope: "/"
    }).then(
      function onRegisterFulfilled(registration) {
        console.log("[index.js] Service worker registered successfully", registration);
        console.log("[index.js] registration.installing", registration.installing);
        console.log("[index.js] registration.waiting", registration.waiting);
        console.log("[index.js] registration.active", registration.active);

        registration.addEventListener("updatefound", function onUpdateFound(event) {
          console.log("[index.js] onUpdateFound()", event);
          // An updated service worker was found!
          // Now is a good time to 1. ask the user, 2. invoke `postMessage()` to the service worker and
          // 3. invoke `self.skipWaiting()`
        });
      }
    ).catch(
      function onRegisterRejected(error) {
        console.log("[index.js] Service worker failed to register", error);
      }
    );
  }

  fetch("/data/taylorSwiftAlbums.json").then(
    function onFetchFulfilled(response) {
      return response.json();
    }
  ).then(
    function onFetchParsed(data) {
      generateAlbumsMarkup(data.albums);
    }
  ).catch(
    function onFetchRejected(error) {
      console.log("[index.js] Failed to fetch albums", error);
    }
  );
});
