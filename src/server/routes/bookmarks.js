import express from 'express';

import { consoleError } from '../utils.js';

import Bookmark from '../models/Bookmark.js';

const router = express.Router();

/**
 * @openapi
 * 
 * /bookmarks:
 *    post:
 *      summary: Store a bookmark/unbookmark
 *      description: Store in database a bookmark/unbookmark made by the user. A bookmark is a selection of a document considered relevant by the user.
 *      tags: [UserActions]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  description: Username of the user who makes the bookmark
 *                  type: string
 *                action:
 *                  description: If the performed action is either a Bookmark or an Unbookmark
 *                  type: string
 *                task:
 *                  description: ID of the performed task when the user bookmarks/unbookmarks a document
 *                  type: string
 *                docId:
 *                  description: ID of the bookmarked/unbookmarked document
 *                  type: string
 *                url:
 *                  description: Current URL of the user while performing the bookmark/unbookmark
 *                  type: string
 *                clientTimestamp:
 *                  description: Timestamp in milliseconds (from the Epoch) when the document is bookmarked, the function `Date.now()` can be used in client-side Javascript to get the timestamp
 *                  type: integer
 *                details:
 *                  description: JSON object with additional bookmark/unbookmark details
 *                  type: object
 *            example:
 *              username: befufonike
 *              action: Bookmark
 *              task: task1
 *              docId: doc01
 *              clientTimestamp: 1619753805559
 *              url: /page?id=doc01
 *      responses:
 *        200:
 *          description: Returns store bookmark result
 *        500:
 *          description: Error while storing bookmark
 *
 */
const storeBookmark = async (request, response, next) => {
  try {
    let bm = request.body;
    bm.serverTimestamp = Date.now();

    await Bookmark.create(bm);
    
    response.status(200).send({ status: 'Bookmark Saved!', timestamp: bm.serverTimestamp, action: bm.action, task: bm.task, docId: bm.docId });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while storing Bookmark', errorObj: err });
  }
}

router.post('/', storeBookmark);

export default router;