import express from 'express';

import { consoleError } from '../utils';

import ScrollAction from '../models/ScrollAction';

const router = express.Router();

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