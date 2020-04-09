function keydown(evt) {
  let message = {
    type      : 'KeyDown',
    source    : 'Window',
    url       : window.document.URL,
    timestamp : Date.now(),
    which     : evt.which,
    keyCode   : evt.keyCode,
    charCode  : evt.charCode,
    key       : evt.key
  };
}

function keyup(evt) {
  let message = {
    type      : 'KeyUp',
    source    : 'Window',
    url       : window.document.URL,
    timestamp : Date.now(),
    which     : evt.which,
    keyCode   : evt.keyCode,
    charCode  : evt.charCode,
    key       : evt.key
    // chr: evt.key
  };
}

function keypress(evt) {
  let message = {
    type      : 'KeyPress',
    source    : 'Window',
    url       : window.document.URL,
    timestamp : Date.now(),
    which     : evt.which,
    keyCode   : evt.keyCode,
    charCode  : evt.charCode,
    key       : evt.key
    // chr: evt.key
  };
}

window.addEventListener('keydown' , keydown);
window.addEventListener('keyup' , keyup);
window.addEventListener('keypress' , keypress);