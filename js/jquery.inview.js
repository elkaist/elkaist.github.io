/**
 * inview event
 */
(function($) {

    var inview = function () {
        var $win = $(window),
            winHeight = $win.height(),
            scrollTop = $win.scrollTop(),
            docHeight = $(document).height(),
            elems = [];

        $.each($.cache, function () {
            if (this.events && this.events.inview) {
                var elem = this.handle.elem,
                    offset = 0;

                try {
                    offset = this.events.inview[0].data.offset;
                } catch(err) {}

                $(elem).data('offset', offset);
                elems.push(elem);
            }
        });

        if(!elems.length) return;

        $(elems).each(function(idx, el) {
            var $el = $(el),
                elTop = $el.offset().top,
                height = $el.height(),
                offset = winHeight * (1 - $el.data('offset')),
                inview = $el.data('inview') || false;

            if ((scrollTop + winHeight) < elTop || scrollTop > (elTop + height)) {
                if (inview) {
                    $el.data('inview', false);
                    $el.trigger('inview', [false]);
                }
            } else if (
                (scrollTop + winHeight - offset) >= (elTop) ||
                (   // 스크롤로 도달될 수 없는 요소를 끝까지 스크롤 되었을 때 활성화
                    elTop >= (docHeight - offset - 150) &&
                    scrollTop + winHeight >= (docHeight - 150)
                )
            ) {
                if (!inview) {
                    $el.data('inview', true);
                    $el.trigger('inview', [true]);
                }
            }
        });
    };

    $(window).on({
        scroll: inview,
        resize: inview,
        load: inview
    });

    setTimeout(inview, 300); // set first time call for mobile

})(jQuery);