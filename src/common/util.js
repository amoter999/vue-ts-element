var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
var isIE =
  userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
