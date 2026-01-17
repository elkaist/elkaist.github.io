define(["global", "jquery", "underscore", "gsap"], function (i, e, o, t) {
  "use strict";
  return {
    resize: function (i) {
      var o;
      "string" == typeof i && ((o = i), (i = arguments[1])),
        e(window).on("resize" + (o ? "." + o : ""), i),
        i();
    },
    scroll: function (i) {
      var o;
      "string" == typeof i && ((o = i), (i = arguments[1])),
        e(window).on("scroll" + (o ? "." + o : ""), i),
        i();
    },
    switchLayout: function (i, o, t) {
      function n() {
        var i = o();
        i !== s && ((s = i), t(s));
      }
      var s = o();
      e(window).on("resize" + (i ? "." + i : ""), function () {
        n.call(null, s);
      }),
        t(s);
    },
    getScrollbarWidth: function () {
      var i,
        o,
        t = e("<div>"),
        n = e("<div>").appendTo(t);
      return (
        n.css({
          width: "100%",
          height: "150px",
          margin: 0,
          padding: 0,
          border: 0,
        }),
        t.css({
          overflow: "hidden",
          visibillity: "hidden",
          position: "absolute",
          left: 0,
          top: 0,
          width: "100px",
          height: "100px",
          margin: 0,
          padding: 0,
          border: 0,
        }),
        t.appendTo(e("body")),
        (i = n[0].offsetWidth),
        t.css("overflow", "scroll"),
        (o = i == n[0].offsetWidth ? t[0].clientWidth : n[0].offsetWidth),
        t.remove(),
        i - o
      );
    },
    setCookie: function (i, e, o) {
      var t,
        n = new Date();
      n.setDate(n.getDate() + o),
        (t = i + "=" + encodeURI(e) + "; path=/ "),
        "undefined" != typeof o && (t += ";expires=" + n.toGMTString() + ";"),
        (document.cookie = t);
    },
    getCookie: function (i) {
      var e,
        o = document.cookie,
        t = "";
      if (((i += "="), (e = o.indexOf(i)), -1 != e)) {
        var n;
        (e += i.length),
          (n = o.indexOf(";", e)),
          -1 == n && (n = o.length),
          (t = o.substring(e, n));
      }
      return decodeURI(t);
    },
    popupNotification: function (i) {
      function o() {
        TweenMax.to(t, 0.4, {
          autoAlpha: 0,
          ease: Power2.easeIn,
          onComplete: function () {
            t.remove(), a.onClose();
          },
        });
      }
      var t,
        n,
        s = {
          id: "notification-popup",
          type: "noti",
          icon: "icon-light-confirm",
          msg: "Completed.",
          onClose: function () {},
          timer: 5e3,
        },
        a = {},
        c = {};
      e.extend(a, s, i),
        "error" == a.type && (a.icon = "icon-light-alert"),
        (t = e('<div class="notification-popup is-hide" tabindex="0" />')),
        (n = e(
          '<section class="notification-inner"><div class="notification"><h1 class="blind">Notification</h1><i class="icon ' +
            a.icon +
            '"></i><p class="p break-word">' +
            a.msg +
            '</p> </div> <button type="button" class="btn-close"><i class="icon-close"></i><span class="blind">닫기</span></button></section>'
        )),
        t.appendTo("body").attr("id", a.id),
        n.appendTo(t),
        (c.height = parseInt(t.height())),
        t.css("visibility", "visible").focus(),
        t.css("margin-top", (-1 * c.height) / 2),
        TweenMax.fromTo(
          t,
          0.5,
          { autoAlpha: 0 },
          { autoAlpha: 1, ease: Power2.easeOut }
        ),
        t.on("click", o),
        a.timer && setTimeout(o, a.timer);
    },
  };
});
