import { throttle } from 'lodash';

const mouseclick = (evt) => {
  let message = {
    type  : 'MouseClick',
    source: 'Window',
    url   : window.document.URL,
    timestamp: Date.now(),
    x_win : evt.clientX,
    y_win : evt.clientY,
    w_win : window.innerWidth,
    h_win : window.innerHeight,
    x_doc : evt.pageX,
    y_doc : evt.pageY,
    w_doc : document.body.clientWidth,
    h_doc : document.body.clientHeight
  };
  
  window.dispatchEvent(new CustomEvent('leticia-track', { detail: message }));
  //console.log(message.type, `X: ${message.x_win}`, `Y: ${message.y_win}`, `TS: ${message.timestamp}`);
}

const mousemove = (evt) => {
  let message = {
    type  : 'MouseMovement',
    source: 'Window',
    url   : window.document.URL,
    timestamp: Date.now(),
    x_win : evt.clientX,
    y_win : evt.clientY,
    w_win : window.innerWidth,
    h_win : window.innerHeight,
    x_doc : evt.pageX,
    y_doc : evt.pageY,
    w_doc : document.body.clientWidth,
    h_doc : document.body.clientHeight
  };

  window.dispatchEvent(new CustomEvent('leticia-track', { detail: message }));
  //console.log(message.type, `X: ${message.x_win}`, `Y: ${message.y_win}`, `TS: ${message.timestamp}`);
}

export const bindTracker = () => {
  window.addEventListener('click', mouseclick);
  window.addEventListener('mousemove', throttle(mousemove, 250));
}

export const unbindTracker = () => {
  window.removeEventListener('click', mouseclick);
  window.removeEventListener('mousemove', throttle(mousemove, 250));
}