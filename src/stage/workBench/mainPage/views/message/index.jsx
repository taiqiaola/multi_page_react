import React, { Component } from "react";
import * as actions from "../../action";
import { connect } from "react-redux";
import qs from "query-string";
import { Button } from "antd";
import "./index.less";

class Message extends Component {
  onBtnClick = () => {
    this.props.history.push("./workList");
  };

  render() {
    // const { abc } = qs.parse(this.props.history.location.search);

    return (
      <div className="box">
        <Button type="primary" onClick={this.onBtnClick}>
          跳到workList路由页面
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, actions)(Message);
