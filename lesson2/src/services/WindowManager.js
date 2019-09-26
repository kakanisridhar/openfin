import { navigate } from "@reach/router"

class WindoManager {
  constructor(isAppWindow) {
    this.isAppWindow = isAppWindow;
  }

  launchWindow(name, options) {
    if (typeof(fin) !== "undefined") {
      const defaultOptions = {
        name,
        url: `/${name}`,
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
    } else {
      navigate(`/${name}`);
    }
  }
}

export default WindoManager;
