import React from 'react';
import './App.scss';
import { Button, ButtonGroup, AnchorButton } from "@blueprintjs/core";
import TitleBar from './Components/Titlebar/Titlebar';
import {IDimensions, ScreenEdge, useDockWindow} from "openfin-react-hooks";
import { OpenfinApiHelpers } from './Services';

function App() {
  //dock window to left
  /*const [edge, actions] = useDockWindow(
    ScreenEdge.LEFT,
    OpenfinApiHelpers.getCurrentWindowSync,
    true,
    enableStretchToFit ? dimensions : undefined,
    {
        undockPosition: undockTop && undockLeft
            ? { top: undockTop, left: undockLeft }
            : undefined,
        undockSize: undockWidth && undockHeight
            ? { width: undockWidth, height: undockHeight }
            : undefined,
    },
  );*/

  return (
    <React.Fragment>
       <TitleBar></TitleBar> 
       <div className="App bp3-elevation-5"> 
       <ButtonGroup minimal={true}>
        <Button icon="database">Queries</Button>
        <Button icon="function">Functions</Button>
        <AnchorButton rightIcon="caret-down">Options</AnchorButton>
      </ButtonGroup>
       </div>
    </React.Fragment>      
  );
}

export default App;
