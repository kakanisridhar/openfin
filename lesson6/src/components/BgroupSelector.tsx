import React, { Component } from "react";
import { Select } from "antd";
const { Option } = Select;


interface Props {}
interface State {}

export default class BgroupSelector extends Component<Props, State> {
  state = {};

  render() {
    return (
      <>
        <Select placeholder="Language" style={{ width: 80 }}>
            <Option value="en">en</Option>
            <Option value="fr">fr</Option>
        </Select>
        {
          " "
        }
        <Select placeholder="BGroup" style={{ width: 80 }}>
            <Option value="zz1">ZZ1</Option>
            <Option value="tc1">TC1</Option>
        </Select>

      </>
    );
  }
}
