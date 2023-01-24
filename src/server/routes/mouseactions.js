import express from 'express';

import { consoleError } from '../utils.js';

import MouseAction from '../models/MouseAction.js';

const router = express.Router();

/**
 * @openapi
 * 
 * /mouseactions:
 *    post:
 *      summary: Store a mouse action
 *      description: Store in database a mouse action made by the user.
 *      tags: [UserActions]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  description: Username of the mouse action sender
 *                  type: string
 *                type:
 *                  description: Type of mouse actions (e.g. `MouseMovement`, `MouseClick`, `MouseEnter`)
 *                  type: string
 *                source:
 *                  description: Source stage of the mouse action (e.g. `Search`, `QueryPlanning`, `TypingTest`)
 *                  type: string
 *                url:
 *                  description: Current URL in the browser
 *                  type: string
 *                clientTimestamp:
 *                  description: Timestamp in milliseconds (from the Epoch) when the keystroke is generated, the function `Date.now()` can be used in client-side Javascript to get the timestamp
 *                  type: integer
 *                x_win:
 *                  description: Horizontal position (in pixels) based on the browser's window
 *                  type: integer
 *                y_win:
 *                  description: Vertical position (in pixels) based on the browser's window
 *                  type: integer
 *                w_win:
 *                  description: Width (in pixels) of the browser's window
 *                  type: integer
 *                h_win:
 *                  description: Height (in pixels) of the browser's window
 *                  type: integer
 *                x_doc:
 *                  description: Horizontal position (in pixels) based on the document's size
 *                  type: integer
 *                y_doc:
 *                  description: Vertical position (in pixels) based on the document's size
 *                  type: integer
 *                w_doc:
 *                  description: Width (in pixels) of the document
 *                  type: integer
 *                h_doc:
 *                  description: Height (in pixels) of the document
 *                  type: integer
 *            example:
 *              username: befufonike
 *              type: MouseMovement
 *              source: Search
 *              url: http://localhost:3000/extended-challenge/search?task=task01
 *              clientTimestamp: 1619753821259
 *              x_win: 552
 *              y_win: 137
 *              w_win: 1294
 *              h_win: 669
 *              x_doc: 552
 *              y_doc: 137
 *              w_doc: 1310
 *              h_doc: 1486
 *      responses:
 *        200:
 *          description: Returns store mouse action result
 *        500:
 *          description: Error while storing mouse action
 *  
 */
const storeMouseAction = async (request, response, next) => {
  try {
    let mouseAction = request.body;
    await MouseAction.create(mouseAction);

    response.status(200).send({ status: 'Mouse Action Saved!', timestamp: Date.now(), content: mouseAction });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while storing Mouse Action', errorObj: err });
  }
}

/**
 * @openapi
 * 
 * /mouseactions/buffer:
 *    post:
 *      summary: Store a mouse action buffer
 *      description: Store in database a buffer/array of mouse actions made by the user.
 *      tags: [UserActions]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              description: JSON object array with the user made mouse actions
 *              items:
 *                type: object
 *                properties:
 *                  username:
 *                    description: Username of the mouse action sender
 *                    type: string
 *                  type:
 *                    description: Type of mouse actions (e.g. `MouseMovement`, `MouseClick`, `MouseEnter`)
 *                    type: string
 *                  source:
 *                    description: Source stage of the mouse action (e.g. `Search`, `QueryPlanning`, `TypingTest`)
 *                    type: string
 *                  url:
 *                    description: Current URL in the browser
 *                    type: string
 *                  clientTimestamp:
 *                    description: Timestamp in milliseconds (from the Epoch) when the keystroke is generated, the function `Date.now()` can be used in client-side Javascript to get the timestamp
 *                    type: integer
 *                  x_win:
 *                    description: Horizontal position (in pixels) based on the browser's window
 *                    type: integer
 *                  y_win:
 *                    description: Vertical position (in pixels) based on the browser's window
 *                    type: integer
 *                  w_win:
 *                    description: Width (in pixels) of the browser's window
 *                    type: integer
 *                  h_win:
 *                    description: Height (in pixels) of the browser's window
 *                    type: integer
 *                  x_doc:
 *                    description: Horizontal position (in pixels) based on the document's size
 *                    type: integer
 *                  y_doc:
 *                    description: Vertical position (in pixels) based on the document's size
 *                    type: integer
 *                  w_doc:
 *                    description: Width (in pixels) of the document
 *                    type: integer
 *                  h_doc:
 *                    description: Height (in pixels) of the document
 *                    type: integer
 *            example:
 *              - username: befufonike
 *                type: MouseMovement
 *                source: Search
 *                url: http://localhost:3000/extended-challenge/search?task=task01
 *                clientTimestamp: 1619753821259
 *                x_win: 552
 *                y_win: 137
 *                w_win: 1294
 *                h_win: 669
 *                x_doc: 552
 *                y_doc: 137
 *                w_doc: 1310
 *                h_doc: 1486
 *      responses:
 *        200:
 *          description: Returns store mouse action buffer result
 *        500:
 *          description: Error while storing mouse action buffer
 * 
 */
const storeMouseBuffer = async (request, response, next) => {
  try {
    let mouseBuffer = request.body;
    
    mouseBuffer.forEach(async mact => {
      await MouseAction.create(mact);  
    });

    response.status(200).send({ status: 'Mouse Buffer Saved!', timestamp: Date.now(), count: mouseBuffer.length });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while storing Mouse Buffer', errorObj: err });
  }
}

router.post('/buffer', storeMouseBuffer);
router.post('/', storeMouseAction);

export default router;