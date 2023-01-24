import express from 'express';

import { consoleError } from '../utils.js';

import UserLog from '../models/UserLog.js';

const router = express.Router();

const storeUserLog = async (request, response, next) => {
  try {
    let userLog = request.body;
    userLog.ipAddress = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    userLog.serverTimestamp = Date.now();

    await UserLog.create(userLog);
    
    response.status(200).send({ status: 'UserLog Saved!', timestamp: userLog.serverTimestamp });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while storing UserLogs', errorObj: err });
  }
}

router.post('/', storeUserLog);

export default router;