import Keystroke from './models/Keystroke';
import MouseAction from './models/MouseAction';
import ScrollAction from './models/ScrollAction';

export const redirectInteraction = (message) => {
  let msg = JSON.parse(message);
  msg.serverTimestamp = Date.now();

  if (msg.type==='KeyDown' || msg.type==='KeyUp' || msg.type==='KeyPress') {
    Keystroke.create(msg)
      .then((res) => {
        console.log(`[Keystroke]`, `TYPE: ${msg.type}`, `TS: ${msg.clientTimestamp}`);
      })
      .catch((err) => {
        console.warn(`[Keystroke] NotRegistered`, `TYPE: ${msg.type}`, `TS: ${msg.clientTimestamp}`);
      });
  }
  else if (msg.type==='MouseClick' || msg.type==='MouseMovement') {
    MouseAction.create(msg)
      .then((res) => {
        console.log(`[MouseAction]`, `TYPE: ${msg.type}`, `TS: ${msg.clientTimestamp}`);
      })
      .catch((err) => {
        console.warn(`[MouseAction] NotRegistered`, `TYPE: ${msg.type}`, `TS: ${msg.clientTimestamp}`);
      });
  }
  else if (msg.type==='Scroll') {
    ScrollAction.create(msg)
      .then((res) => {
        console.log(`[ScrollAction]`, `TYPE: ${msg.type}`, `TS: ${msg.clientTimestamp}`);
      })
      .catch((err) => {
        console.warn(`[ScrollAction] NotRegistered`, `TYPE: ${msg.type}`, `TS: ${msg.clientTimestamp}`);
      });
  }
  else {
    console.log(`[InvalidInputInteraction]`, `TS: ${msg.serverTimestamp}`);
  }
}