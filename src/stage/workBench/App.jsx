import React, { Component } from "react";
import { connect } from "react-redux";
import { routerConfig } from "./route";
import BasicLayout from "../../layouts";
import { hot } from "react-hot-loader/root";

class App extends Component {
  render() {
    return <BasicLayout {...{ routerConfig }} {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {};
}

const HOCApp = module.hot ? hot(App) : App;

export default connect(mapStateToProps, null)(HOCApp);
