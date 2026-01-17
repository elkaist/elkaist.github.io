/**
 * number with commas
 */
define(['jquery'], function($) {

    function isNum(n) {
        return !isNaN(parseFloat(n));
    }

    function init(selector, point) {
        $(selector).each(function(i, el){
            var $el = $(el),
                text = $el.text(),
                is_num = isNum(text);

            is_num && $el.text(format(text, point));
        });
    }

    function format(data, decimalPoint) {
        var re = /\B(?=(\d{3})+(?!\d))/g,
            result = data,
            decimal;

        decimalPoint = decimalPoint ? ".0" : "";

        if ( isNum(data) ) {
            data = parseFloat(data.toString().replace(/\,/g, ""));
            decimal = ( data.toString().split('.').length > 1 ) ? data.toString().split(/\d+(?=\.)/g)[1] : false;

            result = ( !!decimal )
                ? data.toString().match(/.?\d+(?=\.)/g)[0].replace(re, ",") + decimal
                : data.toString().replace(re, ",") + decimalPoint;

            // return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        return result;
    }

    return {
        init: init,
        format: format
    }
});