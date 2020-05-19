import express from 'express';

import { consoleError } from '../utils';

import Demographic from '../models/Demographic';

const router = express.Router();

const storeDemographic = async (request, response, next) => {
  try {
    let answer = request.body;
    answer.serverTimestamp = Date.now();
    // answer.userId = request.user._id; // TODO Login

    await Demographic.create(answer);
    
    response.status(200).send({ status: 'Demographic Saved!', timestamp: answer.serverTimestamp });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while storing Answers', errorObj: err });
  }
}

router.post('/', storeDemographic);

export default router;