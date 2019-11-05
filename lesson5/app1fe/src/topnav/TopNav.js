import React, {useEffect} from 'react';
import SideNavButton from "./SideNavButton";
import {ScreenEdge, useDockWindow} from "openfin-react-hooks";
import { OpenfinApiHelpers } from '../services';

function TopNav() {

  let _curWin = OpenfinApiHelpers.getCurrentWindowSync()
  const [edge, actions] = useDockWindow(ScreenEdge.TOP,_curWin,false, {
    dockedHeight: 100
  });  

  return (
    <div className="top-nav"> 
            <SideNavButton/>
            Bgroup selection will come here
    </div>
  );
}

export default TopNav;
