let Utils = {}
Utils.format = function () {
  var date = new Date()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  var Hour = date.getHours()
  var Minute = date.getMinutes()
  var Second = date.getSeconds()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  if (Hour >= 0 && Hour <= 9) {
    Hour = '0' + Hour
  }
  if (Minute >= 0 && Minute <= 9) {
    Minute = '0' + Minute
  }
  if (Second >= 0 && Second <= 9) {
    Second = '0' + Second
  }
  var currentdate = '' + date.getFullYear() + month + strDate + Hour + Minute + Second
  return currentdate
}
export default Utils
