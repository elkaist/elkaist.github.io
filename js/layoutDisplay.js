// layoutDisplay.js
// apg_cmjs_rj_draw_dp //커스텀텍

/**
 * layoutDisplay
 * last update: 2023-04-13
 * 롱테이크 카테고리 변경
 */
define(["global", "jquery", "underscore"], function (IG, $, _) {
  "use strict";
  function makeCssCurrentHtml(pLinkUrl, pCssLiName, pChildren) {
    var urlHost = window.location.protocol + "//" + window.location.host,
      urlFull = window.location.href,
      urlPage = urlFull.replace(urlHost, ""),
      htmlCurrent = "",
      strChildren = JSON.stringify(pChildren);
    if (typeof strChildren == "undefined" || strChildren == null) {
      strChildren = "";
    }
    var urlDirPattern = /(\/)(\w+)([-]?[0-9a-zA-Z])*(?=\/)/gi,
      arrDirUrlPage = urlPage.match(urlDirPattern) || [],
      arrDirLinkUrl = pLinkUrl.match(urlDirPattern) || [],
      dirUrlPage = urlPage,
      dirLinkUrl = pLinkUrl;
    if (arrDirUrlPage.length >= 4) {
      dirUrlPage = "";
      dirLinkUrl = "";
      for (var i = 0; i < arrDirLinkUrl.length; i++) {
        dirUrlPage += arrDirUrlPage[i];
        dirLinkUrl += arrDirLinkUrl[i];
      }
    }
    if (urlPage.indexOf(".html") < 0) {
      htmlCurrent = '<li class="' + pCssLiName + '">';
    } else {
      if (
        urlPage == pLinkUrl ||
        (dirUrlPage == dirLinkUrl) ||
        (strChildren.indexOf(urlPage) > -1 && pLinkUrl != "#")
      ) {
        htmlCurrent = '<li class="' + pCssLiName + ' is-current">';
      } else {
        htmlCurrent = '<li class="' + pCssLiName + '">';
      }
    }
    return htmlCurrent;
  }
  function isGnbCheck(arr, v) {
    var isGnb = false;
    $.each(arr, function (key, value) {
      if (value[v] === "T") {
        isGnb = true;
      }
    });
    return isGnb;
  }
  function makeMenuGNB(jsonMenu, menuDp) {
    var htmlMenu = "",
      cssCurrent = "";
    $.each(jsonMenu, function (key, value) {
      switch (menuDp) {
        case 1:
          htmlMenu += makeCssCurrentHtml(value.linkUrl, "d1", value.children);
          htmlMenu +=
            '   <a href="' +
            value.linkUrl +
            '" class="d1-a"' +
            value.menuNm +
            '">' +
            value.menuNm.toUpperCase() +
            "</a>";
          htmlMenu += '       <div class="gnb-draw renew_gnb">';
          htmlMenu += '           <div class="l-draw NEWS">';
          htmlMenu += '               <div class="draw-title">';
          htmlMenu +=
            '                   <h2 class="gnb-h">' +
            value.menuNm.toUpperCase() +
            "</h2>";
          htmlMenu +=
            '                   <p class="gnb-info">' +
            value.oneDpDc +
            "</p>";
          htmlMenu +=
            '                   <a href="' +
            value.linkUrl +
            '" class="d1-more"' +
            value.menuNm +
            '">' +
            "Learn More" +
            "</a>";
          htmlMenu += "               </div>";
          htmlMenu += "           </div>";
          htmlMenu += "       </div>";
          htmlMenu += "</li> ";
      }
    });
    return htmlMenu;
  }
  function makeMenuSideNav(jsonMenu, menuDp) {
    var htmlMenu = "";
    $.each(jsonMenu, function (key, value) {
      switch (menuDp) {
        case 1:
          if (value.gnbExpsrYn === "T") {
            htmlMenu += '\n<li class="d1">\n';
            if (
              value.children.length == 0 ||
              (IG.apgCountry != "int" && value.oneDpMenuTy == "Brand")
            ) {
              htmlMenu +=
                '   <a href="' +
                value.linkUrl +
                '" class="nav-a"' +
                value.menuNm +
                '">' +
                value.menuNm +
                "</a>\n";
            } else {
              htmlMenu += '   <div class="nav-draw d2-box">\n';
              htmlMenu += '       <dl class="nav-dl">\n';
              htmlMenu += "           <dt>\n";
              htmlMenu +=
                '               <a href="' +
                value.linkUrl +
                '" class="nav-h"' +
                value.menuNm +
                '">' +
                value.menuNm +
                "</a>\n";
              htmlMenu += "           </dt>\n";
              if (
                value.children.length &&
                isGnbCheck(value.children, "gnbExpsrYn")
              ) {
                htmlMenu += makeMenuSideNav(value.children, 2);
              }
              htmlMenu += "       </dl>\n";
              htmlMenu += "   </div>\n";
            }
            htmlMenu += "</li>\n";
          }
          break;
      }
    });
    return htmlMenu;
  }
  //GNB, SideNav Menu 생성.
  function generateLayout() {
    //Header
    $("#header > div.l-header > div.utils").load("layout/header-util.html");
    //sideNav
    $.ajax({
      url: "layout/sidenav-misc.html",
      dataType: "html",
      async: false,
      success: function (result) {
        $("#nav").after(result);
      },
      error: function (request, status, error) {
        console.log("code:" + request.status + "\n" + "error" + error);
      },
    });
    //menu.json
    $.ajax({
      url: "layout/menu.json",
      dataType: "json",
      async: false,
      success: function (result) {
        var htmlMenu = "";
        //GNB Menu
        htmlMenu = makeMenuGNB(result.menu, 1);
        $("#gnb-menu").html(htmlMenu);
        //SideNav Menu
        htmlMenu = makeMenuSideNav(result.menu, 1);
        $("#nav").html(htmlMenu);
        IG.Nav = require(["nav"]);
      },
      error: function (request, status, error) {
        console.log("code:" + request.status + "\n" + "error:" + error);
      },
    });
  }

  // 새롭게 추가할 i 태그 생성 함수 (링크가 없는 아이콘)
  function createIcon() {
    const icon = document.createElement("i");
    icon.classList.add("icon-newwindow"); // 필요한 아이콘 클래스를 추가하세요
    return icon;
  }


  function displayLayout() {
    generateLayout();
  }
  return {
    displayLayout: displayLayout,
  };
});
