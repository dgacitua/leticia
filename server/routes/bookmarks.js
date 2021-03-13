import express from 'express';

import { consoleError } from '../utils';

import Bookmark from '../models/Bookmark';

const router = express.Router();

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