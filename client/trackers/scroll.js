import { throttle } from 'lodash';

const scroll = (evt) => {
  let message = {
    type  : 'Scroll',
    source: 'Window',
    url   : window.document.URL,
    clientTimestamp: Date.now(),
    x_scr : document.scrollX,
    y_scr : document.scrollY,
    w_win : window.innerWidth,
    h_win : window.innerHeight,
    w_doc : document.body.clientWidth,
    h_doc : document.body.clientHeight
  };

  window.dispatchEvent(new CustomEvent('leticia-track', { detail: message }));
  //console.log(message.type, `X: ${message.x_scr}`, `Y: ${message.y_scr}`, `TS: ${message.clientTimestamp}`);
}

export const bindTracker = () => {
  window.addEventListener('scroll', throttle(scroll, 250));
}

export const unbindTracker = () => {
  window.removeEventListener('scroll', throttle(scroll, 250));
}