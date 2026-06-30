function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderPhotos(containerEl, paths) {
  containerEl.innerHTML = paths
    .map(function (path) {
      return (
        '<div class="masonry-item">' +
        '<div class="thumb-block">' +
        '<img src="./' +
        escapeHtml(path) +
        '">' +
        "</div>" +
        "</div>"
      );
    })
    .join("");
}

function loadPhotos() {
  var container = document.getElementById("photo-list");
  if (!container) {
    return;
  }

  fetch("./data/photos.txt")
    .then(function (res) {
      return res.text();
    })
    .then(function (text) {
      var paths = text
        .split("\n")
        .map(function (line) {
          return line.trim();
        })
        .filter(function (line) {
          return line.length > 0;
        });
      renderPhotos(container, paths);
    })
    .catch(function (err) {
      console.error("사진 목록을 불러오지 못했습니다.", err);
    });
}

document.addEventListener("DOMContentLoaded", loadPhotos);
