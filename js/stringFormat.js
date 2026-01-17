/**
 * String formatting with template
 */
define(['jquery'], function($) {

    function format(){
        var formatted = arguments[0];
        if ( !String.prototype.format  ){
            var replacements = arguments[1];
            for (var i = 0; i < replacements.length; i++) {
                var regexp = new RegExp('\\{'+i+'\\}', 'gi');
                formatted = formatted.replace(regexp, replacements[i]);
            }
            return formatted;
        }else {
            return formatted;
        }
    }

    return {
        format: format
    }
});