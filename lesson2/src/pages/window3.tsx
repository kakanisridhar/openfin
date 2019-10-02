import React from 'react';
import WindowManager from '@Services/WindowManager';
import Button from '@material-ui/core/Button';

class Window3 extends React.Component {

  constructor(props: any) {
    super(props);
    this.launchWindow = this.launchWindow.bind(this);
  }

  launchWindow() {
    WindowManager.launchWindow("members");
  }

  render() {
    return (
      <div>
        hmr or full refresh
        <Button variant="contained" color="primary" onClick = {this.launchWindow}>>
          Hello World
        </Button>
      </div>
    )
  }
}


export default Window3;

