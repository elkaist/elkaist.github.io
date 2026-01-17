
define(["global", "jquery", "underscore"], function(IG,$,_){
	"use strict";
	var _DEV_URL = "https://dev-bwapi.amorepacific.com";
	var _PRD_URL = "https://prd-bwapi.amorepacific.com";

	var _siteCd = "apgroupintko"
	var _searchURL = "https://aws-bw-search.amorepacific.com/sample/newJson/search.jsp";
		
    var _valid = function (args) {
        if(args.constructor !== Object) {
            throw "Wrong Config!!";
        }
        if(!args.apiName) {
            throw "apiName is empty!!";
        }
        if(!args.version || typeof args.version !== "number"){
            throw "apiVersion is Wrong!!"
        }
        if(!args.method) {
            throw "method is empty!!";
        }
    }

    var _ajaxFn = function (args,fn){
        var url = _getUrl()+"/api/v"+args.version+"/"+args.apiName+"/"+args.method;
        var _async = true;

        /** TODO : 매장찾기 운영 API사용 임시 적용 : 추후 삭제 */
        //if(args.params.brandNm && args.params.lng) {
        //    url = _PRD_URL+"/api/v"+args.version+"/"+args.apiName+"/"+args.method
        //}

        args.params.siteCd = _siteCd;
        if(!args.async) {
            _async = args.async;
        }

        $.ajax({
            url:url,
            data : JSON.stringify(args.params),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            async: _async,
            xhrFields: {
                withCredentials: true
            },
            success : function(result) {
                if(fn.constructor === Object && fn.success) {
                    fn.success(result);
                } else {
                    fn(result);
                }
            },
            error : function(request,status,error) {
                console.log("code:"+request.status+"\n"+"error:"+error);
                if(fn.constructor === Object && fn.error) {
                    fn.error();
                }
            },
            complete : function () {
                if(fn.constructor === Object && fn.complete) {
                    fn.complete();
                }
            }
        })

    }

    var _submitFn = function (args,fn){
        var url = _getUrl()+"/api/v"+args.version+"/"+args.apiName+"/"+args.method;
        var paramKey;
        var formData = new FormData();
		var strApiName = args.apiName;
		
		if (strApiName.indexOf('/') > -1){
			strApiName = strApiName.substr(strApiName.lastIndexOf( "/" ) + 1, strApiName.length);
		}
        switch(strApiName) {
            case "event" :
                paramKey = "event";
                break;
            case "apply-email" :
                paramKey = "apply";
                break;
            default :
                paramKey = "reply";
        }

        //args.params["cstmId"] = LOGIN.getUserId();
        args.params["siteCd"] = _siteCd;

        formData.append(paramKey, JSON.stringify(args.params));


        $.ajax({
            url:url,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            data : formData,
            type: "POST",
            success : function(result) {
                fn(result);
            }
        })

    }

    var _search = function (args, fn) {
        var url = _searchURL + "?site="+_siteCd+"&query="+encodeURIComponent(args.query)+"&collection="+args.collection+"&listCount="+args.listCnt+"&startCount="+args.startCnt;
        $.ajax({
            url:url,
            dataType:"json",
            success : function(result) {
                fn(result);
            },
            error:function(request,status,error){
                console.log("code:"+request.status+"\n"+"error:"+error);
            }
        })
    }

    var _fileUpload = function (args, fn) {
        var url = _getUrl()+"/api/v"+args.version+"/"+args.apiName+"/"+args.method;
        var formData = new FormData();
        formData.append("file",args.file);

        $.ajax({
            url:url,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            data : formData,
            type: "POST",
            success : function(result) {
                fn(result);
            },
            error:function(request,status,error){
                console.log("code:"+request.status+"\n"+"error:"+error);
            }
        })
    }

    // Util Start

    var _getUrl = function () {
        if(_isDev()) {
            return _DEV_URL;
        }
        return _PRD_URL;
    }

    var _isDev = function () {
        var urlArr = location.hostname;
        var devFlag = true;
        // dev- check
        if(urlArr.indexOf("dev-") == -1 && urlArr !== "10.129.28.175"){
            devFlag = false;
        }
        return devFlag;
    }

    // Util End
    return {
        call : function(arg,fn) {
            try {
                _valid(arg);
                _ajaxFn(arg,fn);
            } catch(err) {
                console.error(err);
            }
        },
        submit : function(arg,fn) {
            try {
                _valid(arg);
                _submitFn(arg,fn);
            } catch(err) {
                console.error(err);
            }
        },
        search : function(arg,fn) {
            try {
                // _valid(arg)
                _search(arg,fn);
            } catch(err) {
                console.error(err);
            }
        },
        fileUpload : function(arg,fn) {
            try {
                _fileUpload(arg,fn);
            } catch(err) {
                console.error(err);
            }
        }
    }
});