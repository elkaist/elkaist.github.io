define(["global", "jquery", "gsap", "slick"], function (i, n, e) {
  "use strict";

  function t(e) {
    var t = n(e.target),
      o = t.find(".slick-current"),
      d = (o.find("slide-h"), n(".slick-pager")),
      r = o.index(),
      p = new TimelineMax({
        paused: !0,
      });
    t.width();
    (t.find(".slick-dots").wrap('<div class="slick-paging">'),
      d.append('<div class="l-wrap"><div class="l-wide"><ul /></div></div>'),
      g.each(function (i, e) {
        var t = n(e).find(".slide-h").text();
        d.find("ul").append(
          '<li><button type="button" class="slider-pager-btn" data-slide-index="' +
            i +
            '"><b>' +
            t +
            "</b></button></li>",
        );
      }),
      (k = v.find(".slider-pager-btn")),
      i.size < i.BP_MEDIUM && n(".slick-arrow").removeClass("btn-r-light"),
      i.UI.switchLayout(
        "mainSliderBG",
        function () {
          return i.size < i.BP_MEDIUM;
        },
        function (i) {
          t.find(".slide").each(function () {
            var e = n(this);
            e.css(
              "background-image",
              "url(" + e.data(i ? "small" : "large") + ")",
            );
          });
        },
      ),
      s(),
      p
        .to(t, 0.5, {
          autoAlpha: 1,
        })
        .play(),
      a(o),
      u(o),
      c(r),
      l(),
      v.css("visibility", "visible"),
      v.on({
        focusin: function () {
          f = !0;
        },
        focusout: function () {
          f = !1;
        },
        mouseenter: function () {
          f = !0;
        },
        mouseleave: function () {
          f = !1;
        },
      }));
  }

  function s() {
    function e(i) {
      var n,
        e = i.width(),
        a = i.height(),
        l = i.find(".slide-video");
      e / t < a
        ? ((n = Math.ceil(a * t)),
          l
            .width(n)
            .height(a + 2 * s)
            .css({
              left: (e - n) / 2,
              top: -s,
            }))
        : ((n = Math.ceil(e / t)),
          l
            .width(e)
            .height(n + 2 * s)
            .css({
              left: 0,
              top: (a - (n + 2 * s)) / 2,
            }));
    }
    var t = 16 / 9,
      s = 45;
    (b.find(".slide:not(.slick-cloned)").each(function () {
      var e,
        t = n(this),
        s = t.find(".slide-video"),
        a = t.data("video");
      a &&
        !i.isLegacyIE &&
        ((e = n('<video src="' + a + '" loop autoplay muted playsinline/>')),
        s.append(e),
        TweenMax.to(s, 0.5, {
          autoAlpha: 1,
        }));
    }),
      b.on("setPosition", function () {
        e(b);
      }),
      e(b));
  }

  function a(i) {
    var n = i.find(".slide-deco"),
      e = i.find(".slide-h"),
      t = i.find(".slide-sub"),
      s = i.find(".slide-more"),
      a = new TimelineMax(),
      l = new TimelineMax();
    (a
      .to(n, 1, {
        autoAlpha: 1,
      })
      .to(e, 0.8, {
        autoAlpha: 1,
      })
      .to(s, 0.8, {
        autoAlpha: 1,
      }),
      l.to(t, 0.8, {
        autoAlpha: 1,
        delay: 1.4,
      }));
  }

  function l() {
    (d(), (h = 0), (f = !1), (p = setInterval(o, 10)));
  }

  //다음 영상으로 자동으로 넘어감
  function o() {
    f === !1 &&
      ((h += 1 / (m + 0.1)),
      w.css({ width: h + "%" }),
      h >= 100 && (b.slick("slickNext"), l()));
  }

  function d() {
    (w.css({
      width: "0%",
    }),
      clearTimeout(p));
  }

  function c(i) {
    (k.parent("li").removeClass("is-current"),
      k
        .filter("[data-slide-index=" + i + "]")
        .parent("li")
        .addClass("is-current"));
  }

  function r(i) {
    i.find("video").length && i.find("video")[0].pause();
  }

  function u(i) {
    i.find("video").length && i.find("video")[0].play();
  }
  var f,
    p,
    h,
    v = n(".home-intro"),
    b = v.find(".slider"),
    g = v.find(".slide"),
    k = n(),
    w = v.find(".slick-progress-bar"),
    x =
      '<button type="button" class="slick-arrow slick-prev btn-r btn-r-light btn-r-left"><span class="blind">이전</span></button>',
    M =
      '<button type="button" class="slick-arrow slick-next btn-r btn-r-light btn-r-right"><span class="blind">다음</span></button>',
    m = 13;
  (b
    .on("init", t)
    .slick({
      speed: 700,
      easing: "easeInOutQuart",
      dots: !1,
      fade: !0,
      prevArrow: x,
      nextArrow: M,
      zIndex: 50,
    })
    .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
      var nextPanel = $("[data-slick-index=" + nextSlide + "]");
      var img_url = $(nextPanel)
        .css("background-image")
        .replace(/^url\(['"](.+)['"]\)/, "$1");
      $(nextPanel)
        .prepend("<div></div>")
        .siblings("div")
        .find(".slide-motion-img")
        .remove();
      $(".slider .slide-spacer").siblings("div").addClass("slide-motion-img");
      $(".slider .slide-motion-img").css({
        "background-image": "url(" + img_url + ")",
      });
      $(".slider .slide-motion-img").animate({ transform: "scale(1)" }, 5000);
    }),
    b.on("beforeChange", function (e, t, s, o) {
      var d = n('div.slide[data-slick-index="' + o + '"]');
      (a(d),
        c(o),
        l(),
        i.isMobile ||
          !Modernizr.videoautoplay ||
          i.isNaver ||
          (r(n('div.slide[data-slick-index="' + s + '"]')), u(d)));
    }),
    k.on("click", function () {
      var i = n(this).data("slide-index");
      b.slick("slickGoTo", parseInt(i));
    }));

  $(function () {
    $(".slider").addClass("slideImgMotion");
    var bgImg = $(".slider .slick-active").css("background-image");
    if (bgImg && bgImg !== "none") {
      var img_url2 = bgImg.replace(/^url\(['"]?(.+?)['"]?\)/, "$1");
      $(".slider .slick-active").prepend("<div></div>");
      $(".slider .slide-spacer").siblings("div").addClass("slide-motion-img");
      $(".slider .slide-motion-img").css({
        "background-image": "url(" + img_url2 + ")",
      });
      $(".slider .slide-motion-img").animate({ transform: "scale(1)" }, 5000);
    }
  });

  n(".slick-arrow").on("click", function () {
    n(this).blur();
  });
});
