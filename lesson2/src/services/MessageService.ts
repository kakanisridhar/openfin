const listenerMap = new Map();

declare var fin: any;

const appId = process.env.APP_UUID;

export default class MessageService {

  static send(topic: string, message: string|object) {
    console.log("sending message on " + topic);
    fin.InterApplicationBus
    .send({ uuid: appId, name: '*' }, topic, message)
    .catch(err => console.log(err));
  }

  static subscribe(topic: string, listener: (message: string|object, sender: string ) => void) {
    console.log("subscribing to " + topic);

    const receiveMessage = (message, senderUUId) => {
      if (senderUUId.name !== fin.Window.me.name) {
        listener(message, senderUUId.name);
      }
    };

    // Map the arguments to the actual listener that was added
    listenerMap.set({
      topic,
      listener
    }, receiveMessage);

    fin.InterApplicationBus
    .subscribe({ uuid: appId, name: '*' }, topic, receiveMessage)
    .then(() => console.log('Successfully Subscribed to '+ topic))
    .catch(err => console.log('Error while subscribing' + err));
  }

  static unsubscribe(
    topic: string,
    listener: (message: string|object, sender: string, name: string ) => void
  ) {
    let deleteKey = null;
    let receiveMessage = null;

    // We cant use listenerMap.has() here because reconstructing the key from the arguments is a different object
    // I.e. {} !== {}
    listenerMap.forEach((value, key) => {
      if (key.topic === topic && key.listener === listener) {
        receiveMessage = value;
        deleteKey = key;
      }
    });

    if (deleteKey) {
      listenerMap.delete(deleteKey);
      fin.InterApplicationBus.unsubscribe({ uuid: appId, name: '*' }, topic, receiveMessage);
    }
  }
}
