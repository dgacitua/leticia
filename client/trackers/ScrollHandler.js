import { throttle } from 'lodash';

import ActionSender from '../services/ActionSender';

class ScrollHandler {
  constructor(handlerId) {
    this.handlerId = handlerId;
    this.sender = new ActionSender(handlerId);
  }

  scroll(evt) {
    let message = {
      type  : 'Scroll',
      source: this.handlerId,
      url   : window.document.URL,
      clientTimestamp: Date.now(),
      x_scr : window.scrollX,
      y_scr : window.scrollY,
      w_win : window.innerWidth,
      h_win : window.innerHeight,
      w_doc : document.documentElement.scrollWidth,
      h_doc : document.documentElement.scrollHeight
    };

    //console.log(message.type, `X: ${message.x_scr}`, `Y: ${message.y_scr}`, `TS: ${message.clientTimestamp}`);
    return message;
  }
}

export default ScrollHandler;