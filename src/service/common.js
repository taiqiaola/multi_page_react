import { Fetch } from "@/common/js/request.js";
import ServiceAddress from "@/common/js/serviceAddress.js";

const { host, port } = ServiceAddress["/apiX"];

const BaseUrlX = window.location.href.indexOf("localhost") > -1 ? "/apiX" : "";

// 获取待办工单列表
export const getTodoWoList = param => {
  return Fetch(BaseUrlX + "/digital/actionService.spr", {
    method: "POST",
    body: {
      serviceBean: "queryTaskController",
      serviceName: "queryTaskController",
      methodName: "queryRemainWo",
      para: [param]
    }
  });
};

// 获取用户信息
export const getLoginUser = () => {
  const arrParam = ["com.ztesoft.res.frame.user.manager.inf.StaffStateServiceIntf", "getLoginUser"];
  return Fetch(BaseUrlX + "/digital/common/service/callServerFunctionForReact.spr", {
    method: "POST",
    body: {
      _callFunParams: JSON.stringify(arrParam)
    }
  });
};
