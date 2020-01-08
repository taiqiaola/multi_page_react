import { view as MainPage } from "./mainPage/index.jsx";

export const routerConfig = {
  "/mainPage": {
    component: MainPage,
    isFirstRoute: true,
    roleId: "10000001"
  }
};
