function loadBanner() {
  var cover = document.querySelector(".content-header-cover");
  var pageKey = document.body.getAttribute("data-page");
  if (!cover || !pageKey) {
    return;
  }

  fetch("./data/banners.json")
    .then(function (res) {
      return res.json();
    })
    .then(function (banners) {
      var path = banners[pageKey];
      if (!path) {
        return;
      }
      cover.setAttribute("data-small", "./" + path);
      cover.setAttribute("data-large", "./" + path);
      cover.style.backgroundImage = "url(./" + path + ")";
    })
    .catch(function (err) {
      console.error("배너 이미지를 불러오지 못했습니다.", err);
    });
}

document.addEventListener("DOMContentLoaded", loadBanner);
