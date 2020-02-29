import React, { Component } from "react";
import * as actions from "../../action";
import { connect } from "react-redux";
import qs from "query-string";
import { Button, message } from "antd";
import { Header } from "../components";
import { getTodoWoList, getLoginUser } from "@/service/common.js";
import "./index.less";

class WorkList extends Component {
  state = {
    data: [],
    currentName: ""
  };

  componentDidMount() {
    const param = {
      page: 1,
      pageSize: 10
    };
    getTodoWoList(param).then(res => {
      message.info(res.resultStat);
      this.setState({
        data: res.value.list
      });
    });

    getLoginUser().then(res => {
      this.setState({
        currentName: res.data.loginName
      });
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
    const ceshiIMG_1 = "/assets/favicon.png";
    const ceshiIMG_2 = "/assets/image/backimg/ceshi.png";

    const { data, currentName } = this.state;

    return (
      <div className="workListBox">
        <Header>
          <p>你好，{currentName}！</p>
          <img src={ceshiIMG_1} style={{ paddingRight: 8 }} />
          <img src={ceshiIMG_2} style={{ paddingRight: 8 }} />
          {data.map(item => (
            <p key={item.itemNumber}>{item.itemNumber}</p>
          ))}
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
