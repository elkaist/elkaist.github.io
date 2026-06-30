function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderEvents(containerEl, events) {
  containerEl.innerHTML = events
    .map(function (ev, index) {
      var altClass = index % 2 === 1 ? " section-alt" : "";
      return (
        '<div class="section event-section' +
        altClass +
        '">' +
        '<div class="event l-wrap">' +
        '<div class="event l-wide">' +
        '<div class="event-item row" style="align-items: center; display: flex">' +
        '<div class="col-s-12 col-l-6 thumb">' +
        '<div class="thumb-block">' +
        '<div class="thumb-img">' +
        '<img src="./' +
        escapeHtml(ev.image) +
        '" alt="' +
        escapeHtml(ev.name) +
        '" style="width: 100%; object-fit: cover;" />' +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="col-s-12 col-l-6 info" style="padding: 40px">' +
        '<h2 class="home-news-h" style="color: var(--elka-color); margin-bottom: 10px; padding-left: 0px; font-weight: 800; margin-left: -2px !important;">' +
        escapeHtml(ev.name) +
        "</h2>" +
        '<h4 style="color: var(--elka-color); margin-bottom: 25px; font-weight: 700; font-size: xx-large">' +
        escapeHtml(ev.name_en) +
        "</h4>" +
        '<p style="line-height: 1.8">' +
        escapeHtml(ev.content) +
        "</p>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>"
      );
    })
    .join("");
}

function loadEvents() {
  var container = document.getElementById("events-list");
  if (!container) {
    return;
  }

  fetch("./data/events.json")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      renderEvents(container, data);
    })
    .catch(function (err) {
      console.error("응원단 활동 데이터를 불러오지 못했습니다.", err);
    });
}

document.addEventListener("DOMContentLoaded", loadEvents);
