/* DEPRECATED */

import Keystroke from './models/Keystroke.js';
import MouseAction from './models/MouseAction.js';
import ScrollAction from './models/ScrollAction.js';

const VERBOSE_REDIRECT = false;

export const redirectInteraction = (message) => {
  let msg = JSON.parse(message);
  msg.serverTimestamp = Date.now();

  if (msg.type==='KeyDown' || msg.type==='KeyUp' || msg.type==='KeyPress') {
    Keystroke.create(msg)
      .then((res) => {
        if (VERBOSE_REDIRECT) console.log(`[Keystroke]`, `TYPE: ${msg.type}`, `TS: ${msg.clientTimestamp}`);
      })
      .catch((err) => {
        if (VERBOSE_REDIRECT) console.warn(`[Keystroke] NotRegistered`, `TYPE: ${msg.type}`, `TS: ${msg.clientTimestamp}`);
      });
  }
  else if (msg.type==='MouseClick' || msg.type==='MouseMovement') {
    MouseAction.create(msg)
      .then((res) => {
        if (VERBOSE_REDIRECT) console.log(`[MouseAction]`, `TYPE: ${msg.type}`, `TS: ${msg.clientTimestamp}`);
      })
      .catch((err) => {
        if (VERBOSE_REDIRECT) console.warn(`[MouseAction] NotRegistered`, `TYPE: ${msg.type}`, `TS: ${msg.clientTimestamp}`);
      });
  }
  else if (msg.type==='Scroll') {
    ScrollAction.create(msg)
      .then((res) => {
        if (VERBOSE_REDIRECT) console.log(`[ScrollAction]`, `TYPE: ${msg.type}`, `TS: ${msg.clientTimestamp}`);
      })
      .catch((err) => {
        if (VERBOSE_REDIRECT) console.warn(`[ScrollAction] NotRegistered`, `TYPE: ${msg.type}`, `TS: ${msg.clientTimestamp}`);
      });
  }
  else {
    if (VERBOSE_REDIRECT) console.log(`[InvalidInputInteraction]`, `TS: ${msg.serverTimestamp}`);
  }
}