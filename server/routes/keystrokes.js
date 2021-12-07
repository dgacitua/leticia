import express from 'express';

import { consoleError } from '../utils';

import Keystroke from '../models/Keystroke';

const router = express.Router();

/**
 * @openapi
 * 
 * /keystrokes:
 *    post:
 *      summary: Store a keystroke buffer
 *      description: Store in database a buffer/array of keystrokes made by the user.
 *      tags: [UserActions]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              description: JSON object array with the user made keystrokes
 *              items:
 *                type: object
 *                properties:
 *                  username:
 *                    description: Username of the keystroke sender
 *                    type: string
 *                  type:
 *                    description: Type of keystroke (e.g. `KeyDown`, `KeyUp`, `KeyPress`)
 *                    type: string
 *                  source:
 *                    description: Source stage of the keystroke (e.g. `Search`, `QueryPlanning`, `TypingTest`)
 *                    type: string
 *                  target:
 *                    description: HTML Component ID where the keystoke is generated
 *                    type: string
 *                  url:
 *                    description: Current URL in the browser
 *                    type: string
 *                  clientTimestamp:
 *                    description: Timestamp in milliseconds (from the Epoch) when the keystroke is generated, the function `Date.now()` can be used in client-side Javascript to get the timestamp
 *                    type: integer
 *                  which:
 *                    description: Value of `which` variable from the Javascript keystroke event
 *                    type: integer
 *                  keyCode:
 *                    description: Value of `keyCode` variable from the Javascript keystroke event
 *                    type: integer
 *                  charCode:
 *                    description: Value of `charCode` variable from the Javascript keystroke event
 *                    type: integer
 *                  key:
 *                    description: Value of `key` variable from the Javascript keystroke event
 *                    type: string
 *                  char:
 *                    description: Value of `char` variable from the Javascript keystroke event
 *                    type: string
 *            example:
 *              - username: befufonike
 *                type: KeyDown
 *                source: TypingTest
 *                target: input-ks_00
 *                url: http://localhost:3000/typing
 *                clientTimestamp: 1619753246906
 *                which: 78
 *                keyCode: 78
 *                charCode: 0
 *                key: n
 *      responses:
 *        200:
 *          description: Returns store keystroke buffer result
 *        500:
 *          description: Error while storing keystroke buffer
 */
const storeKeystrokeBuffer = async (request, response, next) => {
  try {
    let keystrokeBuffer = request.body;
    
    keystrokeBuffer.forEach(async ks => {
      await Keystroke.create(ks);  
    });

    response.status(200).send({ status: 'Keystroke Buffer Saved!', timestamp: Date.now(), content: keystrokeBuffer });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while storing Keystroke Buffer', errorObj: err });
  }
}

router.post('/', storeKeystrokeBuffer);

export default router;