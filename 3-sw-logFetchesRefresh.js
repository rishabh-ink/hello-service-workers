this.addEventListener("fetch", function onFetch(event) {
  console.log("[3-sw-logFetchesRefresh] onFetch()", `YAAAY!!!1 Request received for ${event.request.url}!`, event);
});
