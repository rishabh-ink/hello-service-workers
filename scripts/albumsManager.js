function generateAlbumsMarkup(albums) {
  var albumsList = document.querySelector("[data-js~='albumsList']");
  var albumsListFragment = document.createDocumentFragment();
  var albumTemplate = document.querySelector("[data-js~='albumTemplate']");
  var albumElement = null;

  albums.forEach(function forEachAlbum(album) {
    albumElement = document.importNode(albumTemplate.content, true);

    // Cover
    var imageElement = albumElement.querySelector("[data-js~='image']");
    imageElement.alt = ("Album cover for " + album.title);
    imageElement.title = ("Album cover for " + album.title);
    fetch(("images/" + album.cover)).then(
      function onFetchFulfilled(response) {
        return response.blob();
      }
    ).then(
      function onFetchParsed(data) {
        imageElement.src = URL.createObjectURL(data);
      }
    ).catch(
      function onFetchRejected(error) {
        console.log("[index.js] Failed to fetch image", error);
      }
    );

    // Title
    albumElement.querySelector("[data-js~='title']").textContent = album.title;

    // Release date
    var releaseDateElement = albumElement.querySelector("[data-js~='releaseDate']");
    var releaseDate = new Date(album.releaseDate);
    releaseDateElement.textContent = releaseDate.getFullYear();
    releaseDateElement.datetime = releaseDate.toISOString();
    releaseDateElement.title = releaseDate.toString();

    albumsListFragment.appendChild(albumElement);
  });

  albumsList.appendChild(albumsListFragment);
}
