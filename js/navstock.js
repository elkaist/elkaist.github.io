
/**
 * navstock
 * iris@iropke.com
 * last update: 2016-08-31
 */
define(['jquery', 'numberWithCommas', 'stringFormat', 'api'] , function($, Comma, StringFormat, API){
    var $stockEl = $('.x-gnb-stock-info');
    gnbCallback = function (r){
        var map = {'090430':'아모레퍼시픽', '002790':'아모레퍼시픽홀딩스'},
            html, item, code, companyName,
            i = 0, x = '', y = '';
        if ( r !== undefined ){
            html ='<li>' +
                    '<div class="stock-cell">' +
                        '<h4 class="h4">{0}</h4>' +
                        '<span class="date">{1}</span>' +
                    '</div>' + 
                    '<div class="stock-cell">' + 
                        '<i class="price">{2}</i>' +
                        '<span class="state {3}"><b>{4}</b> <i>({5}%)</i></span>'+
                    '</div>' +
                '</li>';
            for ( ; i < r.length ; i++ ){
                item = r[i];
                code = item.code;
                if ( typeof map[code] !== 'undefined' ) {
                    companyName = map[code];
                    x = StringFormat.format(html, [ companyName, item['trade_at'], Comma.format(item['price']), item['change_type'], Comma.format(item['change']), item['change_percent'] ]);
                    void 0;
                    y = y + x;
                }
            }
            $stockEl.html(y);
        }
    }
    $(function(){ 
        var url = $stockEl.data('api-url');
		if (url) {
			var type = $stockEl.data('result-type');
			$stockEl.next('.stock-unit').hide();
			var params = {};
			var config = {
				version : 1,
				apiName : url.split('@@@')[0],
				method : url.split('@@@')[1],
				params: params
			};
			API.call(config,function(jsonData){
				if (jsonData){
					if (jsonData.resultCode == "0000") {
						gnbCallback(jsonData.data.list);
						$stockEl.find('.loading').hide().remove();
						$stockEl.next('.stock-unit').show();
					} else {
					}
				}
			});
		}
    });
});