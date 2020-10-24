import { throttle } from 'lodash';

class MouseHandler {
  constructor(handlerId) {
    this.handlerId = handlerId;
  }

  click(evt) {
    let message = {
      type  : 'MouseClick',
      source: this.handlerId,
      url   : window.document.URL,
      clientTimestamp: Date.now(),
      x_win : evt.clientX,
      y_win : evt.clientY,
      w_win : window.innerWidth,
      h_win : window.innerHeight,
      x_doc : evt.pageX,
      y_doc : evt.pageY,
      w_doc : document.documentElement.scrollWidth,
      h_doc : document.documentElement.scrollHeight
    };

    console.log(message.type, `X: ${message.x_win}`, `Y: ${message.y_win}`, `TS: ${message.clientTimestamp}`);
    return message;
  }

  move(evt) {
    let message = {
      type  : 'MouseMovement',
      source: 'Window',
      url   : window.document.URL,
      clientTimestamp: Date.now(),
      x_win : evt.clientX,
      y_win : evt.clientY,
      w_win : window.innerWidth,
      h_win : window.innerHeight,
      x_doc : evt.pageX,
      y_doc : evt.pageY,
      w_doc : document.documentElement.scrollWidth,
      h_doc : document.documentElement.scrollHeight
    };

    console.log(message.type, `X: ${message.x_win}`, `Y: ${message.y_win}`, `TS: ${message.clientTimestamp}`);
    return message;
  }

  bindTracker() {
    window.addEventListener('click', this.click);
    window.addEventListener('mousemove', throttle(this.move, 250));
    console.log('Mouse Tracker ON!');
  }
  
  unbindTracker() {
    window.removeEventListener('click', this.click);
    window.removeEventListener('mousemove', throttle(this.move, 250));
    console.log('Mouse Tracker OFF!');
  }
}

export default MouseHandler;