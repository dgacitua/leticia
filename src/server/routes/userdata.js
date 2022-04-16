import express from 'express';

import { consoleError } from '../utils';

import UserData from '../models/UserData';

const router = express.Router();

const loadUserData = async (request, response, next) => {
  try {
    const username = request.params.username;
    const userdata = await UserData.findOne({ username: username });

    response.status(200).send(userdata);
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while loading UserData', errorObj: err });
  }
}

const saveUserData = async (request, response, next) => {
  try {
    const userdata = request.body;
    const username = request.params.username;

    await UserData.findOneAndUpdate({ username: username }, userdata, { new: true, upsert: true });

    response.status(200).send({ status: 'UserData Saved!', timestamp: Date.now(), username: username });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while saving UserData', errorObj: err });
  }
}

router.get('/:username', loadUserData);
router.post('/:username', saveUserData);

export default router;