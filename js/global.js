
/**
 * 전역 객체 설정 모듈
 */
define(['jquery', 'underscore', 'ua-parser-js', 'functions'], function($, _, UAParser, UI) {
    'use strict';

    //window.console = {};
    //window.console.log = $.noop;

    /**
     * set global object @iropke
     */
    void 0;

    var IG = {};

    IG.DEV = IG.DEV || false;

    // 전역 변수 초기화
	// 20190915 By Soheej ICS 기준 전역 변수 추가. 
    IG.apgCountry = 'int';
    IG.apgLanguage = 'ko';
    IG.width = 0;
    IG.height = 0;
    IG.headerHeight = 0;
    IG.scrollTop = 0;
    IG.scrolling = false;
    IG.didScroll = false;
    IG.scrollTimeout;  // global for any pending scrollTimeout
    IG.scrllInterval = null;

    // UI 관련 함수 설정
    IG.UI = UI;

    // breakpoint 이름 설정
    IG.bpNames = [
        'default',  // 0
        'x-small',  // 1
        'small',    // 2
        'medium',   // 3
        'large',    // 4
        'x-large',  // 5
        'xx-large'  // 6
    ];

    // breakpoint 상태
    IG.bpState = {};

    // 현재 breakpoint
    IG._oldSize = -1;
    IG.size = 0;

    // breakpoint 상수 설정
    _.each(IG.bpNames, function (val, i) {
        var name = 'BP_' + val.toUpperCase().replace('-', '_');

        IG[name] = i;
    });

    // breakpoint switcher 설정
    _.each(IG.bpNames, function (val) {
        this[val] = false;
    }, IG.bpState);

    // User Agent string 파싱
    IG.ua = new UAParser().getResult();
    void 0;

    window.ua = IG.ua;

    // IE 구버전(버전 9 미만) 확인
    IG.isLegacyIE = IG.ua.browser.name === 'IE' && (IG.ua.browser.major|0) < 9;
    IG.isLegacyIE && void 0;

    // IE 최신버전(IE 11 이상 및 Edge) 확인
    IG.isIEEdge = (IG.ua.browser.name === 'IE' || IG.ua.browser.name === 'Edge') && (IG.ua.browser.major | 0) >= 11;

    // 모바일 기기 확인
    IG.isMobile = (function() {
        // IE 구버전일 때
        if(IG.isLegacyIE) {
            return false;
        }

        // 터치 이벤트 미지원 시
        if(!Modernizr.touchevents) {
            return false;
        }

        // 모바일 또는 테블릿일 경우
        if(['mobile', 'tablet'].indexOf(IG.ua.device.type) >= 0) {
            return true;
        }

        // 주요 데스크탑 OS일 경우
        if(['Windows', 'Mac OS'].indexOf(IG.ua.os.name) >= 0) {
            return false;
        }

        // 장치 타입을 알 수 없을 경우
        if(!IG.ua.device.type) {
            return false;
        }

        // 아무런 해당사항이 없을 경우
        return false;
    })();
    IG.isMobile && void 0;

    // 네이버 앱 판단
    IG.isNaver = (function() {
        if(!IG.isMobile) {
            return false;
        }

        return /NAVER\(inapp; search; \d+; [\d\.]+\)/.test(IG.ua.ua);
    })();

    // 특정 디바이스 판단
    IG.model = (function() {
        var model = IG.ua.ua.match(/SAMSUNG ([A-Z]{3}-[A-Z]\d+)/);

        if(!model) {
            return false;
        }

        return IG.ua.engine.name === 'WebKit' ? model[1].toLowerCase() : false;
    })();
    IG.model && void 0;

    // requestAnimationFrame polyfill
    window.requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(callback) { window.setTimeout(callback, 1000 / 60) };
	
    IG.$win = $(window);

    /**
     * dom ready 후 
	 * 주요 요소 Layout Display
	 * 주요 요소 및 window 관련 이벤트 설정
     */
    $(function () {
		
        // 주요 요소 캐싱
        IG.$doc = $(document);
        IG.$html = $('html');
        IG.$body = $('body');
        IG.$wrap = $('#wrap');
        IG.$header = $('#header');
        IG.$gnb = $('#gnb');
        IG.$sidenav = $('#sidenav');
        IG.$main = $('#main');
        IG.$footer = $('#footer');
        IG.$bp = $('<div id="bp"></div>').prependTo(IG.$body);
		

        // breakpoint event
        function getBreakpoint() {
            var _size = parseInt(IG.$bp.css('zIndex')) - 1;

            if ( IG.isLegacyIE ) {
                _size = 4;
            }

            if (_size !== IG.size) {
                void 0;

                IG.headerHeight = Math.max(60, parseInt(IG.$body.css('border-top-width')));

                IG.size = _size;
                IG.$win.trigger('bp', IG.size);
            }

            // 창 크기를 전역 변수에 저장
            IG.width = !isNaN(IG.$win[0].innerWidth) ? IG.$win[0].innerWidth : IG.$win.width();
            IG.height = !isNaN(IG.$win[0].innerHeight) ? IG.$win[0].innerHeight : IG.$win.height();
        }

        // 디바이스/브라우저 환경 여부 클래스 삽입
        IG.$html.addClass(IG.ua.browser.name);
        IG.$html.addClass((!IG.isMobile ? 'no-' : '') + 'mobile');
        IG.$html.addClass((!IG.isLegacyIE ? 'no-' : '') + 'legacy-ie');
        IG.$html.addClass((!IG.isIEEdge ? 'no-' : '') + 'ie-edge');
        IG.$html.addClass((!IG.isNaver ? 'no-' : '') + 'naver');
        IG.model && IG.$html.addClass('model-' + IG.model);

        IG.$win.on('resize.breakpoint', getBreakpoint);
        getBreakpoint();

        // breakpoint trigger
        IG.$win.bp = function () {
            IG.$win.trigger('bp', IG.size);

            return this;
        };

        // 스크롤 위치를 전역 변수에 저장
        IG.$win.on('scroll.global', function () {
            IG.scrollTop = IG.$win.scrollTop();
            IG.didScroll = true;

            if ( !IG.scrolling ) {
                IG.$win.trigger('scrll');
                IG.scrolling = true;
                IG.scrllInterval = setInterval(scrllHandler, 100);
            }
        });

        function scrllHandler() {
            if (IG.didScroll) {
                IG.didScroll = false;
                IG.$win.trigger('scrll');
            } else {
                clearInterval(IG.scrllInterval);
                IG.scrolling = false;
            }
        }

        IG.scrollTop = IG.$win.scrollTop();
		
		//앱스캔 취약점 보완 조치
		$("a[target=_blank]").attr("rel", "noopener noreferrer");
    });

    return IG;
});