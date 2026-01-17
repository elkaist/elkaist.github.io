//"use strict";

// RequireJS 설정 객체
var require = {
  baseUrl: "./js/",

  paths: {
    // major library
    jquery: "jquery-1.11.2.min",
    underscore: "underscore-min",
    TweenMax: "TweenMax.min",
    gsap: "jquery.gsap.min",
    sticky: "jquery.sticky-kit.min",
    scrollto: "ScrollToPlugin.min", // GSAP ScrollTo plugin
    bezier: "BezierEase", // GSAP Bezier easing
    cssrule: "CSSRulePlugin.min", // GSAP CSS Rule plugin

    // library
    d3: "d3.v3.min",
    // 'c3': 'c3',
    c3: "c3.min",
    "ua-parser-js": "ua-parser.pack",
    googlemaps:
      "http://maps.google.com/maps/api/js?v=3&sensor=false&region=KR&ver=4.1.1&language=en&key=AIzaSyCqATZxgQ_bPWzc5SF43-1w31S0MZPaUqI",

    swiper: "swiper-bundle.min",
    splitType: "split-type.min",

    // jQuery Plug-in
    wheel: "jquery.mousewheel.min",
    menuaim: "jquery.menu-aim",
    validate: "jquery.form-validator.min",
    slick: "slick",
    modal: "jquery.modal.min",
    viewport: "jquery.viewport",
    countUp: "countUp.min",
    datepicker: "jquery-ui.datepicker.min",
    transit: "jquery.transit.min",
    IScroll: "scrolloverflow.min",
    fullpage: "jquery.fullpage.min",
    ScrollMagic: "ScrollMagic.min",
    "ScrollMagic.debug": "jquery.scrollmagic.debug",

    //2021-06-04 추가
    waypoints: "jquery.waypoints.min",
    counterUp: "jquery.counterup.min",

    // custom
    smoothscroll: "smoothscroll",
    fakescroll: "fakescroll",
    scroller: "jquery.scroller",

    ytiframe: "jquery.ytiframe",
    inview: "jquery.inview",
    simpletab: "jquery.simpletab",
    togglelayer: "jquery.togglelayer",
    lettering: "jquery.lettering",
    spritely: "jquery.spritely",
    shift: "jquery.shift",
  },
  waitSeconds: 0,

  shim: {
    c3: {
      deps: ["d3"],
    },
    gsap: {
      deps: ["jquery", "TweenMax"],
    },
    scrollto: {
      deps: ["TweenMax"],
    },
    bezier: {
      deps: ["TweenMax"],
    },
    cssrule: {
      deps: ["TweenMax"],
    },
    validate: {
      deps: ["jquery"],
    },
    sticky: {
      deps: ["jquery"],
    },
    modal: {
      deps: ["jquery"],
    },
    counterUp: {
      deps: ["waypoints"],
    },
    datepicker: {
      deps: ["jquery"],
    },
    ytiframe: {
      deps: ["jquery", "swfobject"],
    },
    scroller: {
      deps: ["jquery", "gsap", "wheel"],
    },
    viewport: {
      deps: ["jquery"],
    },
    inview: {
      deps: ["jquery"],
    },
    menuaim: {
      deps: ["jquery"],
    },
    simpletab: {
      deps: ["jquery"],
    },
    togglelayer: {
      deps: ["jquery"],
    },
    lettering: {
      deps: ["jquery"],
    },
    spritely: {
      deps: ["jquery"],
    },
    googlemaps: {
      exports: "google",
    },
    transit: {
      deps: ["jquery"],
    },
    IScroll: {
      deps: ["jquery"],
    },
    fullpage: {
      deps: ["jquery", "IScroll"],
    },
  },

  waitSeconds: 300,
  // 개발 환경에서 브라우저 캐시 회피, 배포시 주석처리 필요
  //, urlArgs: 'ts=' + (new Date()).getTime()
};
