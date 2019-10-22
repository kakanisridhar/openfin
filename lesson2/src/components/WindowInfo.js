import React from 'react';

export default class WindowInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      WI: {},
      MainWindow: true
    };
  }

  render() {
    return (
      <div>
        
        <p>Is main window = {JSON.stringify(this.state.MainWindow)}</p>

        <p>Name = {JSON.stringify(this.state.WI.name)}</p>

        <p>custom data = {JSON.stringify(this.state.WI.customData)}</p>
        
      </div>
    );
  }

  async componentDidMount() {
    let _win = fin.Window.getCurrentSync();
    let windowInfo = await _win.getOptions();
    console.log(_win.isMainWindow());
    console.log(windowInfo);
    this.setState({ WI : windowInfo,
      MainWindow : _win.isMainWindow()
     });
  }
}
