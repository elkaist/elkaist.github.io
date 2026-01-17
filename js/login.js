
/**
 * login.js
 * soheej
 * last update: 2019-10-27
 */
define(["jquery", "underscore", 'iScript', 'api', 'sha512'], function($,_, ion, API){
    var sessionKey = ion.getCookie("sso_sessionKey") || ''
    var userId = ''
    var ip = ''
    var userName = ''
    var userInfo = {}
    var isLogin = false
    var serverTime = ''
    var currentTime = ''
    var _DEV_URL = 'dev-sso.amorepacific.com:8235'
    var _PRD_URL = 'sso.amorepacific.com'

	function _check(fn) {
		var originUrl = window.location.protocol+"//"+location.hostname;
        if (!sessionKey) {
			$.ajax({
				  url : window.location.protocol+"//"+_getUrl() + "/sso/sessioncheck.jsp"
				, async : true
				, type : "get"
				, data : {'returnType':'string','origin':originUrl}
				, dataType : "text"
				, xhrFields: {
						withCredentials: true
				  }
				, success : function (data, statusText, xhr) { 
					var resultSessionKey = xhr.responseText;
					//console.log('resultSessionKey::'+resultSessionKey);
					sessionKey = resultSessionKey;
					sessionKey = sessionKey.replace(/\n/gi, "");
					sessionKey = sessionKey.trim();
					ion.setCookie("sso_sessionKey", sessionKey, 60 * 60 * 1000 * 24) // 쿠키발급 후 쿠키 저장(expireDate : 20m);
					__check(fn);
				  }
				, error : function (xhr, statusText, errorThrown) { 
					console.log("error status :: " + xhr.status + " || statusText :: " + xhr.responseText + " || errorThrown :: " + errorThrown);
				  }
			  });
        } else {
			__check(fn);
		}
    }

    function __check(fn) {
        var loginCook = ion.getCookie('loginId');
        cookId(loginCook);

        var arr = sessionKey.split("_")
        ip = arr[arr.length - 1]

        var config = {
            version: 1,
            apiName: "sso",
            method: "check",
            params: {
                sessionKey: sessionKey,
                ip: ip,
				"oldSiteCd": "MBS"
            }
        }

        API.call(config, function (result) {
            serverTime = result.data.toDay
            currentTime = result.data.currentTime
            if (result.data.login) {
                userId = result.data.cstmId
                userName = result.data.cstmNm
                var mobileNm = ''
                if (result.data.mobile1) {
                    mobileNm = '' + result.data.mobile1 + result.data.mobile2 + result.data.mobile3
                }
                userInfo = {
                    cstmNm: result.data.cstmNm || '',
                    sex: result.data.sex || '',
                    gnrt: result.data.gnrt || '',
                    mobile: mobileNm,
                    birth: result.data.birth || '',
                    email: result.data.email || '',
                    ucstmId: result.data.ucstmId || '',
                    birthTp: result.data.birthTp || ''
                }
                isLogin = true
            } else {
                isLogin = false
            }
            // 세션체크 후 추가 콜백 함수 처리 loginCallBack() - 필요한 페이지에 함수 생성
            if (typeof fn == 'function') {
                fn();
            }
        })
    }

    function login() {
        var $input_id = document.querySelector("#cstmId").value
        var $input_pw = document.querySelector("#pswd").value
        
        var config = {
            version: 1,
            apiName: "sso",
            method: "login",
            params: {
                sessionKey: sessionKey,
                ip: ip,
                cstmId: $input_id,
                pswd: $input_pw,
		"oldSiteCd": "MBS"
            }
        }
        API.call(config, function (result) {
            if (result.data.login) {
                var $loginId = $("input[name='cstmId']").val();
                if ($("#cookId").is(":checked")) {
                    ion.setCookie('loginId', $loginId, 7*60*60*1000)
                    cookId(true);
                } else {
                    ion.setCookie('loginId', '', -1)
                }
                location.replace("/int/ko/index.html")
                 if(result.data.ucstmId != ""){
                 	var config = {
                 		version : 1,
                 		apiName : "amore",
                 		method : "getCstmInfo",
                 		params : {
                 			incsNo: result.data.ucstmId
                 		}
                 	}
                 	API.call(config, function(data){
                 		AP_DATA_CT = data.data.IcsgCd;
                 		// GA Push Start
                 		AP_DATA_ISLOGIN = "Y";
                 		AP_DATA_GCID = CryptoJS.SHA512(result.data.cstmId).toString();
                 		AP_DATA_CID = CryptoJS.SHA512(result.data.ucstmId).toString();
                 		AP_DATA_ISMEMBER = "O";
                 		AP_DATA_LOGINTYPE = "NORMAL";
                 		AP_DATA_CD = result.data.birth.slice(0,4);
                 		AP_DATA_CA = new Date().getFullYear() - AP_DATA_CD;
                 		AP_DATA_CG = result.data.sex;
                 		dataLayer.push({event:'login'});
                 		// GA Push End
                 		location.replace("/int/ko/index.html")
                 	})
                 }
            } else {
                if (result.resultCode === "0203") {
					alert("아이디또는 비밀번호를 확인하세요.")
                } else if (result.resultCode === "0201") {
                    if ($input_id == "") {
						alert("아이디를 입력하여 주세요.")
						IG.UI.popupNotification({
							msg: '아이디를 입력하여 주세요.',
							type: 'error',
							timer: 3000
						});
                    } else if ($input_pw == "") {
						alert("비밀번호를 입력하여 주세요.")
						IG.UI.popupNotification({
							msg: '비밀번호를 입력하여 주세요.',
							type: 'error',
							timer: 3000
						});
                    } else {
						alert("사용자를 찾을 수 없습니다.")
                    }
                } else if (result.resultCode === "0207") {
					alert("휴면 계정입니다.")
                }
                document.querySelector("#cstmId").value = "";
                document.querySelector("#pswd").value = "";
            }
        })
    }

    function logout() {
        var config = {
            version: 1,
            apiName: "sso",
            method: "logout",
            params: {
                sessionKey: sessionKey,
                ip: ip,
		"oldSiteCd": "MBS"
            }
        }
        API.call(config, function () {
			alert("로그아웃 되었습니다.")
            location.reload();
        })

    }

    function cookId(isCook) {
        if (isCook) {
            var loginId = ion.getCookie('loginId')
            $('#cstmId').val(loginId);
            $('#cookId').prop("checked", true);
        }
    }

    var _getUrl = function () {
        if (_isDev()) {
            return _DEV_URL;
        }
        return _PRD_URL;
    }

    var _isDev = function () {
        var urlArr = location.hostname;
        var devFlag = true;
        // dev- check
        if (urlArr.indexOf("dev-") == -1 && urlArr !== "10.129.28.175") {
            devFlag = false;
        }
        return devFlag;
    }
	
    return {
        check: function (fn) {
            _check(fn);
        },
        login: function () {
            login()
        },
        logout: function () {
            logout()
        },
        isLogin: function () {
            return isLogin
        },
        getDate: function () {
            return serverTime
        },
        getCurrentTime: function () {
            return currentTime
        },
        getUserId: function () {
            return userId
        },
        getUserName: function () {
            return userName
        },
        getUserInfo: function () {
            return userInfo
        },
        isDev: function () {
            _isDev()
        }
    }
});