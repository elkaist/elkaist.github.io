define(["jquery"], function (i) {
  "use strict";
  function t(t, n) {
    return "a" === t ? i(n).parent() : i(n);
  }
  function n(i) {
    s(),
      i.addClass("is-active").css("zIndex", 80).data("is-open", !0),
      i.find(".selectbox-option").show(),
      o();
  }
  function e(i) {
    r.hide(),
      l.off("keydown.blockArrow"),
      i.removeClass("is-active").css("zIndex", "").data("is-open", !1);
  }
  function a(i) {
    var t,
      n,
      e,
      a = i.find(".selector"),
      s = i.find(".selectbox-option"),
      o = !!s.find("a").length,
      c = o ? s.find("a") : s.find("label");
    a.width(""),
      s.show().css({ visibility: "hidden", width: "" }),
      i.hasClass("selectbox--wide") ||
        ((t = parseInt(c.width())),
        (n = parseInt(a.width())),
        (e = parseInt(i.width())),
        a.width(Math.max(t, n))),
      s.css({ visibility: "visible", width: "100%" }).hide();
  }
  function s() {
    e(d);
  }
  function o() {
    l.on("keydown.blockArrow", "li", function (t) {
      var n = t.which;
      i.inArray(n, f) > -1 && t.preventDefault();
    });
  }
  function c(i) {
    return (
      i.hasClass("is-disabled") &&
        i.data("disabled-msg") &&
        window.popupNotification &&
        popupNotification({ msg: i.data("disabled-msg"), timer: 3e3 }),
      i.hasClass("is-disabled")
    );
  }
  var d = i("div.selectbox"),
    r = d.find(".selectbox-option"),
    l = i(document),
    f = [38, 40];
  d.data("is-open", !1),
    d.on("click", function (i) {
      i.stopPropagation();
    }),
    l.on("click", s);
  var u = function () {
    d.each(function () {
      function s() {
        var n = 0;
        h.attr("tabindex", 0),
          d(),
          a(u),
          b.on("click", k, function () {
            i(this).hasClass("is-disabled") ? i(this).blur() : o(this);
          }),
          b.on("keydown", k, function (n) {
            var e = t(k, this),
              a = i(this).data("index");
            switch (n.keyCode) {
              case 13:
                w ||
                  (!e.hasClass("is-disabled") && i(this).trigger("click"),
                  n.preventDefault(),
                  n.stopPropagation());
                break;
              case 9:
              case 27:
                l(), n.preventDefault(), n.stopPropagation();
                break;
              case 37:
              case 38:
                e.prev().length && f.eq(a - 1).focus();
                break;
              case 39:
              case 40:
                e.next().length && f.eq(a + 1).focus();
            }
          }),
          b.on("focus", k, function () {
            var i = t(k, this);
            i.addClass("is-active");
          }),
          b.on("blur", k, function () {
            var i = t(k, this);
            i.removeClass("is-active");
          }),
          h.on("click keydown", function (i) {
            ("click" !== i.type && 13 != i.keyCode) ||
              (u.data("is-open")
                ? e(u)
                : (r(), 13 == i.keyCode && f.eq(0).focus()),
              i.preventDefault());
          }),
          (b.has(".is-current").length || b.find(":checked").length) &&
            (w
              ? (b.find(".is-current").addClass("is-active"),
                p.text(b.find(".is-current").text()))
              : ((n = i(window).scrollTop()),
                b.find(":checked").parent().click(),
                b.find(".is-current").click(),
                i(window).scrollTop(n),
                h.blur()));
      }
      function o(t) {
        var n = i(t),
          e = !!n.find(".select-item").length;
        (v = e ? n.find(".select-item").html() : n.text()),
          h.find(">span").html(v),
          w ||
            (b.find("input").prop("checked", !1),
            f.removeClass("is-current"),
            n.find("input").prop("checked", !0).trigger("change"),
            n.addClass("is-current")),
          l();
      }
      function d() {
        (f = w ? b.find("a") : b.find("li")),
          (g = f.length),
          f.each(function (t, n) {
            i(n).data("index", t);
          }),
          w ||
            f
              .attr("tabindex", 0)
              .find("input[type=radio]")
              .attr("tabindex", "-1")
              .each(function (t, n) {
                var e,
                  a,
                  s = i(n);
                (s.attr("id") && "" !== s.attr("id")) ||
                  ((a = s.attr("name") + (t + 1)),
                  s.attr("id", a),
                  (e = s.parent("label") || s.siblings("label")),
                  e.length && e.attr("for", a));
              });
      }
      function r() {
        u.data("is-open") || c(u) || (d(), n(u));
      }
      function l() {
        e(u), h.focus();
      }
      var f,
        u = i(this),
        h = u.find(".selector"),
        p = u.find(".selector-text"),
        b = u.find(".selectbox-option"),
        v = "",
        w = !!b.find("a").length,
        k = w ? "a" : "li",
        g = 0;
      s();
    }),
      i(window).on("resize", function () {
        d.each(function (t, n) {
          a(i(n));
        });
      });
  };
  return function () {
    u();
  };
});
