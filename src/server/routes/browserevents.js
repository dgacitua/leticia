import express from 'express';

import { consoleError } from '../utils.js';

import BrowserEvent from '../models/BrowserEvent.js';

const router = express.Router();

/**
 * @openapi
 * 
 * tags:
 *   name: BrowserEvents
 *   description: Browser events' logging on LETICIA
 * 
 */

/**
 * @openapi
 * 
 * /events:
 *    post:
 *      summary: Store a browser event
 *      description: Store in database an event triggered in a browser. This endpoint is intended to store any Javascript event triggered by the frontend that is not already covered with the other endpoints (UserActions mainly).
 *      tags: [BrowserEvents]
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
 *                  description: Source or service that emits the action (e.g. `Router`, `FormElement`, `TypingTest`, `QueryPlanning`, `Search`)
 *                  type: string
 *                type:
 *                  description: Javascript browser event type according to the source (e.g. `submit`, `mousemove`, `mouseclick`, `scroll`, `keydown`, `keyup`)
 *                  type: string
 *                url:
 *                  description: Current URL of the user while triggered the event
 *                  type: string
 *                clientTimestamp:
 *                  description: Timestamp in milliseconds (from the Epoch) when the event happened, the function `Date.now()` can be used in client-side Javascript to get the timestamp
 *                  type: integer
 *                details:
 *                  description: JSON object with any relevant information about the event
 *                  type: object
 *            example:
 *              username: uvaxulaxot
 *              type: submit
 *              source: Search
 *              url: /search
 *              clientTimestamp: 1619564804697
 *              details:
 *                path: /search
 *                fullpath: /search
 *                query: how to use this platform?
 *      responses:
 *        200:
 *          description: Returns store event result
 *        500:
 *          description: Error while storing event
 *
 */
const storeEvent = async (request, response, next) => {
  try {
    let evt = request.body;
    evt.serverTimestamp = Date.now();

    await BrowserEvent.create(evt);
    
    response.status(200).send({ status: 'Event Saved!', timestamp: evt.serverTimestamp, type: evt.type, source: evt.source, message: evt });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while storing Events', errorObj: err });
  }
}

/**
 * @openapi
 * 
 * /events/buffer:
 *    post:
 *      summary: Store a browser event buffer
 *      description: Store in database a buffer/array of events triggered in a browser. This endpoint is intended to store any Javascript event triggered by the frontend that is not already covered with the other endpoints (UserActions mainly).
 *      tags: [BrowserEvents]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              description: JSON object array with the user's browser events
 *              items:
 *                type: object
 *                properties:
 *                  username:
 *                    description: Username of the user performing the action
 *                    type: string
 *                  source:
 *                    description: Source or service that emits the action (e.g. `Router`, `FormElement`, `TypingTest`, `QueryPlanning`, `Search`)
 *                    type: string
 *                  type:
 *                    description: Javascript browser event type according to the source (e.g. `submit`, `mousemove`, `mouseclick`, `scroll`, `keydown`, `keyup`)
 *                    type: string
 *                  url:
 *                    description: Current URL of the user while triggered the event
 *                    type: string
 *                  clientTimestamp:
 *                    description: Timestamp in milliseconds (from the Epoch) when the event happened, the function `Date.now()` can be used in client-side Javascript to get the timestamp
 *                    type: integer
 *                  details:
 *                    description: JSON object with any relevant information about the event
 *                    type: object
 *            example:
 *              - username: uvaxulaxot
 *                type: submit
 *                source: Search
 *                url: /search
 *                clientTimestamp: 1619564804697
 *                details:
 *                  path: /search
 *                  fullpath: /search
 *                  query: how to use this platform?
 *      responses:
 *        200:
 *          description: Returns store event buffer result
 *        500:
 *          description: Error while storing event buffer
 * 
 */
const storeEventBuffer = async (request, response, next) => {
  try {
    let eventBuffer = request.body;
    
    eventBuffer.forEach(async evt => {
      evt.serverTimestamp = Date.now();
      await BrowserEvent.create(evt);  
    });

    response.status(200).send({ status: 'Event Buffer Saved!', timestamp: Date.now(), count: eventBuffer.length });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while storing Mouse Buffer', errorObj: err });
  }
}

router.post('/buffer', storeEventBuffer);
router.post('/', storeEvent);

export default router;