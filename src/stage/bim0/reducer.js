import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as mainPage } from "./mainPage/index.jsx";

const allReducer = combineReducers({
  router: routerReducer,
  ...mainPage
});

export default allReducer;
