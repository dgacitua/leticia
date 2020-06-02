import express from 'express';
import UserAgent from 'useragent';

import { consoleError } from '../utils';

import Participant from '../models/Participant';

const router = express.Router();

const storeParticipant = async (request, response, next) => {
  try {
    let participant = request.body;

    let ipAddress = (request.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
      request.connection.remoteAddress || 
      request.socket.remoteAddress || 
      request.connection.socket.remoteAddress;

    let rua = request.get('User-Agent');  // raw user agent
    let oua = UserAgent.parse(rua);       // object user agent
    let browser = oua ? oua.toAgent() : 'undefined';
    let os = oua ? oua.os.toString() : 'undefined';
    let device = oua ? oua.device.toString() : 'undefined';

    participant.ipAddress = ipAddress;
    participant.userAgent = rua;
    participant.browser = browser;
    participant.operatingSystem = os;
    participant.device = device;

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