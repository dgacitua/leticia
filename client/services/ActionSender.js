import Axios from 'axios';

import { store } from '../modules/store';
import * as Constants from './Constants';

const API_URL = `${Constants.backendApiUrl}`;

class ActionSenderService {
  constructor(senderId) {
    this.senderId = senderId;
    this.username = store.state.auth.user.username || null;
  }

  sendKeystrokeBuffer(ksBufferArray) {
    let ksba = ksBufferArray.map(ks => ({ ...ks, username: this.username }));
    return Axios.post(API_URL + '/keystrokes', ksba);
  }

  sendTypingTestResponses(textArray) {
    let message = {
      username: this.username,
      type: 'TypingTestCompleted',
      source: this.senderId,
      url: window.document.URL,
      clientTimestamp: Date.now(),
      details: textArray
    }

    return Axios.post(API_URL + '/actions', message);
  }

  sendVisitedPage(details, isEnter = true) {
    let message = {
      username: this.username,
      type: isEnter ? 'PageEnter' : 'PageExit',
      source: this.senderId,
      url: window.document.URL,
      clientTimestamp: Date.now(),
      details: details
    }

    return Axios.post(API_URL + '/actions', message);
  }

  sendGenericAction(message) {
    message.username = this.username;

    return Axios.post(API_URL + '/actions', message);
  }
}

export default ActionSenderService;