this.addEventListener("fetch", function onFetch(event) {
  console.log("[2-sw-logFetches] onFetch()", `Request received for ${event.request.url}`, event);
});
