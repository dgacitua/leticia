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

  pagination(evt, page = 0) {
    let message = {
      type   : 'Pagination',
      source : this.handlerId,
      url    : window.document.URL,
      clientTimestamp: Date.now(),
      details: {
        page: page
      }
    };

    return message;
  }

  searchResultClick(evt, doc) {
    let message = {
      type   : 'SearchResultClick',
      source : this.handlerId,
      url    : window.document.URL,
      clientTimestamp: Date.now(),
      details: {
        docId: doc.docId_s,
        title: doc.title_t,
        docUrl: doc.url_s,
        ranking: doc.ranking
      }
    };

    return message;
  }
}

export default ActionHandler;