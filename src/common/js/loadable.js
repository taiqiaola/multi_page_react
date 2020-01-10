import React from "react";
import Loadable from "react-loadable";
import { Spin } from "antd";

const loadingComponent = () => {
  return (
    <div>
      <Spin />
    </div>
  );
};

export default function WithLoadable(comp) {
  return Loadable({
    loader: comp,
    loading: loadingComponent,
    timeout: 1000
  });
}
