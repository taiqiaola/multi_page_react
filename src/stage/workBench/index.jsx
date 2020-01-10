import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import rootReducer from "./reducer";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import "moment/locale/zh-cn";
import { ConfigProvider } from "antd";
import App from "./App";

const createHashHistory = require("history").createHashHistory;
const createBrowserHistory = require("history").createBrowserHistory;

const historyMid = routerMiddleware(createHashHistory());

function configureStore(initState) {
  const tools = window.devToolsExtension ? window.devToolsExtension() : f => f;
  const store = createStore(rootReducer, initState, compose(applyMiddleware(historyMid), module.hot ? tools : f => f));

  if (module.hot) {
    module.hot.accept("./reducer.js", () => {
      const nextRootReducer = require("./reducer").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zh_CN}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);
