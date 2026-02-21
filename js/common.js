document.addEventListener("DOMContentLoaded", function() {
    var currentUrl = window.location.href;
    var canonical = document.getElementById("canonical");
    var ogUrl = document.getElementById("og:url");

    if (canonical) {
        canonical.setAttribute("href", currentUrl);
    }
    if (ogUrl) {
        ogUrl.setAttribute("content", currentUrl);
    }
});

(function() {
    const mobileArr = ["iPhone", "iPod", "iPad", "BlackBerry", "Android", "Windows CE", "LG", "MOT", "SAMSUNG", "SonyEricsson"];
    let mobileChk = "PC";

    // navigator.userAgent를 확인하여 모바일 여부 판단
    const isMobile = mobileArr.some(device => navigator.userAgent.match(device));
    if (isMobile) {
        mobileChk = "MOBILE";
    }

    // 전역 변수로 설정 (기존 코드와의 호환성을 위해 window에 할당)
    window.mobileChk = mobileChk;
    window.dataLayer = window.dataLayer || [];
})();