/* eslint-disable no-console */
import { uniqueId, extend } from 'underscore';

declare var fin: any;

const appId = process.env.APP_UUID;

const initWindowCode = () => {
  // resize window
  (async () => {
    const me = await fin.Window.getCurrent();
    const bounds = await me.getBounds();
    // eslint-disable-next-line no-undef
    const desiredHeight = WINDOW_HEIGHT;
    // eslint-disable-next-line no-undef
    const desiredWidth = WINDOW_WIDTH;
    const totalWidth = bounds.width;
    const totalHeight = bounds.height;
    const windowWidthDiff = totalWidth - window.innerWidth;
    const windowWidthHeightDiff = totalHeight - window.innerHeight;
    const newWidth = desiredWidth + windowWidthDiff;
    const newHeight = desiredHeight + windowWidthHeightDiff;
    await me.resizeTo(newWidth, newHeight, 'top-left');
    await me.show();
  })();
};

class WindoManager {
  static async launchWindow(name, options) {
    if (typeof fin !== 'undefined') {
      const app = await fin.Application.getCurrent();
      const childWindows = await app.getChildWindows();
      for (let i = 0; i < childWindows.length; i++) {
        const childWindowOptions = await childWindows[i].getOptions();
        if (childWindowOptions.name === name) {
          if (childWindows[i]) {
            childWindows[i].bringToFront();
            childWindows[i].flash();
            return;
          }
          break;
        }
      }

      const defaultOptions = {
        autoShow: false,
        name: name,
        url: `/${name}`,
        resizable: true,
        defaultCentered: true,
        saveWindowState: false,
        defaultHeight: 400,
        defaultWidth: 400
      };

      const winOptions = extend(defaultOptions, options);

      const win = await fin.Window.create(winOptions);

      const body = initWindowCode
        .toString()
        .slice(
          initWindowCode.toString().indexOf('{') + 1,
          initWindowCode.toString().lastIndexOf('}')
        )
        .replace('WINDOW_HEIGHT', winOptions.defaultHeight)
        .replace('WINDOW_WIDTH', winOptions.defaultWidth);

      await win.executeJavaScript(body);

    }
  }
}

export default WindoManager;
