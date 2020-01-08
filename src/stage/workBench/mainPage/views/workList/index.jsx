import React, { Component } from "react";
import * as actions from "../../action";
import { connect } from "react-redux";
import qs from "query-string";
import { Button, message } from "antd";
import { Header } from "../components";
import { getTodoWoList, getItemConfTree } from "service/common.js";
import "./index.less";

class WorkList extends Component {
  UNSAFE_componentWillMount() {
    const param = {
      page: 1,
      pageSize: 10
    };
    getTodoWoList(param).then(res => {
      console.log(res);
      message.info("123");
    });
  }

  onBtnClick = () => {
    window.location.href = "./bim0.html";
  };

  onBtnClick_1 = () => {
    this.props.history.push("./message");
  };

  render() {
    // const { abc } = qs.parse(this.props.history.location.search);
    const ceshiIMG = "/assets/ceshi.jpg";

    return (
      <div className="workListBox">
        <Header>
          <img src={ceshiIMG} style={{ paddingRight: 8 }} />
          <Button type="primary" onClick={this.onBtnClick}>
            跳到bim0.html页面
          </Button>
          <Button type="primary" onClick={this.onBtnClick_1}>
            跳到message路由页面
          </Button>
        </Header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, actions)(WorkList);
