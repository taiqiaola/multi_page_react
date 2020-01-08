import WorkList from "./mainPage/views/workList/index.jsx";
import Message from "./mainPage/views/Message/index.jsx";

// import Loadable from "common/js/loadable.js";
// const WorkList = Loadable(() => import("./mainPage/views/workList/index.jsx"));
// const Message = Loadable(() => import("./mainPage/views/message/index.jsx"));

export const routerConfig = {
  "/workList": {
    component: WorkList,
    isFirstRoute: true
    // roleId: "10000001"
  },
  "/message": {
    component: Message,
    isFirstRoute: false
    // roleId: "10000001"
  }
};
