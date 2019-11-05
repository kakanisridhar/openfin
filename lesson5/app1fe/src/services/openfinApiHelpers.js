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
