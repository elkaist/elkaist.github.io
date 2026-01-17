/**
 * select ui for mobile
 * dependencies: $.fn.simpleTab (jquery.simpletab.js)
 */
define(['global', 'jquery'], function(IG, $) {

    function SwitchSelect($el) {
        this.$select = $el;
        this.init();
    }
    SwitchSelect.prototype = {
        close: function($el, txt) {
            this.$select.removeClass('on');
            IG.$main.removeClass('is-dimmed');

            if( $el.is('[data-parent-zindex]') ) {
                $el.parent().css('z-index', '');
            }

            if ( !$el ) return;
            if (!!$el.data('is-tab')) {
                this.curTxt($el, txt);
            }
        },
        init: function() {
            var _el = this;

            _el.$select.each(function(i, el){
                var $el = $(el),
                    $trigger = $el.find('.select-trigger');

                _el.curTxt($el);

                $el.data('is-tab', $el.find('[href^=#]').length);

                $trigger.on('click', function(event){
                    $el.toggleClass('on');
                    _el.$select.not($el).removeClass('on');
                    $('.guide-contents').length && IG.$main.toggleClass('is-dimmed');

                    if( $el.is('[data-parent-zindex]') ) {
                        $el.parent().css('z-index', $el.css('z-index'));
                    }

                    event.stopPropagation();
                });

                $el.on('click', 'a', function(){
                    _el.close($el, $(this).text());
                });
            });

            _el.$select.length && IG.$win.on('resize.switchSelect', function() {
                _el.close($(_el));
            });
            _el.$select.length && IG.$body.on('click.switchSelect', function() {
                _el.close($(_el));
            });
        },
        curTxt: function($el, txt) {
            var txt = (txt) ? txt : (!!$el.find('.is-current').length) ? $el.find('.is-current').text() : $el.find('.select-selector').find('a').eq(0).text();
            $el.find('.select-trigger').find('span').text(txt);
        }
    };

    return SwitchSelect;
});