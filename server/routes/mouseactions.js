import express from 'express';

import { consoleError } from '../utils';

import MouseAction from '../models/MouseAction';

const router = express.Router();

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

router.post('/', storeMouseAction);

export default router;