/**
 * initTabMenu jQuery ver. ( target focusing )
 * @author: alice@iropke.com
 * @lastUpdate: 2015.12.14
 */
(function($) {
	$.fn.simpleTab = function(option) {

		var option = $.extend({
			activeClass: 'is-active',
			tabSelector: '.tab',
			tabTitle: '.tab-title',
			tabCont: '.tab-content',
			changeByClass: false,
			rwd: false,
			scroll: false,
			scrollOffset: -100,
			easing: 'swing',
			onChange: function() {}
		}, option);

		var $win = $(window);

		return this.each(function() {
			var $container = $(this),
					$tab = $container.find(option.tabSelector),
					$tabContents = $([]),
					len = $tab.length,
					active = option.activeClass,
					isChangeByClass = option.changeByClass,
					current = $tab.filter('.' + active).index() >= 0 ? $tab.filter('.' + active).index() : 0;


			$tab.each(function(i, el){
				var $a = $(el),
						$target = $($a.attr('href')),
						$title = $target.find(option.tabTitle);

				if ($a.parent().hasClass(active)) {
					current = i;
				}

				$tabContents = $tabContents.add($target);

				if ( !isChangeByClass ) {
					$target.css({
							display: 'none',
							outline: '0 none'
						}).attr({
							tabindex: '0'
						});
				}

				$a.on('click', function(event){
					openContent($a, $target);
					event.preventDefault();
				});

				if ( option.rwd ) {
					$target.find(option.tabTitle).on('click', function(event){
						openContent($a, $target);
					});
				}
			});

			function openContent($a, $target) {
				var top = $(window).scrollTop();

				if ( !isChangeByClass ) {
					$tabContents.hide();
				}
				$tab.removeClass(active);
				$tab.parent().removeClass(active);
				$tabContents.removeClass(active);

				$a.addClass(active);
				$a.parent().addClass(active);
				$target.addClass(active);

				if ( !isChangeByClass ) {
					$target.show();
					$target.focus();
				}

				if ( option.scroll ) {
					top = $tab.offset().top - $tab.height() + option.scrollOffset;
					$('html, body').stop().animate({ scrollTop: top }, 700, option.easing);
				} else {
					$win.scrollTop(top);
				}

				option.onChange($target);
			}

			if ( !isChangeByClass ) {
				$tabContents.hide();
				$($tab.eq(current).attr('href')).show();
			}

			$tab.eq(current).addClass(active);
			$tab.eq(current).parent().addClass(active);
			$($tab.eq(current).attr('href')).addClass(active);
			option.onChange($($tab.eq(current).attr('href')));
		});
	}
})(jQuery);
