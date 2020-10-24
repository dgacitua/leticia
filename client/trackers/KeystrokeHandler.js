class KeystrokeHandler {
  constructor(handlerId) {
    this.handlerId = handlerId;
  }

  keydown(evt) {
    let message = {
      type      : 'KeyDown',
      source    : 'Window',
      target    : evt.target.id,
      url       : window.document.URL,
      clientTimestamp : Date.now(),
      which     : evt.which,
      keyCode   : evt.keyCode,
      charCode  : evt.charCode,
      key       : evt.key,
      char      : evt.char
    };

    console.log(message.type, `TRG: ${message.target}`, `KEY: ${message.key}`, `TS: ${message.clientTimestamp}`);
    return message;
  }

  keyup(evt) {
    let message = {
      type      : 'KeyUp',
      source    : 'Window',
      url       : window.document.URL,
      target    : evt.target.id,
      clientTimestamp : Date.now(),
      which     : evt.which,
      keyCode   : evt.keyCode,
      charCode  : evt.charCode,
      key       : evt.key,
      char      : evt.char
    };

    console.log(message.type, `TRG: ${message.target}`, `KEY: ${message.key}`, `TS: ${message.clientTimestamp}`);
    return message;
  }

  /* DEPRECATED */
  keypress(evt) {
    let message = {
      type      : 'KeyPress',
      source    : 'Window',
      target    : evt.target.id,
      url       : window.document.URL,
      clientTimestamp : Date.now(),
      which     : evt.which,
      keyCode   : evt.keyCode,
      charCode  : evt.charCode,
      key       : evt.key,
      char      : evt.char
    };

    console.log(message.type, `TRG: ${message.target}`, `KEY: ${message.key}`, `TS: ${message.clientTimestamp}`);
    return message;
  }
}

export default KeystrokeHandler;