class WindoManager {
  constructor(isAppWindow) {
    this.isAppWindow = isAppWindow;
  }

  launchWindow(name, options) {
    const defaultOptions = {
      name: name,
      url : `${name}.html`,
      defaultWidth: 300,
      defaultHeight: 300,
      resizable: true
    };

    const windowOptions = {
      ...options,
      ...defaultOptions
    };

    const win = fin.Window.create(windowOptions);
    win.then(W => W.show());
  }
}

export default WindoManager;
