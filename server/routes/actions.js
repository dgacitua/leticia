import express from 'express';

import { consoleError } from '../utils';

import Action from '../models/Actions';

const router = express.Router();

const storeAction = async (request, response, next) => {
  try {
    let action = request.body;
    action.serverTimestamp = Date.now();
    // action.userId = request.user._id; // TODO Login

    await Action.create(action);
    
    response.status(200).send({ status: 'Action Saved!', timestamp: action.serverTimestamp });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send(err);
  }
}

router.post('/', storeAction);

export default router;