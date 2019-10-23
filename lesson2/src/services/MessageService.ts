const listenerMap = new Map();

declare var fin: any;

const appId = process.env.APP_UUID;

export class MessageService {

  static send(topic: string, message: any) {
    fin.InterApplicationBus.send(appId, topic, message);
  }

  static subscribe(topic: string, listener: (message: string|object, sender: string, name: string ) => void) {
    fin.desktop.InterApplicationBus.subscribe(appId, topic, listener);
  }

  static unsubscribe(
    topic: string,
    listener: (message: string|object, sender: string, name: string ) => void
  ) {
    fin.InterApplicationBus.unsubscribe(appId, topic, listener);
  }
}
