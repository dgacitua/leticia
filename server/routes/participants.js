import express from 'express';

import { consoleError } from '../utils';

import Participant from '../models/Participant';

const router = express.Router();

const storeParticipant = async (request, response, next) => {
  try {
    let participant = request.body;

    await Participant.create(participant);
    
    response.status(200).send({ status: 'Participant Saved!', timestamp: Date.now(), participantData: participant });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while storing Actions', errorObj: err });
  }
}

const updateParticipant = async (request, response, next) => {
  try {
    let userId = request.params.userId;
    let participant = request.body;

    await Participant.updateOne({ userId: userId }, participant);
    
    response.status(200).send({ status: 'Participant Updated!', timestamp: Date.now() });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while storing Actions', errorObj: err });
  }
}

router.post('/', storeParticipant);
router.put('/:userId', updateParticipant);

export default router;