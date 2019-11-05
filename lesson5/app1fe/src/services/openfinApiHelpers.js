import Screens from '../screens';


export const createWindow = async windowOptions => {
  return await window.fin.Window.create(windowOptions);
};

export const getCurrentWindow = async () => {
  return await window.fin.Window.getCurrent();
};

export const getCurrentWindowSync = () => {
  return window.fin.Window.getCurrentSync();
};

export const getChildWindows = async () => {
  const application = await window.fin.Application.getCurrent();
  return await application.getChildWindows();
};

export const getCurrentWindowOptions = async () => {
  const currentWindow = await getCurrentWindow();
  return await currentWindow.getOptions();
};

export const sendInterApplicationMessage = async (uuid, topic, payload) =>
  await window.fin.InterApplicationBus.send({ uuid }, topic, payload);

export const launchScreen = async (name,options) => {
  const childWindows = await getChildWindows();
  for (let i = 0; i < childWindows.length; i++) {
    const childWindowOptions = await childWindows[i].getOptions();
    if (childWindowOptions.name === name) {
      if (childWindows[i]) {
        return childWindows[i];
      }
      break;
    }
  }

  let screen = Screens.find( S => S.name===name );

  if(screen !== undefined) {
    const defaultOptions = {
      autoShow: false,
      name: name,
      url: screen.path,
      resizable: true,
      frame: false,
      defaultHeight: screen.options.height,
      defaultWidth: screen.options.width,
      defaultLeft: screen.options.left,
      defaultTop: screen.options.top
    };
    let combinedOptions = Object.assign({},defaultOptions,options);
    console.log("window options " +  JSON.stringify(combinedOptions));
    try {
      const win = await createWindow(combinedOptions);
      return win;
    } catch(err) {
      console.log("error while creating window ");
      console.log(err);
    }

  }

  return null;
}