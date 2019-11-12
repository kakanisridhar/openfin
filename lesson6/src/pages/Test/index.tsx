import React, { Component } from "react";
import { Divider } from "antd";
import BgroupSelector from '../../components/BgroupSelector';
import AppNav from '../../components/AppNav';


interface Props {}
interface State {}

export default class index extends Component<Props, State> {
  state = {};

  render() {
    return (
      <>
        <BgroupSelector></BgroupSelector>
        <Divider />
        <AppNav></AppNav>
      </>
    );
  }
}
