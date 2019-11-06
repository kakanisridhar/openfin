import React from "react";
import {
  Classes,
  Icon,
  Intent,
  ITreeNode,
  Position,
  Tooltip,
  Tree
} from "@blueprintjs/core";

import { OpenfinApiHelpers } from '../services';
import Screens from "../screens";

export class SideNav extends React.Component {
  constructor(props) {
    super(props);
    var navItems =  [];
    for (let i = 0; i < Screens.length; i++) {
      if(Screens[i].displayInSideNav) {
        navItems.push({id:i,label: Screens[i].name})
      }
    }
    this.state = { nodes: navItems };
    this.handleNodeClick = this.handleNodeClick.bind(this);
  }

  render() {
    return (
      <div>
        <Tree
          contents={this.state.nodes}
          onNodeClick={this.handleNodeClick}
          className={Classes.ELEVATION_0}
        />
      </div>
    );
  }

  handleNodeClick(nodeData, nodePath, e) {
    const originallySelected = nodeData.isSelected;
    if (!e.shiftKey) {
      this.forEachNode(this.state.nodes, n => (n.isSelected = false));
    }
    nodeData.isSelected = originallySelected == null ? true : !originallySelected;
    this.setState(this.state);
    OpenfinApiHelpers.launchScreen(nodeData.label,{autoShow:true,defaultCentered:true});
  }

  forEachNode(nodes, callback) {
    if (nodes == null) {
      return;
    }

    for (const node of nodes) {
      callback(node);
      this.forEachNode(node.childNodes, callback);
    }
  }

}

export default SideNav;
