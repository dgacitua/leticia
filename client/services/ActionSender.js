import Axios from 'axios';
import { UAParser } from 'ua-parser-js';

import { router } from '../modules/routes';
import { store } from '../modules/store';

import * as Constants from './Constants';
import { getNestedValue } from './Utils';

const API_URL = `${Constants.backendApiUrl}`;

class ActionSenderService {
  constructor(senderId) {
    this.senderId = senderId;
    this.username = getNestedValue(store, 'state.auth.user.username') || '';
  }

  sendKeystrokeBuffer(ksBufferArray) {
    let ksba = ksBufferArray.map(ks => ({ ...ks, username: this.username }));
    return Axios.post(API_URL + '/keystrokes', ksba);
  }

  sendMouseBuffer(mBufferArray) {
    let mba = mBufferArray.map(m => ({ ...m, username: this.username }));
    return Axios.post(API_URL + '/mouseactions/buffer', mba);
  }

  sendTypingTestResponses(textArray) {
    let message = {
      username: this.username,
      type: 'TypingTestCompleted',
      source: this.senderId,
      url: router.currentRoute.fullPath,
      clientTimestamp: Date.now(),
      details: textArray
    };

    return Axios.post(API_URL + '/actions', message);
  }

  sendVisitedPage(details, isEnter = true) {
    let message = {
      username: this.username,
      type: isEnter ? 'PageEnter' : 'PageExit',
      source: this.senderId,
      url: router.currentRoute.fullPath,
      clientTimestamp: Date.now(),
      details: details
    };

    return Axios.post(API_URL + '/actions', message);
  }

  sendBookmark(bmDoc) {
    let message = bmDoc;
    return Axios.post(API_URL + '/bookmarks', message);
  }

  userLog(isLogin = true) {
    let userAgent = navigator.userAgent;
    let parsedUserAgent = UAParser(userAgent);

    let message = {
      username: this.username,
      type: isLogin ? 'Login' : 'Logout',
      ipAddress: '',
      userAgent: userAgent,
      device: `${parsedUserAgent.device.type} ${parsedUserAgent.device.vendor} ${parsedUserAgent.device.model}`,
      operatingSystem: `${parsedUserAgent.os.name} ${parsedUserAgent.os.version}`,
      browser: `${parsedUserAgent.browser.name} ${parsedUserAgent.browser.version}`,
      clientTimestamp: Date.now(),
      details: {}
    };

    console.log('UserLog', message);
    return Axios.post(API_URL + '/userlog', message);

    /*
    let message = {
      username: this.username,
      type: isLogin ? 'Login' : 'Logout',
      source: 'UserLog',
      url: router.currentRoute.fullPath,
      clientTimestamp: Date.now(),
      details: {
        // dgacitua: Remember to split by whitespace when processing
        ipAddress: '',
        userAgent: userAgent,
        device: `${parsedUserAgent.device.type} ${parsedUserAgent.device.vendor} ${parsedUserAgent.device.model}`,
        operatingSystem: `${parsedUserAgent.os.name} ${parsedUserAgent.os.version}`,
        browser: `${parsedUserAgent.browser.name} ${parsedUserAgent.browser.version}`
      }
    };

    console.log('UserLog', message);
    return Axios.post(API_URL + '/actions', message);
    */
  }

  sendMouseAction(mouseAction) {
    let message = {
      ...mouseAction,
      username: this.username,
      source: this.senderId,
      url: router.currentRoute.fullPath,
    };

    //console.log(message);
    return Axios.post(API_URL + '/mouseactions', message);
  }

  sendScrollAction(scrollAction) {
    let message = {
      ...scrollAction,
      username: this.username,
      source: this.senderId,
      url: router.currentRoute.fullPath,
    };

    //console.log(message);
    return Axios.post(API_URL + '/scrollactions', message);
  }

  sendGenericAction(originalMsg) {
    let message = {
      username: originalMsg.username || this.username,
      type: originalMsg.type || 'GenericAction',
      source: originalMsg.source || this.senderId,
      url: router.currentRoute.fullPath,
      clientTimestamp: Date.now(),
      details: originalMsg.details || {}
    };

    return Axios.post(API_URL + '/actions', message);
  }
}

export default ActionSenderService;