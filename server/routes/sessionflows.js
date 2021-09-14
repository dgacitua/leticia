import express from 'express';

import { consoleError } from '../utils';

import SessionFlow from '../models/SessionFlow';

const router = express.Router();

const listSessionFlows = async (request, response, next) => {
  try {
    const flows = await SessionFlow.find();
    let res = flows.map(sf => { return sf.sessionFlowId });

    response.status(200).send(res);
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while getting SessionFlows', errorObj: err });
  }
}

const getSessionFlow = async (request, response, next) => {
  try {
    const { id } = request.params;
    const res = await SessionFlow.findOne({ sessionFlowId: id });

    response.status(200).send(res);
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while getting SessionFlow', errorObj: err });
  }
}

const getAllSessionFlows = async (request, response, next) => {
  try {
    const res = await SessionFlow.find();
    response.status(200).send(res);
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while getting SessionFlows', errorObj: err });
  }
}

const deleteSessionFlow = async (request, response, next) => {
  try {
    const { id } = request.params;
    const res = await SessionFlow.deleteOne({ sessionFlowId: id });

    response.status(200).send(res);
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while deleting SessionFlow', errorObj: err });
  }
}

const addSessionFlow = async (request, response, next) => {
  try {
    let sf = response.body;
    const res = await SessionFlow.create(sf);

    response.status(200).send(res);
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while adding SessionFlow', errorObj: err });
  }
}

router.get('/list', listSessionFlows);
router.get('/:id', getSessionFlow);
router.get('/', getAllSessionFlows);
router.delete('/:id', deleteSessionFlow);
router.post('/', addSessionFlow);

export default router;