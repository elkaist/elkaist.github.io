/**
 * 전체 페이지 공통 실행 모듈
 */
define(function (require) {
  "use strict";

  void 0;

  // load modules
  var IG = require("global"),
    DPLayout = require("layoutDisplay"),
    selectbox = require("selectbox"),
    SwitchSelect = require("switchselect"),
    viewport = require("viewport"),
    inview = require("inview")
    ;

  /**
   * 본문 바로가기 링크 작동
   */
  function skipNav() {
    IG.$main.on("focusout", function () {
      IG.$main.removeAttr("tabindex");
    });
    $("#skipnav, #go-to-top").on("click", function () {
      IG.$main.attr("tabindex", "-1").focus();
    });

    $(".slick-arrow").on("click", function () {
      n(this).blur();
    });
  }

  /**
   * 내용 처음으로 가기
   */
  function goToTop() {
    var $topBtn = $("#go-to-top");

    $topBtn.on("click", function (event) {
      $("html, body").stop().animate({ scrollTop: 0 }, 500, "easeOutQuad");
      event.preventDefault();
      event.stopPropagation();
    });
  }

 
  /**
   * 전체 페이지 공통 실행
   */
  $(function () {
    // 디버그용 모듈 로드
    void 0;

    DPLayout.displayLayout();

    skipNav();
    goToTop();

    // 사이즈에 따라 cover 적용
    var $cover = $(".content-header-cover");

    IG.UI.switchLayout(
      "coverStillBg",
      function () {
        return IG.size < IG.BP_MEDIUM;
      },
      function (isSmall) {
        $cover.css(
          "background-image",
          "url(" + $cover.data(isSmall ? "small" : "large") + ")",
        );
      },
    );

    selectbox();
    new SwitchSelect($(".switch-select"));
    
    $("#gnb-menu li a").on("mouseenter", function () {
      var strHref = $(this).attr("href");
      var hrefName = "news";
      if (strHref.indexOf(hrefName) !== -1) {
        $("body").addClass("opacity_off");
      }
    });
    $("#gnb-menu li a").on("mouseleave", function () {
      $("body").removeClass("opacity_off");
    });
  });

  // 전역 객체 리턴
  return IG;
});
