// import { view as MainPage } from "./mainPage/index.jsx";

import Loadable from "@/common/js/loadable.js";

const MainPage = Loadable(() => import("./mainPage/views"));

export const routerConfig = {
  "/mainPage": {
    component: MainPage,
    isFirstRoute: true
  }
};
