define(['global', 'jquery', 'underscore', 'gsap', 'menuaim'], function(IG, $, _) {

	var $body = $('body'),
		$gnb = $('#gnb'),
		$sn = $('#sidenav'),
		$navToggle = $('#toggle-menu'),

		tweenTime = 0.4,
		tl_header = new TimelineMax(),
		is_compact = false,
		activation = $body.data('nav'),
		
		GNB = {},
		ND = {},
		d1, d2, d3;

	// set current 
	if ( activation == undefined ) {
		GNB.$cur_d1 = $gnb.find('.d1.is-current');
		GNB.$cur_d2 = $gnb.find('.d2.is-current');
		GNB.$cur_d3 = $gnb.find('.d3.is-current');

		d1 = GNB.$cur_d1.index() + 1;
		d2 = GNB.$cur_d2.index() + 1;
		d3 = GNB.$cur_d3.index() + 1;

	} else {
		activation = String(activation).split(',');
		d1 = parseInt(activation[0]) || 0;
		d2 = parseInt(activation[1]) || 0;
		d3 = parseInt(activation[2]) || 0;

		if ( d1 > 0 ) {
			GNB.$cur_d1 = $gnb.find('.d1').eq(d1-1).addClass('is-current');
			
			if ( d2 > 0 ) {
				GNB.$cur_d2 = GNB.$cur_d1.find('.d2').eq(d2-1).addClass('is-current');
			
				if ( d3 > 0 ) {
					GNB.$cur_d3 = GNB.$cur_d2.find('.d3').eq(d3-1).addClass('is-current');
				}
			}

		} else {
			GNB.$cur_d1 = null;
			GNB.$cur_d2 = null;
			GNB.$cur_d3 = null;
		}
	}

	// header transform
	// --------------------------------------------------
	function expand() {
		tl_header.reverse();
		is_compact = false;
	}
	function compact() {
		tl_header.play();
		is_compact = true;
	}


	// GNB (menu for large device)
	// --------------------------------------------------
	$.extend(GNB, {
		t: 0.4,
		timer: {},
		$menu: $('#gnb-menu'),
		$d1: $gnb.find('.d1'),
		$sub: $gnb.find('.d2-list'),
		$draw: $gnb.find('.gnb-draw'),
		$d3_box: $gnb.find('.d3-box'),

		curRow: null,
		curSub: null,
		activeRow: null,
		isopen: false,
		setup: function() {
			TweenMax.set(GNB.$draw, { display: 'block', autoAlpha: 0 });
			TweenMax.set(GNB.$d3_box, { autoAlpha: 0 });

			if ( d1 > 0 ) {
				GNB.curRow = GNB.$cur_d1[0];
				GNB.$cur_d1.addClass('is-active');

				if ( d2 > 0 ) {
					GNB.$cur_d2 = GNB.$cur_d1.find('.d2').eq(d2-1).addClass('is-current');

					if ( d3 > 0 ) {
						GNB.$cur_d3 = GNB.$cur_d1.find('.d2').eq(d2-1).addClass('is-current');
					}
				}
			}

			GNB.$d3_box.each(function(i, el){
				var $box = $(el),
					$link = $box.parent().find('.d2-a');

				$box.prepend($link.clone().removeClass('d2-a').addClass('d3-h-a'));
			});

			GNB.$sub.find('.d3-a:last').keydown(function(event){
				if ( event.keyCode == 9 && !event.shiftKey ) {
					TweenMax.set($(this).parents('.d3-box'), { autoAlpha: 0 });
					TweenMax.set($(this).parents('.gnb-draw').find('.draw-feature'), { autoAlpha: 1 });
				}
			});
		},
		open: function() {
			// $body.addClass('is-open-nav');
			GNB.isopen = true;
		},
		close: function() {
			$body.removeClass('is-open-nav');
			GNB.isopen = false;
		},
		activate: function(row) {
			if ( !GNB.isopen ) {
				GNB.open();
				GNB.timer = setTimeout(active, (GNB.t /2)*1000);
			} else {
				clearTimeout(GNB.timer);
				active();
			}
			
			function active() {
				GNB.$d1.not($(row)).removeClass('is-active');
				TweenMax.to(GNB.$d1.find('.gnb-draw'), tweenTime/2, {
					autoAlpha: 0
				});

				$(row).addClass('is-active');
				TweenMax.to( $(row).find('.gnb-draw'), tweenTime/2, {
					autoAlpha: 1
				});
			}

			GNB.activeRow = row;
		},
		deactivate: function(row) {
			clearTimeout(GNB.timer);
			GNB.$d1.removeClass('is-active');
			GNB.$cur_d1.addClass('is-active');

			TweenMax.to( $(row).find('.gnb-draw'), tweenTime/2, {
				autoAlpha: 0
			});
		},
		init: function() {
			GNB.setup();
			GNB.$menu.menuAim({
				activate: function(row) {
					GNB.activate(row);
				},
				deactivate: function(row) {
					GNB.deactivate(row);
				},
				exitMenu: resetGNB,
				submenuDirection: 'below'
			});
			GNB.$sub.menuAim({
				activate: subActivate,
				deactivate: subDeactivate,
				exitMenu: resetSub,
				submenuDirection: 'right'
			});

			$('.renew_gnb').first().css('visibility', 'visible');
		}
	});


	// menuAim - d1
	function resetGNB() {
		var deactivateSubmenu = true;

		GNB.close();
		GNB.$cur_d1.addClass('is-active');

		if ( GNB.isopen && (GNB.curRow == null || d1 > 1) ) {
			clearTimeout(GNB.timer);
			GNB.isopen = false;
		}

		return deactivateSubmenu;   // for reset activateSubmenu
	}


	// menuAim - d2
	function subActivate(row) {
		var $row = $(row),
			$subMenu = $row.find('.d3-box'),
			$siblings = $row.siblings('.d2'),
			$feature = $row.parent().siblings('.draw-feature');

		$row.removeClass('is-dimmed').addClass('is-active');
		$siblings.addClass('is-dimmed');

		if ( $subMenu.length ) {
			TweenMax.set($feature, { autoAlpha: 0 });
			TweenMax.to($subMenu, tweenTime/2, { autoAlpha: 1 });
		}
	}

	function subDeactivate(row) {
		var $row = $(row),
			$subMenu = $row.children('.d3-box'),
			$siblings = $row.siblings('.d2'),
			$feature = $row.parent().siblings('.draw-feature');

		$row.removeClass('is-active');
		$siblings.removeClass('is-dimmed');

		if ( !!$subMenu ) {
			TweenMax.set($feature, { autoAlpha: 1 });
			TweenMax.to($subMenu, tweenTime/2, { autoAlpha: 0 });
		}
	}

	function resetSub() {
		var deactivateSubmenu = true;

		GNB.$sub.find('li').removeClass('is-active');
		TweenMax.set(GNB.$sub.siblings('.draw-feature'), {
			autoAlpha: 1
		});
		TweenMax.to(GNB.$sub.find('.d3-box'), tweenTime/2, {
			autoAlpha: 0
		});

		return deactivateSubmenu;   // for reset activateSubmenu
	}


	//  Navigation drawer (menu for small device)
	// --------------------------------------------------
	ND = {
		$el: $('#nav'),
		$d1: null, $anchor: null, $draw: null, $misc: null,
		$cur_d1: null, $cur_d2: null, $cur_d2: null, 
		is_open: false,
		timer: {},
		// tl: new TimelineMax({ pause: true }),
		setup: function() {
			var btn_close = '<button type="button" class="close-box"><span class="blind">go to previous menu</span></button>',
				btn_back = '<button type="button" class="btn-back" />';

			this.$misc = $sn.find('.sidenav-misc');

			this.$d1 = ND.$el.find('.d1');
			this.$draw = ND.$el.find('.nav-draw');
			this.$anchor_wrap = ND.$el.find('.nav-a').parent();

			this.$d1.each(function(i, el){
				var $d1 = $(el),
					$link = $d1.find('dt').eq(0).find('.nav-h');

				$d1.prepend($link.clone().removeClass('nav-h').addClass('nav-a'));
			});

			// setting back button
			this.$el.find('.d2-box')
				.prepend(btn_close)
				.prepend($(btn_back).text('HOME'));

			this.$el.find('.d3-box').each(function(){
				var $box = $(this),
					$head = $box.find('.nav-h'),
					text_back = $box.parents('.d2-box').find('dt').eq(0).text();

				$box.prepend(btn_close)
					.prepend($(btn_back).text(text_back))
					.parent().prepend($head.clone().removeClass('nav-h').addClass('nav-a'));
			});

			// setting no link add
			this.$el.find('.d3-box a').each(function(){
				var $box = $(this);

				if ( $box.attr('href') == '#') {
					$box.parent('dt').addClass('is-nolink');
				}
			});

			// add event 
			this.$el.on('click', '.nav-a', function(event) {
				if ( $(this).siblings().length ) {
					ND.activate(this);
					cancel(event);
				}
			});
			this.$el.on('click', '.btn-back, .close-box', function(event) {
				ND.back(this);
				cancel(event);
			});

			$sn.attr('tabindex', '-1');
		},
		close: function() {
			clearTimeout(ND.timer);

			if ( $body.hasClass('is-open-nav') || ND.is_open ) {
				$sn.removeClass('is-active');
				ND.timer = setTimeout(function(){
					$body.removeClass('is-open-nav');
					$navToggle.focus();
				}, tweenTime/2*1000);

				ND.$d1.removeClass('is-current');
				ND.$anchor_wrap.removeClass('is-current');
				ND.$draw.removeClass('is-active');
				ND.is_open = false;
			}
		},
		open: function() {
			clearTimeout(ND.timer);

			$body.addClass('is-open-nav');
			ND.timer = setTimeout(function(){
				$sn.addClass('is-active');
				$sn.focus();
				ND.openCurrent();
			}, 100);
			ND.is_open = true;
		},
		activate: function(el) {
			var $a = $(el),
				$draw =  $a.siblings('.nav-draw');

			if ( !!$draw ) {
				$a.parent().addClass('is-current');
				TweenMax.to($draw, tweenTime, { className: '+=is-active'});

				// fixed 속성을 가진 영역 스크롤 불가능. 활성화 된 부모요소 스크롤 기능을 막음 (huawei bug fix)
				$sn.find('.sidenav-pad').addClass('is-noscroll');
				$a.parents('.is-active').addClass('is-noscroll');

				$draw.append(ND.$misc);
			}

			$body.trigger('click.closeSelectbox');
		},
		back: function(el) {
			var $btn = $(el),
				$parent = $btn.parent('.nav-draw'),
				$parents = $parent.parent('.is-current');

			TweenMax.to($parent, tweenTime, { className: '-=is-active'});
			TweenMax.to($parents, tweenTime, { className: '-=is-current'});

			if ( $parent.parents('.nav-draw').length > 0 ) {
				$parent.parents('.nav-draw').append(ND.$misc);
				console.log($parent.parents('.nav-draw'));
			} else {
				ND.$misc.insertAfter(ND.$el);
			}

			// 부모요소릐 스크롤 기능을 막음 해제 (huawei bug fix)
			$btn.parents('.is-active').removeClass('is-noscroll');
			if ($btn.parent().is('.d2-box')) {
				$sn.find('.sidenav-pad').removeClass('is-noscroll');
			}
			
			$body.trigger('click.closeSelectbox');
		},
		setCurrent: function() {
			if ( d1 > 0 ) {
				ND.$cur_d1 = ND.$d1.eq(d1-1);

				if ( d2 > 0 ) {
					ND.$cur_d2 = ND.$cur_d1.find('.nav-dl').eq(0).find('> dd').eq(d2-1);

					if ( d3 > 0 ) {
						ND.$cur_d3 = ND.$cur_d2.find('dd').eq(d3-1);
					}
				}
			}
		},
		openCurrent: function() {
			var stagger = 100;

			if ( d1 > 0 ) {
				setTimeout(function(){
					ND.activate(ND.$cur_d1.find('> .nav-a')[0]);
				}, stagger);

				if ( d2 > 0 && ND.$cur_d1.has('.d3-box') ) {
					setTimeout(function(){
						ND.activate(ND.$cur_d2.find('> .nav-a')[0]);
					}, stagger*2);
				}
			}
		},
		init: function() {
			ND.setup();
			ND.setCurrent();

			$navToggle.on('click.open_sidenav', function(event){
				ND.open();
				cancel(event);
			});

			$sn.on('click.close_sidenav', '.close-sidenav', ND.close);
		}
	}

	function cancel(e) {
		e.stopPropagation();
		e.preventDefault();
	}

	function init() {
		tl_header.to(IG.$header, tweenTime/3, {
			className: '+=is-compact'
		}).pause();

		IG.$win.on('scroll', function(){
			if( IG.scrollTop >= 140 ) {
				compact();
			} else {
				expand();
			}
		});

		GNB.init();
		ND.init();

		IG.$wrap.on('click', function(event) {
			if ( ND.is_open ) {
				ND.close();
				cancel(event);
			}
		});

		$('[data-rel="toggle"]').toggleLayer({
			onOpen: function($link, $target) {
				$body.trigger('click');
			}
		});
	}

	$(init);

	return {
		resetGNB: resetGNB,
		expand: expand,
		compact: compact,
		is_compact: is_compact
	};
});