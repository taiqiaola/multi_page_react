import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory, hashHistory } from "react-router";
import { Route, Redirect, Switch, Router } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { createBrowserHistory, createHashHistory } from "history";
import "@/common/css/global.less";
import "./index.less";

const history = createHashHistory();

const getRootRedirect = data => {
  let targetRedirect = "";
  for (let key in data) {
    if (data[key].isFirstRoute) {
      targetRedirect = key;
    }
  }
  return targetRedirect;
};

class BasicLayout extends Component {
  getRouteHTML = data => {
    return Object.keys(data).map(key => {
      const RouteComponent = data[key].component;

      return <Route key={key} exact path={key} render={props => <RouteComponent {...props} />} />;
    });
  };

  render() {
    const { routerConfig } = this.props;

    return (
      <Router history={history}>
        <section>
          <div>
            <Switch>
              <Redirect exact from="/" to={getRootRedirect(routerConfig)} />
              {this.getRouteHTML(routerConfig)}
            </Switch>
          </div>
        </section>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default BasicLayout;
