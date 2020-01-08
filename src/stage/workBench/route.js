import WorkList from "./mainPage/views/workList/index.jsx";
import Message from "./mainPage/views/message/index.jsx";

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
