this.addEventListener("fetch", function onFetch(event) {
  console.log("[4-sw-interceptRequests] onFetch()", `Request received for ${event.request.url}`, event);

  event.respondWith(
    new Response("Hello Sheril! <strong>How are you?</strong>", {
      headers: {
        "Content-Type": "text/html"
      }
    })
  );
});
