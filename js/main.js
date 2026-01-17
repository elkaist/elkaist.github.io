/**
 * Main
 */
require(['ui', 'jquery', 'gsap', 'inview'], function(IG, $, gsap) {
    'use strict';

    $(function() {
        // intro slider
        require(['mainIntro']);
        // require(['pages/mainBrands']);
        require(['main_culture_slider']);

        // news
        $('.home-news .thumb').each(function(i, el){
            var is_inview = false;

            $(el).css('opacity', 0).one('inview', {offset: 0.95}, action);

            function action() {
                var delay;

                if ( is_inview ) return;

                delay = 0.1 * i;

                TweenMax.fromTo( el, 0.5, {
                    y: '-50'
                },{
                    y: '0',
                    ease: Power2.easeOut,
                    delay: delay
                });

                TweenMax.fromTo( el, 0.7, {
                    opacity: 0
                },{
                    opacity: 1,
                    ease: Power1.easeOut,
                    delay: delay
                });

                is_inview = true;
            }
        });

        // infographic
        $('.home-glance .item').each(function(i, el){
            var is_inview = false;

            $(el).css('opacity', 0).one('inview', {offset: 0.8}, action);

            function action() {
                var delay;

                if ( is_inview ) return;

                delay = 0.1 * i;

                TweenMax.fromTo( el, 0.7, {
                    opacity: 0
                },{
                    opacity: 1,
                    ease: Power1.easeOut,
                    delay: delay
                });

                is_inview = true;
            }
        });

        // 사이즈에 따라 slider arrow 색상 변경
        IG.UI.switchLayout('mainArrow', function() {
            return IG.size < IG.BP_MEDIUM;
        }, function(isSmall) {
            var $pagerArrow = $('.slick-arrow');

            if (isSmall) {
                $pagerArrow.removeClass('btn-r-light');
            } else {
                $pagerArrow.addClass('btn-r-light');
            }
        });

        /**
         * notice
         */
        (function() {
            var $notice = $('.home-notice'),
                $noticeCont = $notice.find('.home-notice-cont'),
                $noticeMoreBtn = $notice.find('.home-notice-more'),
                $noticeCloseBtn = $notice.find('.home-notice-close'),
                $closeBtn = $notice.find('.btn-close'),

                contHeight;

            // 쿠키값 설정되어 있을 때 공지사항 요소 삭제 후 끝내기
            if(IG.UI.getCookie('fixed-notice')) {
                $notice.remove();

                return;
            } else {
                $notice.css('visibility', 'visible');
            }

            // 펼쳐보기
            $noticeMoreBtn.on('click', function(event) {
                TweenMax.to($notice, 0.8, {
                    className: '+=is-opened'
                });
                IG.$body.css('position', 'fixed');
            });

            function close() {
                TweenMax.to($notice, 0.8, {
                    className: '-=is-opened'
                });
                IG.$body.css('position', '');
            }

            // 펼쳐보기 닫기
            $noticeCloseBtn.on('click', function(event) {
                close();
            });

            // 닫기버튼
            $closeBtn.on('click', function(event) {
                close();

                TweenMax.to($notice, 1, {
                    yPercent: 120,
                    className: '+=is-closed',
                    ease: Power1.easeOut
                });

                // 오늘하루 열지않기 쿠키 설정
                IG.UI.setCookie('fixed-notice', true, 1);
            });

            IG.$win.on('resize.notice', setSize);
            setSize();

            // 컨텐츠 높이값 지정
            function setSize() {
                contHeight = IG.$win.height() - 220;

                if (IG.width> 768) {
                    $noticeCont.css('height', '');
                } else {
                    $noticeCont.css('height', contHeight);
                }
            }
        })();
        (function() {
            var mainVideoNum = Math.floor((Math.random()*5));
            for (var i = 0; i <= 4; i++) {
                if (i !== mainVideoNum) {
                    $('.slide-random'+i).remove();
                }
            }
            var mainVideoNumRed = Math.floor((Math.random()*3));
            for (var i = 0; i < 3; i++) {
                if (i !== mainVideoNumRed) {
                    $('.slide-random-red'+i).remove();
                }
            }
        })();
    
    });
});
