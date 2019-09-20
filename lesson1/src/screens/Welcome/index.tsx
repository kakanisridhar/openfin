import { AppContainer } from 'react-hot-loader';
import React, { ComponentClass, FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import WindowManager from '@Services/WindowManager';
import Button from '@material-ui/core/Button';


const winManager = new WindowManager(false);

const renderComponent = (Component: ComponentClass | FunctionComponent) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

class Welcome extends React.Component {

  constructor(props: any) {
    super(props);
    this.launchWindow = this.launchWindow.bind(this);
  }

  launchWindow() {
    //Use windowmanagers launch window here 
    winManager.launchWindow("lesson1");
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


renderComponent(Welcome);

