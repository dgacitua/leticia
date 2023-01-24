import express from 'express';

import { consoleError } from '../utils.js';

import Consent from '../models/Consent.js';

const router = express.Router();

const storeConsent = async (request, response, next) => {
  try {
    let consent = request.body;
    consent.serverTimestamp = Date.now();

    await Consent.create(consent);
    
    response.status(200).send({ status: 'Consent Saved!', timestamp: consent.serverTimestamp });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while storing Consents', errorObj: err });
  }
}

router.post('/', storeConsent);

export default router;