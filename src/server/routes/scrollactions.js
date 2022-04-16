import express from 'express';

import { consoleError } from '../utils';

import ScrollAction from '../models/ScrollAction';

const router = express.Router();

/**
 * @openapi
 * 
 * /scrollactions:
 *    post:
 *      summary: Store a scroll action
 *      description: Store in database a scroll action made by the user.
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
 *                  description: Type of scroll actions (e.g. `Scroll`)
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
 *                x_scr:
 *                  description: Horizontal position (in pixels) based on the document's size
 *                  type: integer
 *                y_scr:
 *                  description: Vertical position (in pixels) based on the document's size
 *                  type: integer
 *                w_win:
 *                  description: Width (in pixels) of the browser's window
 *                  type: integer
 *                h_win:
 *                  description: Height (in pixels) of the browser's window
 *                  type: integer
 *                w_doc:
 *                  description: Width (in pixels) of the document
 *                  type: integer
 *                h_doc:
 *                  description: Height (in pixels) of the document
 *                  type: integer
 *            example:
 *              username: befufonike
 *              type: Scroll
 *              source: Search
 *              target: input-ks_00
 *              url: http://localhost:3000//extended-challenge/search?q=my%20query&p=1
 *              clientTimestamp: 1619753673547
 *              x_scr: 0
 *              y_scr: 172
 *              w_win: 1294
 *              h_win: 669
 *              w_doc: 1310
 *              h_doc: 1486
 *      responses:
 *        200:
 *          description: Returns store scroll action result
 *        500:
 *          description: Error while storing scroll action
 *  
 */
const storeScrollAction = async (request, response, next) => {
  try {
    let scrollAction = request.body;
    await ScrollAction.create(scrollAction);

    response.status(200).send({ status: 'Scroll Action Saved!', timestamp: Date.now(), content: scrollAction });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while storing Scroll Action', errorObj: err });
  }
}

router.post('/', storeScrollAction);

export default router;