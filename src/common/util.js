var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
var isIE =
  userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
export default function dateConvert(value) {
  let hour,
    min,
    sec,
    createDate = value;
  hour = parseInt(createDate / 60 / 60);
  min = parseInt((createDate - hour * 3600) / 60);
  sec = parseInt(createDate - (hour * 3600 + min * 60));
  if (hour > 0) {
    if (min > 0) {
      if (sec > 0) {
        createDate = hour + "时" + min + "分" + sec + "秒";
      } else {
        createDate = hour + "时" + min + "分";
      }
    } else {
      if (sec > 0) {
        createDate = hour + "时" + sec + "秒";
      } else {
        createDate = hour + "时";
      }
    }
  } else if (min > 0) {
    createDate = sec > 0 ? min + "分" + sec + "秒" : min + "分";
  } else if (sec > 0) {
    createDate = sec + "秒";
  }
  return createDate;
}
