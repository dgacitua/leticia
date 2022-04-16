/* DEPRECATED */

import SockJS from 'sockjs-client';

import * as Constants from './Constants';

const websocketUrl = `${location.protocol}//${Constants.leticiaHost}:${Constants.wsPort}/ws`;

// ES6 Singleton Class: https://www.sitepoint.com/javascript-design-patterns-singleton/
class WebSocketService {
  constructor() {
    if (!WebSocketService.instance) {
      this.sock = new SockJS(websocketUrl);

      this.sock.onopen = () => { console.log('WebSocket opened!') };
      this.sock.onclose = () => { console.log('WebSocket closed!') };
      this.sock.onmessage = (msg) => { /* console.log('Message sent through WebSocket!', msg.data) */ };

      WebSocketService.instance = this;
    }

    return WebSocketService.instance;
  }

  sendPing() {
    this.sock.send(JSON.stringify({ message: 'Client connected!' }));
  }
  
  sendMessage(msgObject) {
    this.sock.send(JSON.stringify(msgObject));
  }
}

const instance = new WebSocketService();
Object.freeze(instance);

export default instance;