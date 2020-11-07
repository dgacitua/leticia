import express from 'express';

import { consoleError } from '../utils';

import SessionFlow from '../models/SessionFlows';

const router = express.Router();

const getSessionFlow = async (request, response, next) => {
  try {
    const id = request.query.id || 'short';
    const session = await SessionFlow.findOne({ sessionFlowId: id });

    response.status(200).send(session);
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while fetching SessionFlow', errorObj: err });
  }
}

router.get('/', getSessionFlow);

export default router;