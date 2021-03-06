export function params(options) {
  var arr = [];
  for (var key in options) {
    var value = options[key];
    if (Object.prototype.toString.call(value) === "[object Array]" || Object.prototype.toString.call(value) === "[object Object]") {
      arr.push(key + "=" + encodeURIComponent(JSON.stringify(value)));
      continue;
    }
    arr.push(key + "=" + encodeURIComponent(value));
  }
  return arr.join("&");
}
