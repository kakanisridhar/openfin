import React, {useEffect} from 'react';
import SideNavButton from "./SideNavButton";
import {ScreenEdge, useDockWindow} from "openfin-react-hooks";
import { OpenfinApiHelpers } from '../services';
import { logout } from "../util/APIUtils";

function TopNav() {
  
  let _curWin = OpenfinApiHelpers.getCurrentWindowSync()
  const [edge, actions] = useDockWindow(ScreenEdge.TOP,_curWin,false, {
    dockedHeight: 100
  });  
  
  useEffect(
    () => {
      return () => {
        logout();
      };
    },
    [],
  );

  return (
    <div className="top-nav"> 
            <SideNavButton/>
            Bgroup, language... selection will come here
    </div>
  );
}

export default TopNav;
