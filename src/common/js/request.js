import { params } from "./utils.js";
import { message } from "antd";

const defaultTimeout = 300000;

export function Fetch(url, init) {
  init = init || {};
  init.headers = init.headers || {};

  if (init.method === "GET" || init.method === "get") {
    init.param = init.param || {};

    let dataStr = "";
    Object.keys(init.param).forEach(key => {
      dataStr += key + "=" + init.param[key] + "&";
    });

    if (dataStr !== "") {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
      url = url + "?" + dataStr;
    }
  }

  var body = init.body;

  init.credentials = "include";

  if (init.method && ["GET", "get", "HEAD", "head"].indexOf(init.method) === -1) {
    init.headers["Content-Type"] = init.headers["Content-Type"] || "application/json";
  }

  if (init.body) {
    init.method = init.method || "POST";
  }

  if (init.method === "POST" && init.headers["Content-Type"] === "application/x-www-form-urlencoded") {
    init.body = params(init.body);
  }

  init.headers["X-Proxy-Timeout"] = init.timeout || defaultTimeout;

  if (Object.prototype.toString.call(init.body) === "[object Object]") {
    if (init.body.para) {
      if (window.location.href.indexOf("localhost") > -1) {
        init.body = JSON.stringify(init.body);
      } else {
        init.body = encodeURIComponent(JSON.stringify(init.body));
      }
    } else {
      init.body = JSON.stringify(init.body);
    }
  }

  if (window.location.href.indexOf("localhost") > -1) {
    if (url.indexOf("actionService.spr") > -1) {
      url = url + "?userName_react=Litong";
    }
    if (url.indexOf("callServerFunctionForReact.spr") > -1) {
      url = url + "?userName_react=Litong";
    }
  }

  return fetch(url, init).then(
    res => {
      if (res.status >= 500 && res.status <= 504) {
        message.error("cuowu");
        throw new Error(`${res.status}`);
      }

      return res.text().then(html => {
        if (html.indexOf("<html>") > -1) {
          const { origin, pathname } = window.location;
          if (origin.indexOf("localhost") === -1) {
            window.location.href = origin + pathname;
          } else {
            document.write("hahahahahha");
          }
        } else {
          const reslt = JSON.parse(html);
          if (reslt.resultStat === "NOT_LOGIN") {
            console.log("aaaaaaaaa");
          } else {
            return reslt;
          }
        }
      });
    },
    err => {
      throw err;
    }
  );
}
