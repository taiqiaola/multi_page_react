import React from "react";
import Loadable from "react-loadable";

const loadingComponent = () => {
  return <div>loading</div>;
};

export default function WithLoadable(comp) {
  return Loadable({
    loader: comp,
    loading: loadingComponent,
    timeout: 1000
  });
}
