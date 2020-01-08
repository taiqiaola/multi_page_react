import React, { Component } from "react";
import { connect } from "react-redux";
import { routerConfig } from "./route";
import BasicLayout from "../../layouts/index.jsx";

class App extends Component {
  render() {
    return <BasicLayout {...{ routerConfig }} {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, null)(App);
