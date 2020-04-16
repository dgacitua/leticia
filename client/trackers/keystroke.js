const keydown = (evt) => {
  let message = {
    type      : 'KeyDown',
    source    : 'Window',
    url       : window.document.URL,
    clientTimestamp : Date.now(),
    which     : evt.which,
    keyCode   : evt.keyCode,
    charCode  : evt.charCode,
    key       : evt.key
  };

  window.dispatchEvent(new CustomEvent('leticia-track', { detail: message }));
  //console.log(message.type, `KEY: ${message.key}`, `TS: ${message.clientTimestamp}`);
}

const keyup = (evt) => {
  let message = {
    type      : 'KeyUp',
    source    : 'Window',
    url       : window.document.URL,
    clientTimestamp : Date.now(),
    which     : evt.which,
    keyCode   : evt.keyCode,
    charCode  : evt.charCode,
    key       : evt.key
  };

  window.dispatchEvent(new CustomEvent('leticia-track', { detail: message }));
  //console.log(message.type, `KEY: ${message.key}`, `TS: ${message.clientTimestamp}`);
}

const keypress = (evt) =>  {
  let message = {
    type      : 'KeyPress',
    source    : 'Window',
    url       : window.document.URL,
    clientTimestamp : Date.now(),
    which     : evt.which,
    keyCode   : evt.keyCode,
    charCode  : evt.charCode,
    key       : evt.key
  };

  window.dispatchEvent(new CustomEvent('leticia-track', { detail: message }));
  //console.log(message.type, `KEY: ${message.key}`, `TS: ${message.clientTimestamp}`);
}

export const bindTracker = () => {
  window.addEventListener('keydown' , keydown);
  window.addEventListener('keyup' , keyup);
  window.addEventListener('keypress' , keypress);
  console.log('Keystroke Tracker ON!');
};

export const unbindTracker = () => {
  window.removeEventListener('keydown' , keydown);
  window.removeEventListener('keyup' , keyup);
  window.removeEventListener('keypress' , keypress);
  console.log('Keystroke Tracker OFF!');
};