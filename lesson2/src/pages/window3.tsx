import React from 'react';
import WindowManager from '@Services/WindowManager';
import Button from '@material-ui/core/Button';
import Messenger from '../components/Messenger';

class Window3 extends React.Component {

  constructor(props: any) {
    super(props);
    this.launchWindow = this.launchWindow.bind(this);
  }

  launchWindow() {
    WindowManager.launchWindow("members");
  }

  render() {
    let topics = ["lo:internal","lo:windows"];
    return (
      <div>
        hmr or full refresh
        <Button variant="contained" color="primary" onClick = {this.launchWindow}>>
          Hello World
        </Button>

        <Messenger topics = {topics} windowid = "window3"></Messenger>
        
      </div>
    )
  }
}


export default Window3;

