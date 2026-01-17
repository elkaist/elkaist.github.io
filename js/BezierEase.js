var _gsScope =
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  _gsScope._gsDefine(
    "easing.Bezier",
    ["easing.Ease"],
    function (n) {
      var e = (function () {
          function n(n, e) {
            return 1 - 3 * e + 3 * n;
          }
          function e(n, e) {
            return 3 * e - 6 * n;
          }
          function r(n) {
            return 3 * n;
          }
          function o(o, t, u) {
            return ((n(t, u) * o + e(t, u)) * o + r(t)) * o;
          }
          function t(o, t, u) {
            return 3 * n(t, u) * o * o + 2 * e(t, u) * o + r(t);
          }
          function u(n, e, r, t, u) {
            var i,
              c,
              s = 0;
            do
              (c = e + (r - e) / 2),
                (i = o(c, t, u) - n),
                i > 0 ? (r = c) : (e = c);
            while (Math.abs(i) > f && ++s < a);
            return c;
          }
          function i(n, e, r, u) {
            for (var i = 0; i < c; ++i) {
              var s = t(e, r, u);
              if (0 === s) return e;
              var f = o(e, r, u) - n;
              e -= f / s;
            }
            return e;
          }
          var c = 4,
            s = 0.001,
            f = 1e-7,
            a = 10,
            g = 11,
            p = 1 / (g - 1),
            _ = "function" == typeof Float32Array;
          return function (n, e, r, c) {
            function f(e) {
              for (var o = 0, c = 1, f = g - 1; c !== f && a[c] <= e; ++c)
                o += p;
              --c;
              var _ = (e - a[c]) / (a[c + 1] - a[c]),
                l = o + _ * p,
                v = t(l, n, r);
              return v >= s
                ? i(e, l, n, r)
                : 0 === v
                ? l
                : u(e, o, o + p, n, r);
            }
            var a = _ ? new Float32Array(g) : new Array(g);
            if (n !== e || r !== c)
              for (var l = 0; l < g; ++l) a[l] = o(l * p, n, r);
            return function (t) {
              return n === e && r === c
                ? t
                : 0 === t
                ? 0
                : 1 === t
                ? 1
                : o(f(t), e, c);
            };
          };
        })(),
        r = _gsScope.GreenSockGlobals || _gsScope,
        o = r.com.greensock,
        t = o._class,
        u = t(
          "easing.Bezier",
          function (n, r, o, t) {
            this.easingFunc = e(n, r, o, t);
          },
          !0
        ),
        i = (u.prototype = new n());
      return (
        (i.constructor = u),
        (i.getRatio = function (n) {
          return this.easingFunc(n);
        }),
        (i.config = u.config =
          function (n, e, r, o) {
            return new u(n, e, r, o);
          }),
        u
      );
    },
    !0
  );
}),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()();
