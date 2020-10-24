import axios from 'axios';

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
    return axios.post(API_URL + '/keystrokes', ksba);
  }

  sendTypingTestResponses(textArray) {
    let response = {
      username: this.username,
      type: 'TypingTestCompleted',
      source: this.senderId,
      url: window.document.URL,
      clientTimestamp: Date.now(),
      details: textArray
    }

    return axios.post(API_URL + '/actions', response);
  }
}

export default ActionSenderService;