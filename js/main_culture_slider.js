/**
 * Main : Voice of Our Culture
 */
define(['global', 'jquery', 'gsap', 'bezier', 'slick'], function(IG, $, gsap) {
    'use strict';

    var prev = '<button type="button" class="slick-arrow slick-prev btn-r btn-r-light btn-r-left"><span class="blind">Prev</span></button>',
        next = '<button type="button" class="slick-arrow slick-next btn-r btn-r-light btn-r-right"><span class="blind">Next</span></button>'

     var total = $('.slider-three .slide').length // get the number of slides
    // console.log(total)
    // var rand = Math.floor( Math.random() * total );
    //     console.log(rand)
        $('.slider-three').slick(
            {
                infinite : true,
                slidesToShow : 1,
                slidesToScroll : 1,
                arrows : false,
                dots : true,
                fade : true,
                autoplay : false
            }
        ).slick('slickGoTo', Math.floor((Math.random() * total) + 1));


    $('.slider-four').slick({
        easing: 'easeInOutQuart',
        centerMode: true,
        centerPadding: '18%',
        slidesToShow: 3,
        speed: 700,
        arrows : true,
        dots:true,
        index: 1,
    //    focusOnSelect:true,
        prevArrow: prev,
        nextArrow: next,
        // asNavFor: '.slider-nav',
        responsive: [{
          breakpoint: 1024,
          settings: {
            centerMode: false,
            slidesToShow: 3
          }
        },{
          breakpoint: 768,
          settings: {
            centerMode: true,
            centerPadding: '25%',
            slidesToShow: 1
          }
        }, {
          breakpoint: 480,
          settings: {
            arrows: true,
            dots:true,
            centerMode: false,
            slidesToShow: 1
          }
        }
      ]
    });

   //  $('.slider-nav').slick({
   //      slidesToShow: 1,
   //      slidesToScroll: 1,
   //      asNavFor: '.slider-four',
   //      fade: true,
   //      arrows: false,
   //      dots:false
   // });

});
