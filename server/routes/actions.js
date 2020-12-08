import express from 'express';

import { consoleError } from '../utils';

import Action from '../models/Actions';

const router = express.Router();

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