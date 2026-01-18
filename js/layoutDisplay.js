// layoutDisplay.js
// apg_cmjs_rj_draw_dp //커스텀텍

/**
 * layoutDisplay
 * last update: 2023-04-13
 * 롱테이크 카테고리 변경
 */
define(["global", "jquery", "underscore"], function (IG, $, _) {
  "use strict";
  function convertWord(pWord) {
    var rtnWord = pWord;
    if (pWord == "Learn More") {
      if (IG.apgCountry == "int" && IG.apgLanguage == "ko") {
        rtnWord = "자세히 보기";
      } else if (IG.apgCountry == "int" && IG.apgLanguage == "zh") {
        rtnWord = "查看详情";
      } else if (IG.apgCountry == "th" && IG.apgLanguage == "th") {
        rtnWord = "อ่านรายละเอียดเพิ่มเติม";
      } else if (IG.apgCountry == "jp" && IG.apgLanguage == "ja") {
        rtnWord = "詳細";
      }
    } else if (pWord == "Stock Price") {
      if (IG.apgCountry == "int" && IG.apgLanguage == "ko") {
        rtnWord = "주가 정보";
      } else if (IG.apgCountry == "int" && IG.apgLanguage == "zh") {
        rtnWord = "股票信息";
      }
    } else if (pWord == "All Brands") {
      if (IG.apgCountry == "int" && IG.apgLanguage == "zh") {
        rtnWord = "所有品牌";
      } else if (IG.apgCountry == "th" && IG.apgLanguage == "th") {
        rtnWord = "แบรนด์ทั้งหมด";
      } else if (IG.apgCountry == "tw" && IG.apgLanguage == "zh") {
        rtnWord = "全部品牌";
      }
    } else if (pWord == "HQ") {
      if (IG.apgCountry == "int" && IG.apgLanguage == "ko") {
        rtnWord = "본사";
      } else if (IG.apgCountry == "int" && IG.apgLanguage == "zh") {
        rtnWord = "总公司";
      } else if (IG.apgCountry == "th" && IG.apgLanguage == "th") {
        rtnWord = "สำนักงานใหญ่";
      } else if (IG.apgCountry == "jp" && IG.apgLanguage == "ja") {
        rtnWord = "本社";
      }
    } else if (pWord == "Global") {
      if (IG.apgCountry == "int" && IG.apgLanguage == "ko") {
        rtnWord = "해외법인";
      } else if (IG.apgCountry == "int" && IG.apgLanguage == "zh") {
        rtnWord = "";
      } else if (IG.apgCountry == "th" && IG.apgLanguage == "th") {
        rtnWord = "";
      } else if (IG.apgCountry == "jp" && IG.apgLanguage == "ja") {
        rtnWord = "";
      }
    }
    return rtnWord;
  }
  function makeCssCurrentHtml(pLinkUrl, pCssLiName, pChildren) {
    var urlHost = window.location.protocol + "//" + window.location.host,
      urlFull = window.location.href,
      urlPage = urlFull.replace(urlHost, ""),
      htmlCurrent = "",
      strChildren = JSON.stringify(pChildren);
    if (typeof strChildren == "undefined" || strChildren == null) {
      strChildren = "";
    }
    var isICSPreview = false;
    // ICS 미리보기에서 is-current CSS
    if (urlPage.indexOf("/publish/preview.do") > -1) {
      var arrParameter = urlFull.split("?"),
        nowSiteCategory = "";
      isICSPreview = true;
      if (arrParameter.length == 2) {
        var arrParamValue = arrParameter[1].split("&"),
          intCatId = -1,
          strNowMenu = "";
        for (var i in arrParamValue) {
          intCatId = arrParamValue[i].indexOf("catId=");
          if (intCatId > -1) {
            strNowMenu = arrParamValue[i] + "&";
            if (
              pLinkUrl.indexOf(strNowMenu) > -1 ||
              strChildren.indexOf(strNowMenu) > -1
            ) {
              pLinkUrl = urlPage;
              break;
            }
          }
        }
      }
    }
    var urlDirPattern = /(\/)(\w+)([-]?[0-9a-zA-Z])*(?=\/)/gi,
      arrDirUrlPage = urlPage.match(urlDirPattern) || [],
      arrDirLinkUrl = pLinkUrl.match(urlDirPattern) || [],
      dirUrlPage = urlPage,
      dirLinkUrl = pLinkUrl;
    if (!isICSPreview && arrDirUrlPage.length >= 4) {
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
        (!isICSPreview && dirUrlPage == dirLinkUrl) ||
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
  function makeMenuBrandGNB(jsonMenuBrand, urlBrand) {
    var htmlBrandMenu = "",
      lngSubMenu = Object.keys(jsonMenuBrand).length,
      cntSubMenu = 0,
      cntGnbSubMenu = 0;
    $.each(jsonMenuBrand, function (key, value) {
      cntSubMenu += 1;
      if (value.gnbExpsrYn === "T") {
        cntGnbSubMenu += 1;
        htmlBrandMenu += "<li>";
        htmlBrandMenu +=
          '  <a href="' +
          value.linkUrl +
          '" class="brand-a ' +
          value.brdCSS +
          '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
          value.menuNm +
          '">';
        htmlBrandMenu += '      <span class="brand-a-pad">';
        htmlBrandMenu +=
          '          <img src="' +
          value.gnbImage +
          '" class="brand-img" alt="' +
          value.menuNm +
          '">';
        htmlBrandMenu += "      </span>";
        htmlBrandMenu += "  </a>";
        htmlBrandMenu += "</li> ";
      }
      if (cntGnbSubMenu == 5) {
        htmlBrandMenu += "<li>";
        htmlBrandMenu +=
          '  <a href="' +
          urlBrand +
          '" class="brand-a all" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="All Brands">';
        htmlBrandMenu += '      <span class="brand-a-pad">';
        htmlBrandMenu += convertWord("All Brands");
        htmlBrandMenu += "      </span>";
        htmlBrandMenu += "  </a>";
        htmlBrandMenu += "</li> ";
        return false;
      } else if (
        lngSubMenu == cntSubMenu &&
        cntGnbSubMenu > 0 &&
        cntGnbSubMenu % 3 == 0
      ) {
        return false;
      }
    });
    return htmlBrandMenu;
  }
  function makeMenuBrandGNB_01(jsonMenuBrand, urlBrand) {
    var htmlBrandMenu = "",
      lngSubMenu = Object.keys(jsonMenuBrand).length,
      cntSubMenu = 0,
      cntGnbSubMenu = 0;
    $.each(jsonMenuBrand, function (key, value) {
      cntSubMenu += 1;
      if (value.gnbExpsrYn === "T") {
        cntGnbSubMenu += 1;
        htmlBrandMenu += "<li>";
        htmlBrandMenu +=
          '  <a href="' +
          value.linkUrl +
          '" class="brand-a ' +
          value.brdCSS +
          '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
          value.menuNm +
          '" tabindex="2">';
        htmlBrandMenu += '      <span class="brand-a-pad">';
        htmlBrandMenu +=
          '          <img src="' +
          value.gnbImage +
          '" class="brand-img" alt="' +
          value.menuNm +
          '">';
        htmlBrandMenu += "      </span>";
        htmlBrandMenu += "  </a>";
        htmlBrandMenu += "</li> ";
      }
      if (cntGnbSubMenu == 8) {
        htmlBrandMenu += "<li>";
        htmlBrandMenu +=
          '  <a href="' +
          urlBrand +
          '" class="brand-a all" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="All Brands" tabindex="2">';
        htmlBrandMenu += '      <span class="brand-a-pad">';
        htmlBrandMenu += convertWord("All Brands");
        htmlBrandMenu += "      </span>";
        htmlBrandMenu += "  </a>";
        htmlBrandMenu += "</li> ";
        return false;
      } else if (
        lngSubMenu == cntSubMenu &&
        cntGnbSubMenu > 0 &&
        cntGnbSubMenu % 3 == 0
      ) {
        return false;
      }
    });
    return htmlBrandMenu;
  }
  function makeMenuBrand(jsonMenuBrand, menuType, brandse) {
    var htmlBrandMenu = "",
      lngSubMenu = 0,
      objBrand = new Object();
    if (menuType == "brandse") {
      objBrand = jsonMenuBrand.brandse;
    } else {
      objBrand = jsonMenuBrand.children;
    }
    lngSubMenu = Object.keys(objBrand).length;
    $.each(objBrand, function (key, value) {
      switch (menuType) {
        case "brandse":
          if (lngSubMenu && value.gnbExpsrYn === "T") {
            htmlBrandMenu += "<dd>\n";
            htmlBrandMenu += ' <div class="nav-draw d3-box">\n';
            htmlBrandMenu += '     <dl class="nav-dl">\n';
            htmlBrandMenu += "         <dt>\n";
            htmlBrandMenu +=
              '             <a href="#" class="nav-h" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
              value.menuNm +
              '">' +
              value.menuNm +
              "</a>\n";
            htmlBrandMenu += "         </dt>\n";
            htmlBrandMenu += makeMenuBrand(
              jsonMenuBrand,
              "brandsidenav",
              value.menuId
            );
            htmlBrandMenu += "     </dl>\n";
            htmlBrandMenu += " </div>\n";
            htmlBrandMenu += "</dd>\n";
          }
          break;
        case "brandsidenav":
          if (lngSubMenu && value.expsrYn === "T") {
            if (brandse == value.brdSe) {
              htmlBrandMenu += "<dd>\n";
              htmlBrandMenu +=
                '  <a href="' +
                value.linkUrl +
                '" class="nav-a" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                value.menuNm +
                '">' +
                value.menuNm +
                "</a>\n";
              htmlBrandMenu += "</dd>\n";
            }
          }
          break;
      }
    });
    return htmlBrandMenu;
  }
  function makeMenuGNB(jsonMenu, menuDp) {
    var htmlMenu = "",
      cssCurrent = "";
    $.each(jsonMenu, function (key, value) {
      switch (menuDp) {
        case 1:
          if (value.gnbExpsrYn === "T") {
            htmlMenu += makeCssCurrentHtml(value.linkUrl, "d1", value.children);
            htmlMenu +=
              '   <a href="' +
              value.linkUrl +
              '" class="d1-a" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
              value.menuNm +
              '">' +
              value.menuNm.toUpperCase() +
              "</a>";
            htmlMenu += '       <div class="gnb-draw renew_gnb">';
            if (value.children.length && value.oneDpMenuTy == "Brand") {
              htmlMenu += '           <div class="l-draw Brand">';
            } else if (
              value.children.length &&
              value.oneDpMenuTy == "OurCulture"
            ) {
              htmlMenu += '           <div class="l-draw OurCulture">';
            } else if (
              value.children.length &&
              value.oneDpMenuTy == "Investors"
            ) {
              htmlMenu += '           <div class="l-draw INVESTORS">';
            } else if (
              value.children.length &&
              value.oneDpMenuTy == "Careers"
            ) {
              htmlMenu += '           <div class="l-draw CAREERS">';
            } else if (value.oneDpMenuTy == "NEWS") {
              htmlMenu += '           <div class="l-draw NEWS">';
            } else if (
              value.children.length &&
              value.oneDpMenuTy == "Commitments"
            ) {
              htmlMenu += '           <div class="l-draw Commitments">';
            } else {
              htmlMenu += '           <div class="l-draw">';
            }
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
              '" class="d1-more" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
              value.menuNm +
              '">' +
              convertWord("Learn More") +
              "</a>";
            htmlMenu += "               </div>";
            if (value.children.length && value.oneDpMenuTy == "aboutUs") {
              htmlMenu += '<div class="d2lswrap">';
              htmlMenu += '   <ul class="d2_ls">';
              htmlMenu +=
                '       <li class="depth01"><a href="' +
                value.children[0].linkUrl +
                '" class="tit" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                value.children[0].menuNm +
                '"><strong>' +
                value.children[0].menuNm +
                "</strong></a>";
              htmlMenu += '           <ul class="d2cont_depth02">';
              for (
                var index = 0;
                index < value.children[0].children.length;
                index++
              ) {
                htmlMenu +=
                  '<li><a href="' +
                  value.children[0].children[index].linkUrl +
                  '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                  value.children[0].children[index].menuNm +
                  '">' +
                  value.children[0].children[index].menuNm +
                  "</a></li>";
              }
              htmlMenu += "           </ul>";
              htmlMenu += "       </li>";
              htmlMenu +=
                '       <li class="depth01"><a href="' +
                value.children[1].linkUrl +
                '" class="tit" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                value.children[1].menuNm +
                '"><strong>' +
                value.children[1].menuNm +
                "</strong></a>";
              htmlMenu += '           <ul class="d2cont_depth02">';
              for (
                var index = 0;
                index < value.children[1].children.length;
                index++
              ) {
                htmlMenu +=
                  '<li><a href="' +
                  value.children[1].children[index].linkUrl +
                  '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                  value.children[1].children[index].menuNm +
                  '">' +
                  value.children[1].children[index].menuNm +
                  "</a></li>";
              }
              htmlMenu += "           </ul>";
              htmlMenu += "       </li>";
              htmlMenu +=
                '       <li class="depth01"><a href="' +
                value.children[2].linkUrl +
                '" class="tit" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                value.children[2].menuNm +
                '"><strong>' +
                value.children[2].menuNm +
                "</strong></a>";
              htmlMenu += '           <ul class="d2cont_depth02">';
              for (
                var index = 0;
                index < value.children[2].children.length;
                index++
              ) {
                htmlMenu +=
                  '<li><a href="' +
                  value.children[2].children[index].linkUrl +
                  '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                  value.children[2].children[index].menuNm +
                  '">' +
                  value.children[2].children[index].menuNm +
                  "</a></li>";
              }
              htmlMenu += "           </ul>";
              htmlMenu += "       </li>";
              htmlMenu += "   </ul>";
              htmlMenu += "</div>";
            } else if (value.children.length && value.oneDpMenuTy == "Brand") {
              htmlMenu += '<div class="d2lswrap">';
              htmlMenu += '<ul class="d2_ls01">';
              htmlMenu += '<li class="active_on">';
              htmlMenu += '<div class="d2cont_wrap">';
              htmlMenu += '<ul class="tbl_ls">';
              htmlMenu += makeMenuBrandGNB_01(value.children, value.linkUrl);
              htmlMenu += "</ul>";
              htmlMenu += "</div>";
              htmlMenu += "</li>";
              htmlMenu +=
                '<li><strong class="tit" tabindex="0" role="button" style ="width: 150px">' +
                value.brandse[0].menuNm +
                "</strong>";
              htmlMenu += '<div class="d2cont_wrap">';
              htmlMenu += '<ul class="d2dep02_ls">';
              for (var index = 0; index < 10; index++) {
                if (value.children[index].brdSe == "Beauty Care") {
                  htmlMenu +=
                    '<li><a href="' +
                    value.children[index].linkUrl +
                    '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                    value.children[index].markNm +
                    '">' +
                    value.children[index].markNm +
                    "</a></li>";
                }
              }
              htmlMenu += "</ul>";
              htmlMenu += '<ul class="d2dep02_ls">';
              for (var index = 10; index < value.children.length; index++) {
                if (value.children[index].brdSe == "Beauty Care") {
                  htmlMenu +=
                    '<li><a href="' +
                    value.children[index].linkUrl +
                    '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                    value.children[index].markNm +
                    '">' +
                    value.children[index].markNm +
                    "</a></li>";
                }
              }
              htmlMenu += "</ul>";
              htmlMenu += "</div>";
              htmlMenu += "</li>";

              htmlMenu +=
                '<li><strong class="tit" tabindex="0" role="button" style ="width: 150px">' +
                value.brandse[1].menuNm +
                "</strong>";
              htmlMenu += '<div class="d2cont_wrap">';
              htmlMenu += '<ul class="d2dep02_ls">';
              for (var index = 0; index < value.children.length; index++) {
                if (value.children[index].brdSe == "Medical Beauty") {
                  htmlMenu +=
                    '<li><a href="' +
                    value.children[index].linkUrl +
                    '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                    value.children[index].markNm +
                    '">' +
                    value.children[index].markNm +
                    "</a></li>";
                }
              }
              htmlMenu += "</ul>";
              htmlMenu += "</div>";
              htmlMenu += "</li>";
              htmlMenu +=
                '<li><strong class="tit" tabindex="0" role="button" style ="width: 150px">' +
                value.brandse[2].menuNm +
                "</strong>";
              htmlMenu += '<div class="d2cont_wrap">';
              htmlMenu += '<ul class="d2dep02_ls">';
              for (var index = 0; index < value.children.length; index++) {
                if (value.children[index].brdSe == "Beauty Device") {
                  htmlMenu +=
                    '<li><a href="' +
                    value.children[index].linkUrl +
                    '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                    value.children[index].markNm +
                    '">' +
                    value.children[index].markNm +
                    "</a></li>";
                }
              }
              htmlMenu += "</ul>";
              htmlMenu += "</div>";
              htmlMenu += "</li>";
              htmlMenu +=
                '<li><strong class="tit" tabindex="0" role="button" style ="width: 150px">' +
                value.brandse[3].menuNm +
                "</strong>";
              htmlMenu += '<div class="d2cont_wrap">';
              htmlMenu += '<ul class="d2dep02_ls">';
              for (var index = 0; index < value.children.length; index++) {
                if (value.children[index].brdSe == "Inner Beauty") {
                  htmlMenu +=
                    '<li><a href="' +
                    value.children[index].linkUrl +
                    '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                    value.children[index].markNm +
                    '">' +
                    value.children[index].markNm +
                    "</a></li>";
                }
              }
              htmlMenu += "</ul>";
              htmlMenu += "</div>";
              htmlMenu += "</li>";
              htmlMenu +=
                '<li><strong class="tit" tabindex="0" role="button" style ="width: 150px">' +
                value.brandse[4].menuNm +
                "</strong>";
              htmlMenu += '<div class="d2cont_wrap">';
              htmlMenu += '<ul class="d2dep02_ls">';
              for (var index = 0; index < value.children.length; index++) {
                if (value.children[index].brdSe == "Hair") {
                  htmlMenu +=
                    '<li><a href="' +
                    value.children[index].linkUrl +
                    '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                    value.children[index].markNm +
                    '">' +
                    value.children[index].markNm +
                    "</a></li>";
                }
              }
              htmlMenu += "</ul>";
              htmlMenu += "</div>";
              htmlMenu += "</li>";
              htmlMenu +=
                '<li><strong class="tit" tabindex="0" role="button" style ="width: 150px">' +
                value.brandse[5].menuNm +
                "</strong>";
              htmlMenu += '<div class="d2cont_wrap">';
              htmlMenu += '<ul class="d2dep02_ls">';
              for (var index = 0; index < value.children.length; index++) {
                if (value.children[index].brdSe == "Body") {
                  htmlMenu +=
                    '<li><a href="' +
                    value.children[index].linkUrl +
                    '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                    value.children[index].markNm +
                    '">' +
                    value.children[index].markNm +
                    "</a></li>";
                }
              }
              htmlMenu += "</ul>";
              htmlMenu += "</div>";
              htmlMenu += "</li>";
              htmlMenu +=
                '<li><strong class="tit" tabindex="0" role="button" style ="width: 150px">' +
                value.brandse[6].menuNm +
                "</strong>";
              htmlMenu += '<div class="d2cont_wrap">';
              htmlMenu += '<ul class="d2dep02_ls">';
              for (var index = 0; index < value.children.length; index++) {
                if (value.children[index].brdSe == "Oral Care") {
                  htmlMenu +=
                    '<li><a href="' +
                    value.children[index].linkUrl +
                    '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                    value.children[index].markNm +
                    '">' +
                    value.children[index].markNm +
                    "</a></li>";
                }
              }
              htmlMenu += "</ul>";
              htmlMenu += "</div>";
              htmlMenu += "</li>";
              htmlMenu +=
                '<li><strong class="tit" tabindex="0" role="button" style ="width: 150px">' +
                value.brandse[7].menuNm +
                "</strong>";
              htmlMenu += '<div class="d2cont_wrap">';
              htmlMenu += '<ul class="d2dep02_ls">';
              for (var index = 0; index < value.children.length; index++) {
                if (value.children[index].brdSe == "Tea Culture") {
                  htmlMenu +=
                    '<li><a href="' +
                    value.children[index].linkUrl +
                    '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                    value.children[index].markNm +
                    '">' +
                    value.children[index].markNm +
                    "</a></li>";
                }
              }
              htmlMenu += "</ul>";
              htmlMenu += "</div>";
              htmlMenu += "</li>";
              htmlMenu += "</ul>";
              htmlMenu += "</div>";
            } else if (
              value.children.length &&
              value.oneDpMenuTy == "OurCulture"
            ) {
              htmlMenu += '<div class="d2lswrap">';
              htmlMenu += '   <ul class="d2_ls">';
              htmlMenu +=
                '       <li class="depth01"><a href="' +
                value.children[0].linkUrl +
                '" class="tit" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                value.children[0].menuNm +
                '"><strong>' +
                value.children[0].menuNm +
                "</strong></a>";
              htmlMenu += '           <ul class="d2cont_depth02">';
              for (
                var index = 0;
                index < value.children[0].children.length;
                index++
              ) {
                htmlMenu +=
                  '<li><a href="' +
                  value.children[0].children[index].linkUrl +
                  '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                  value.children[0].children[index].menuNm +
                  '">' +
                  value.children[0].children[index].menuNm +
                  "</a></li>";
              }
              htmlMenu += "           </ul>";
              htmlMenu += "       </li>";
              htmlMenu +=
                '       <li class="depth01"><a href="' +
                value.children[1].linkUrl +
                '" class="tit" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                value.children[1].menuNm +
                '"><strong>' +
                value.children[1].menuNm +
                "</strong></a>";
              htmlMenu += '           <ul class="d2cont_depth02">';
              for (
                var index = 0;
                index < value.children[1].children.length;
                index++
              ) {
                htmlMenu +=
                  '<li><a href="' +
                  value.children[1].children[index].linkUrl +
                  '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                  value.children[1].children[index].menuNm +
                  '">' +
                  value.children[1].children[index].menuNm +
                  "</a></li>";
              }
              htmlMenu += "           </ul>";
              htmlMenu += "       </li>";
              htmlMenu +=
                '       <li class="depth01"><a href="' +
                value.children[2].linkUrl +
                '" class="tit" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                value.children[2].menuNm +
                '"><strong>' +
                value.children[2].menuNm +
                "</strong></a>";
              htmlMenu += '           <ul class="d2cont_depth02">';
              for (
                var index = 0;
                index < value.children[2].children.length;
                index++
              ) {
                htmlMenu +=
                  '<li><a href="' +
                  value.children[2].children[index].linkUrl +
                  '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                  value.children[2].children[index].menuNm +
                  '">' +
                  value.children[2].children[index].menuNm +
                  "</a></li>";
              }
              htmlMenu += "           </ul>";
              htmlMenu += "       </li>";
              htmlMenu += "   </ul>";
              htmlMenu += "</div>";
            } else if (
              value.children.length &&
              value.oneDpMenuTy == "Commitments"
            ) {
              htmlMenu += '<div class="d2lswrap">';
              htmlMenu += '   <ul class="d2_ls">';
              htmlMenu +=
                '       <li class="depth01"><a href="' +
                value.children[0].linkUrl +
                '" class="tit" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                value.children[0].menuNm +
                '"><strong>' +
                value.children[0].menuNm +
                "</strong></a>";
              htmlMenu += '           <ul class="d2cont_depth02">';
              for (
                var index = 0;
                index < value.children[0].children.length;
                index++
              ) {
                htmlMenu +=
                  '<li><a href="' +
                  value.children[0].children[index].linkUrl +
                  '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                  value.children[0].children[index].menuNm +
                  '">' +
                  value.children[0].children[index].menuNm +
                  "</a></li>";
              }
              htmlMenu += "           </ul>";
              htmlMenu += "       </li>";
              htmlMenu +=
                '       <li class="depth01"><a href="' +
                value.children[1].linkUrl +
                '" class="tit" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                value.children[1].menuNm +
                '"><strong>' +
                value.children[1].menuNm +
                "</strong></a>";
              htmlMenu += '           <ul class="d2cont_depth02">';
              for (
                var index = 0;
                index < value.children[1].children.length;
                index++
              ) {
                htmlMenu +=
                  '<li><a href="' +
                  value.children[1].children[index].linkUrl +
                  '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                  value.children[1].children[index].menuNm +
                  '">' +
                  value.children[1].children[index].menuNm +
                  "</a></li>";
              }
              htmlMenu += "           </ul>";
              htmlMenu += "       </li>";
              htmlMenu +=
                '       <li class="depth01"><a href="' +
                value.children[2].linkUrl +
                '" class="tit" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                value.children[2].menuNm +
                '"><strong>' +
                value.children[2].menuNm +
                "</strong></a>";
              htmlMenu += '           <ul class="d2cont_depth02">';
              for (
                var index = 0;
                index < value.children[2].children.length;
                index++
              ) {
                htmlMenu +=
                  '<li><a href="' +
                  value.children[2].children[index].linkUrl +
                  '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                  value.children[2].children[index].menuNm +
                  '">' +
                  value.children[2].children[index].menuNm +
                  "</a></li>";
              }
              htmlMenu += "           </ul>";
              htmlMenu += "       </li>";
              htmlMenu += "   </ul>";
              htmlMenu += "</div>";
            }
            if (value.oneDpMenuTy == "Default") {
              var linkUrl = "",
                strTarget = "",
                strTarget = "";
              if (_.isEmpty(value.reprsntLwprtMenuExtrlLinkUrl)) {
                linkUrl = value.reprsntLwprtMenuLinkUrl;
                strTarget = "_self";
              } else {
                linkUrl = value.reprsntLwprtMenuExtrlLinkUrl;
                strTarget = "_target";
              }
              htmlMenu +=
                '<a href="' +
                linkUrl +
                '" class="draw-feature" target="' +
                strTarget +
                '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                value.reprsntLwprtMenuLinkTitle +
                '">';
              htmlMenu +=
                '   <img src="' + value.reprsntLwprtMenuImage + '" alt="">';
              htmlMenu +=
                '   <p class="feature-p">' + value.reprsntLwprtMenuDc + "</p>";
              htmlMenu += "</a>";
            } else if (value.oneDpMenuTy == "Investors") {
              htmlMenu += '<div class="d2lswrap">';
              htmlMenu += '   <ul class="d2_ls">';
              htmlMenu +=
                '       <li class="depth01"><a href="' +
                value.children[0].linkUrl +
                '" class="tit" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                value.children[0].menuNm +
                '"><strong>' +
                value.children[0].menuNm +
                "</strong></a>";
              htmlMenu += '           <ul class="d2cont_depth02">';
              for (
                var index = 0;
                index < value.children[0].children.length;
                index++
              ) {
                htmlMenu +=
                  '<li><a href="' +
                  value.children[0].children[index].linkUrl +
                  '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                  value.children[0].children[index].menuNm +
                  '">' +
                  value.children[0].children[index].menuNm +
                  "</a></li>";
              }

              htmlMenu += "           </ul>";
              htmlMenu += "       </li>";
              htmlMenu +=
                '       <li class="depth01"><a href="' +
                value.children[1].linkUrl +
                '" class="tit" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                value.children[1].menuNm +
                '"><strong>' +
                value.children[1].menuNm +
                "</strong></a>";
              htmlMenu += '           <ul class="d2cont_depth02">';
              for (
                var index = 0;
                index < value.children[1].children.length;
                index++
              ) {
                htmlMenu +=
                  '<li><a href="' +
                  value.children[1].children[index].linkUrl +
                  '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                  value.children[1].children[index].menuNm +
                  '">' +
                  value.children[1].children[index].menuNm +
                  "</a></li>";
              }
              htmlMenu += "           </ul>";
              htmlMenu += "       </li>";
              htmlMenu += "   </ul>";
              htmlMenu += "</div>";

              htmlMenu += '<div class="draw-feature stock">';
              htmlMenu +=
                '   <h3 class="stock-h">' +
                convertWord("Stock Price") +
                "</h3>";
              htmlMenu +=
                '   <div id="stock-box" class="x-gnb-stock-info" data-api-url="ufo/apg/investors@@@stock" data-result-type="jsonp">';
              htmlMenu += '       <div class="loading">';
              htmlMenu +=
                '           <img src="/assets/img/loading.gif" width="40" alt="">';
              htmlMenu += "       </div>";
              htmlMenu += "   </div>";
              htmlMenu += '   <div class="stock-unit">Unit: KRW</div>';
              htmlMenu += "</div>";
            } else if (value.oneDpMenuTy == "Careers") {
              htmlMenu += '<div class="d2lswrap">';
              htmlMenu += '   <ul class="d2_ls">';
              for (var i = 0; i < value.children.length; i++) {
                if (i != 3 && i != 4) {
                  htmlMenu +=
                    '      <li class="depth01"><a href="' +
                    value.children[i].linkUrl +
                    '" class="tit" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                    value.children[i].menuNm +
                    '"><strong>' +
                    value.children[i].menuNm +
                    "</strong></a>";
                } else if (i == 3) {
                  htmlMenu +=
                    '      <li class="depth01"><a href="https://careers.apgroup.com/search/?createNewAlert=false&q=&optionsFacetsDD_customfield1=&optionsFacetsDD_customfield2=&optionsFacetsDD_shifttype=" class="tit outlink" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                    value.children[i].menuNm +
                    '" target="_blank"><strong>' +
                    value.children[i].menuNm +
                    "</strong></a>";
                } else if (i == 4) {
                  htmlMenu +=
                    '      <li class="depth01"><a href="https://www.linkedin.com/company/amorepacific/jobs/?viewAsMember=true" class="tit outlink" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                    value.children[i].menuNm +
                    '" target="_blank"><strong>' +
                    value.children[i].menuNm +
                    "</strong></a>";
                }

                if (value.children[i].children.length > 0) {
                  htmlMenu += '           <div class="d2cont_depth02_wrap">';
                }
                for (var j = 0; j < value.children[i].children.length; j++) {
                  if (i == 0 && j == 0) {
                    htmlMenu += '<ul class="d2cont_depth02">';
                  } else if (i == 2) {
                    if (j == 0) {
                      htmlMenu +=
                        '<ul class="d2cont_depth02" data-title="' +
                        convertWord("HQ") +
                        '">';
                    } else if (j == 1) {
                      htmlMenu += "</ul>";
                      htmlMenu +=
                        '<ul class="d2cont_depth02" data-title="' +
                        convertWord("Global") +
                        '">';
                    }
                  }
                  htmlMenu +=
                    '<li><a href="' +
                    value.children[i].children[j].linkUrl +
                    '" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                    value.children[i].children[j].menuNm +
                    '">' +
                    value.children[i].children[j].menuNm +
                    "</a></li>";
                }
                if (value.children[i].children.length > 0) {
                  htmlMenu += "             </ul>";
                  htmlMenu += "           </div>";
                }
                htmlMenu += "         </li>";
              }
              htmlMenu += "   </ul>";
              htmlMenu += "</div>";
            }
            htmlMenu += "           </div>";
            htmlMenu += "       </div>";
            htmlMenu += "</li> ";
          }
          break;
        case 2:
          if (value.gnbExpsrYn === "T") {
            //2Depth의 하위 카테고리가 한개일 경우 특별처리
            if (
              value.children.length == 1 &&
              value.children[0].gnbExpsrYn === "T"
            ) {
              htmlMenu += makeCssCurrentHtml(
                value.children[0].linkUrl,
                "d2",
                value.children[0].children
              );
              htmlMenu +=
                '   <a href="' +
                value.children[0].linkUrl +
                '" class="d2-a" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                value.children[0].menuNm +
                '">' +
                value.children[0].menuNm +
                "</a>";
              htmlMenu += "</li> ";
            } else {
              htmlMenu += makeCssCurrentHtml(
                value.linkUrl,
                "d2",
                value.children
              );
              htmlMenu +=
                '   <a href="' +
                value.linkUrl +
                '" class="d2-a" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                value.menuNm +
                '">' +
                value.menuNm +
                "</a>";
              if (
                value.children.length &&
                isGnbCheck(value.children, "gnbExpsrYn")
              ) {
                htmlMenu += '       <div class="d3-box">';
                htmlMenu += '           <ul class="d3-list">';
                htmlMenu += makeMenuGNB(value.children, 3);
                htmlMenu += "           </ul>";
                htmlMenu += "       </div>";
              }
              htmlMenu += "</li> ";
            }
          }
          break;
        case 3:
          if (value.gnbExpsrYn === "T") {
            htmlMenu += makeCssCurrentHtml(value.linkUrl, "d3", value.children);
            htmlMenu +=
              '   <a href="' +
              value.linkUrl +
              '" class="d3-a" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
              value.menuNm +
              '">' +
              value.menuNm +
              "</a>";
            htmlMenu += "</li> ";
          }
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
                '" class="nav-a" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
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
                '" class="nav-h" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                value.menuNm +
                '">' +
                value.menuNm +
                "</a>\n";
              htmlMenu += "           </dt>\n";
              if (IG.apgCountry == "int" && value.oneDpMenuTy == "Brand") {
                htmlMenu += makeMenuBrand(value, "brandse");
              } else if (
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
        case 2:
          if (value.gnbExpsrYn === "T") {
            //2Depth의 하위 카테고리가 한개 이하일 경우 특별처리
            if (
              value.children.length <= 1 ||
              isGnbCheck(value.children, "gnbExpsrYn") == false
            ) {
              if (
                value.children.length == 1 &&
                value.children[0].gnbExpsrYn === "T"
              ) {
                htmlMenu +=
                  '<dd><a href="' +
                  value.children[0].linkUrl +
                  '" class="nav-a" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                  value.children[0].menuNm +
                  '">' +
                  value.children[0].menuNm +
                  "</a></dd>\n";
              } else {
                htmlMenu +=
                  '<dd><a href="' +
                  value.linkUrl +
                  '" class="nav-a" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                  value.menuNm +
                  '">' +
                  value.menuNm +
                  "</a></dd>\n";
              }
            } else {
              htmlMenu += "<dd>\n";
              htmlMenu += '   <div class="nav-draw d3-box">\n';
              htmlMenu += '       <dl class="nav-dl">\n';
              htmlMenu += "           <dt>\n";
              htmlMenu +=
                '               <a href="' +
                value.linkUrl +
                '" class="nav-h" ap-click-area="GNB" ap-click-name="Click GNB" ap-click-data="' +
                value.menuNm +
                '">' +
                value.menuNm +
                "</a>\n";
              htmlMenu += "           </dt>\n";
              if (
                value.children.length &&
                isGnbCheck(value.children, "gnbExpsrYn")
              ) {
                htmlMenu += makeMenuSideNav(value.children, 3);
              }
              htmlMenu += "       </dl>\n";
              htmlMenu += "   </div>\n";
              htmlMenu += "</dd>\n";
            }
          }
          break;
        case 3:
          if (value.gnbExpsrYn === "T") {
            htmlMenu += "<dd>\n";
            htmlMenu +=
              '   <a href="' +
              value.linkUrl +
              '" class="nav-a"' +
              value.menuNm +
              '">' +
              value.menuNm +
              "</a>\n";
            htmlMenu += "</dd>\n";
          }
      }
    });
    return htmlMenu;
  }
  //GNB, SideNav Menu 생성.
  function generateLayout() {
    //Header
    $("#header > div.l-header > div.utils").load("layout/header-util.html");
    //Footer
    // $("#footer > div.l-wrap > div.footer-links > div.footer-links-list").load(
    //   "layout/footer/footer-links-list.html"
    // );
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
        IG.navstock = require(["navstock"]);
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

  function updateHrefForCareerLink() {
    // #gnb-menu 하위에서 ap-click-data가 "직무 커리어"인 링크 요소를 선택합니다.
    const careerLink = document.querySelector(
      `#gnb-menu a[ap-click-data="직무 커리어"]`
    );

    // 해당 링크가 존재할 경우 href 값을 변경합니다.
    if (careerLink) {
      careerLink.setAttribute("href", "/int/ko/careers/careers.html");
    }
  }

  function displayLayout() {
    generateLayout();

    updateHrefForCareerLink();
  }
  return {
    displayLayout: displayLayout,
  };
});
