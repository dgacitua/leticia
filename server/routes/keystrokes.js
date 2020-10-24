import express from 'express';

import { consoleError } from '../utils';

import Keystroke from '../models/Keystroke';

const router = express.Router();

const storeKeystrokeBuffer = async (request, response, next) => {
  try {
    let keystrokeBuffer = request.body;
    
    keystrokeBuffer.forEach(async ks => {
      await Keystroke.create(ks);  
    });

    response.status(200).send({ status: 'Keystroke Buffer Saved!', timestamp: Date.now(), content: keystrokeBuffer });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while storing Keystroke Buffer', errorObj: err });
  }
}

router.post('/', storeKeystrokeBuffer);

export default router;