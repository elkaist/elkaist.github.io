/**
 * 전체 페이지 공통 실행 모듈
 */
 define(function(require) {
    'use strict';

    void 0;
	
    // load modules
    var IG              = require('global'),

        login           = require('login'),
	
		DPLayout = require('layoutDisplay'), 			// 20190915 By Soheej ICS 기준 LayoutDisaply 추가.  
        selectbox       = require('selectbox'),
        SwitchSelect    = require('switchselect'),
        spritely        = require('spritely'),
        simpletab       = require('simpletab'),
        togglelayer     = require('togglelayer'),
        viewport        = require('viewport'),
        inview          = require('inview'),
        ytiframe        = require('ytiframe');


    /**
     * 본문 바로가기 링크 작동
     */
    function skipNav() {
        IG.$main.on('focusout', function() {
            IG.$main.removeAttr('tabindex');
        });
        $('#skipnav, #go-to-top').on('click', function() {
            IG.$main
            .attr('tabindex', '-1')
            .focus();
        });
    }

    /**
     * 내용 처음으로 가기
     */
    function goToTop() {
        var $topBtn = $('#go-to-top');

        $topBtn.on('click', function(event) {
            $('html, body').stop().animate({ scrollTop: 0 }, 500, 'easeOutQuad');
            event.preventDefault();
            event.stopPropagation();
        });
    }


    /**
     * setup library defaults
     */
    function setupLibrary() {
        $.extend($.datepicker,{_checkOffset:function(inst,offset,isFixed){return offset}});

        IG.datepicker_defaults = {
          monthNames: ['01','02','03','04','05','06','07','08','09','10','11', '12'],
            hideIfNoPrevNext: true,
            showMonthAfterYear: true,
            dateFormat: 'yy.mm.dd',
            nextText: '다음 달',
            prevText: '이전 달'
        };
    }
	

    /**
     * input focus effect
     */
    function actionInput() {
        var $item = $('.input-wrap'),
            $itemInput = $item.find('.input-field');

        // 입력값이 있을 때
        $itemInput.each(function(i, el){
            if ($(el)[0].type == 'select-one') return;

            if ($(el).val() != '') {
                $(el).parent('.input-wrap').addClass('is-focus').addClass('is-fixed');
            }
        });

        $itemInput.on('focusin', function(){
            $(this).parent('.input-wrap').addClass('is-focus').addClass('is-fixed');
        }).on('focusout', function(){
            var $wrap = $(this).parent('.input-wrap');
            $wrap.removeClass('is-focus');
            if ($(this).val() == '') {
                $wrap.removeClass('is-fixed');
            }
        });
    }

    /**
     * table shadow effect
     */
    function actionTable() {
        var $tableInner = $('.table-shadow-inner'),
            $table = $tableInner.find('.table-shadow-tbl'),
            $ainIcon,
            wrapWidth, tbllWidth, endPos, currentPos;

        function getSize() {
            wrapWidth = $tableInner.width();
            tbllWidth = $table.width();
            endPos =  tbllWidth - wrapWidth;
        }

        getSize();

        IG.$win.on('resize', function() {
            getSize();
        });

        $tableInner.each(function(i, el){
            $(el).parent().addClass('table-shadow-left');

            $(el).scroll(function(event){
                currentPos = $(el).scrollLeft();
                $ainIcon = $(el).next().find('.ain-swipe');

                if ( $ainIcon.hasClass('is-hidden') == false ) {
                    TweenMax.fromTo( $ainIcon, .3, {
                        autoAlpha: 1
                    }, {
                        autoAlpha: 0,
                        className: '+=is-hidden'
                    });
                }

                if (currentPos == 0 ) { // 처음에 위치 할때
                    $(el).parent().removeClass('table-shadow-right');
                } else if (currentPos == endPos ) { // 마지막에 위치할 때
                    $(el).parent().removeClass('table-shadow-left');
                } else {
                    $(el).parent().addClass('table-shadow-left');
                    $(el).parent().addClass('table-shadow-right');
                }
            });
        });

        // Spritely Animation
        $(".ain-swipe").sprite({
            fps : 13, no_of_frames : 13, speed : 0.2
        });
    }

    /**
     * video
     */
    function actionVideo() {
        var $video = $('.videobox'),
            $close = $video.find('.videobox-close'),
            $player = $video.find('.videobox-player');

        // Youtube player 작동
        if(IG.isMobile) {
            $('.yt-player').ytiframe();
        } else {
            $('.yt-player').on('click', function(event) {
                $(this).ytiframe({
                    autoplay: true
                });

                event.preventDefault();
            });
        }
    }

    /**
     * Signature effect
     */
    function actionSignature() {
        var $shape = $('#ceo-signature');

        if ($shape.length == 0) return;

        var length = $shape.get(0).getTotalLength(),
            tl = new TimelineMax();
            
        $shape.css('stroke-dasharray', length);        

        $shape.one('inview', {offset: 0.95}, function(){
            TweenMax.fromTo($shape, 2, {
                strokeDashoffset: length
            }, {
                strokeDashoffset: length * 2
            }, 0.5);
        });
    }

    /**
     * 전체 페이지 공통 실행
     */
    $(function() {
        // 디버그용 모듈 로드
        void 0;
		
	// 20190915 By Soheej Layout 생성
	DPLayout.displayLayout();
				
        skipNav();
        goToTop();

        // effect
        actionInput();
        actionVideo();
        actionSignature();

        setTimeout(function() {
            actionTable();
        }, 100);

        // 사이즈에 따라 cover 적용
        var $cover = $('.content-header-cover');

        IG.UI.switchLayout('coverStillBg', function() {
            return IG.size < IG.BP_MEDIUM;
        }, function(isSmall) {
            $cover.css(
                'background-image',
                'url(' + $cover.data(isSmall ? 'small' : 'large') + ')'
            );
        });

        // investor > IR Schedule - is-current 설정
        var n = (new Date()).getTime();

        $('.schedule-list > .item').each( function() {
            var s = parseInt($(this).data('start-date')),
                e = $(this).data('end-date');

            if ( s > n || ( e != undefined && parseInt(e) > n ) ) {
                $(this).addClass('is-current');
            }
        });

        // search
        $('.search-go').on('click', function() {
            var queryGNB = $("#header-search").val();
            if(queryGNB.trim() == "") {
                alert("검색어를 입력해주세요.");
                return false;
            };
        });

        // 커스텀 select box 작동
        selectbox();
        new SwitchSelect($('.switch-select'));

        // 2022-09-22 수정 GNB BRANDS 영역 시작
        $('.l-draw.Brand .d2_ls01 .tit').on('mouseenter focus', function(){
            $(this).parents('.d2_ls01 li').addClass('active_on').siblings().removeClass('active_on');
        });
        
        $('.l-draw.Brand').on('mouseleave', function(){
            $(this).find('.d2_ls01 li:first-child').addClass('active_on').siblings().removeClass('active_on');
        });
        // 2022-09-22 수정 GNB BRANDS 영역 끝
        // 2022-10-07 수정 GNB NEWS 영역 끝

        // 2024-06-13 수정 GNB CAREERS 영역 시작
        $('.l-draw.CAREERS .d2_ls .tit').on('mouseenter', function(){
            $(this).parents('.d2_ls li').addClass('active_on').siblings().removeClass('active_on');
        });

        $('.l-draw.CAREERS .d2_ls .tit').on('focus', function(){
            $(this).parents('.d2_ls li').addClass('active_on').siblings().removeClass('active_on');
        });
        $('.l-draw.CAREERS').on('mouseleave', function(){
            $(this).find('.d2_ls li').removeClass('active_on');
        });
        // 2024-06-13 수정 GNB CAREERS 영역 끝

        $('#gnb-menu li a').on('mouseenter', function(){
            var strHref = $(this).attr('href');
            var hrefName = 'news';
            if( strHref.indexOf(hrefName) !== -1 ){
                $('body').addClass('opacity_off');
            }
        });
        $('#gnb-menu li a').on('mouseleave', function() {
            $('body').removeClass('opacity_off');
        });
        // 2022-10-07 수정 GNB NEWS 영역 끝


    });

    // 전역 객체 리턴
    return IG;
});