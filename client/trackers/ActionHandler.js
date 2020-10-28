class ActionHandler {
  constructor(handlerId) {
    this.handlerId = handlerId;
  }

  focus(evt) {
    let message = {
      type   : 'QueryFocus',
      source : this.handlerId,
      url    : window.document.URL,
      clientTimestamp: Date.now(),
      details: {
        target: evt.target.id,
        textboxName: evt.target.name
      }
    };

    return message;
  }

  blur(evt) {
    let message = {
      type   : 'QueryBlur',
      source : this.handlerId,
      url    : window.document.URL,
      clientTimestamp: Date.now(),
      details: {
        target: evt.target.id,
        textboxName: evt.target.name
      }
    };

    return message;
  }
}

export default ActionHandler;