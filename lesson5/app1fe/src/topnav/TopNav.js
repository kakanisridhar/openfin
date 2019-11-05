import React from 'react';
import { Button  } from "@blueprintjs/core";
import {ScreenEdge, useDockWindow} from "openfin-react-hooks";
import { OpenfinApiHelpers } from '../services';

function TopNav() {
  
  let _curWin = OpenfinApiHelpers.getCurrentWindowSync()
  const [edge, actions] = useDockWindow(ScreenEdge.TOP,_curWin,false, {
    dockedHeight: 100
  });

  return (
    <div className="top-nav"> 
            <Button icon="refresh">Open Sidenav</Button>
            Bgroup selection will come here
    </div>
  );
}

export default TopNav;
