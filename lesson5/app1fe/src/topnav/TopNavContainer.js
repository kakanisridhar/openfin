import React, { Component } from "react";
import { OpenfinApiHelpers } from '../services';
import TitleBar from "../components/Titlebar";
import TopNav from "./TopNav";

export class TopNavContainer extends Component {

  render() {
    return (
      <React.Fragment>
        <TitleBar onClose={OpenfinApiHelpers.quitApp}></TitleBar>
        <TopNav></TopNav>
      </React.Fragment>
    );
  }
}

export default TopNavContainer;
