// import WorkList from "./mainPage/views/workList";
// import Message from "./mainPage/views/Message";

import Loadable from "@/common/js/loadable.js";
const WorkList = Loadable(() => import("./mainPage/views/workList"));
const Message = Loadable(() => import("./mainPage/views/message"));

export const routerConfig = {
  "/workList": {
    component: WorkList,
    isFirstRoute: true
  },
  "/message": {
    component: Message,
    isFirstRoute: false
  }
};
