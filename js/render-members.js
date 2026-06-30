function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderPersonList(listEl, people, withPosition) {
  listEl.innerHTML = people
    .map(function (p) {
      var positionHtml = withPosition
        ? '<h2 class="position">' + escapeHtml(p.position) + "</h2>"
        : "";
      return (
        '<li class="col-s-6 col-l-3 thumb">' +
        '<div class="thumb-block">' +
        '<div class="thumb-img">' +
        '<div class="overview-thumb sophomore">' +
        '<img src="./' +
        escapeHtml(p.image) +
        '" alt="' +
        escapeHtml(p.name) +
        '" />' +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="info">' +
        positionHtml +
        '<h3 class="name">' +
        escapeHtml(p.name) +
        "</h3>" +
        '<h3 class="major">' +
        escapeHtml(p.major) +
        "</h3>" +
        "</div>" +
        "</li>"
      );
    })
    .join("");
}

function renderHistoryTable(tbodyEl, rows) {
  tbodyEl.innerHTML = rows
    .map(function (r) {
      return (
        "<tr>" +
        "<td>" +
        escapeHtml(r.year) +
        "</td>" +
        "<td>" +
        escapeHtml(r.captain) +
        "</td>" +
        "<td>" +
        escapeHtml(r.vice_captain) +
        "</td>" +
        "</tr>"
      );
    })
    .join("");
}

function loadMembersData() {
  var leadersList = document.getElementById("leaders-list");
  var regularList = document.getElementById("regular-list");
  var juniorList = document.getElementById("junior-list");
  var historyBody = document.getElementById("history-body");

  if (leadersList) {
    fetch("./data/members/leaders.json")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        renderPersonList(leadersList, data, true);
      })
      .catch(function (err) {
        console.error("단장단 데이터를 불러오지 못했습니다.", err);
      });
  }

  if (regularList) {
    fetch("./data/members/regular.json")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        renderPersonList(regularList, data, false);
      })
      .catch(function (err) {
        console.error("정단원 데이터를 불러오지 못했습니다.", err);
      });
  }

  if (juniorList) {
    fetch("./data/members/junior.json")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        renderPersonList(juniorList, data, false);
      })
      .catch(function (err) {
        console.error("준단원 데이터를 불러오지 못했습니다.", err);
      });
  }

  if (historyBody) {
    fetch("./data/members/history.json")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        renderHistoryTable(historyBody, data);
      })
      .catch(function (err) {
        console.error("역대 단장단 데이터를 불러오지 못했습니다.", err);
      });
  }
}

document.addEventListener("DOMContentLoaded", loadMembersData);
