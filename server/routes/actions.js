import express from 'express';

import { consoleError } from '../utils';

import Action from '../models/Action';

const router = express.Router();

/**
 * @openapi
 * 
 * tags:
 *   name: UserActions
 *   description: User actions' storage in LETICIA
 * 
 */

/**
 * @openapi
 * 
 * /actions:
 *    post:
 *      summary: Store a generic user action
 *      description: Store a new generic user action to database.
 *      tags: [UserActions]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  description: Username of the user performing the action
 *                  type: string
 *                source:
 *                  description: Action source or service that emits the action (e.g. Router, FormElement, TypingTest, QueryPlanning, Search)
 *                  type: string
 *                type:
 *                  description: Action type according to the source (e.g. PageEnter, PageExit, QueryFocus, QueryBlur, TypingTestCompleted)
 *                  type: string
 *                url:
 *                  description: Current URL of the user while performing the action
 *                  type: string
 *                clientTimestamp:
 *                  description: Timestamp in milliseconds (from the Epoch) when the action happened, the function `Date.now()` can be used in client-side Javascript to get the timestamp
 *                  type: integer
 *                details:
 *                  description: JSON object with other relevant information about the action
 *                  type: object
 *            example:
 *              username: uvaxulaxot
 *              type: PageEnter
 *              source: Router
 *              url: /consent
 *              clientTimestamp: 1619564804697
 *              details:
 *                path: /consent
 *                fullpath: /consent
 *      responses:
 *        200:
 *          description: Returns store action result
 *        500:
 *          description: Error while storing action
 *
 */
const storeAction = async (request, response, next) => {
  try {
    let action = request.body;
    action.serverTimestamp = Date.now();

    await Action.create(action);
    
    response.status(200).send({ status: 'Action Saved!', timestamp: action.serverTimestamp, type: action.type, source: action.source, message: action });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while storing Actions', errorObj: err });
  }
}

router.post('/', storeAction);

export default router;