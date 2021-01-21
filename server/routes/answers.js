import express from 'express';

import { consoleError } from '../utils';

import Answer from '../models/Answer';

const router = express.Router();

const storeAnswer = async (request, response, next) => {
  try {
    let answer = request.body;
    answer.serverTimestamp = Date.now();

    await Answer.create(answer);
    
    response.status(200).send({ status: 'Answer Saved!', timestamp: answer.serverTimestamp });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while storing Answers', errorObj: err });
  }
}

router.post('/', storeAnswer);

export default router;