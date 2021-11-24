import express from 'express';

import { consoleError } from '../utils';

import SessionFlow from '../models/SessionFlow';

const router = express.Router();

/**
 * @openapi
 * 
 * tags:
 *   name: Flows
 *   description: LETICIA's Session Flow Builder
 * 
 */

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

/**
 * @openapi
 * 
 * /flows/{flowId}:
 *    get:
 *      summary: Get one session flow (by ID)
 *      description: Given a session flow ID, this operation returns the respective session flow object from database.
 *      tags: [Flows]
 *      parameters:
 *        - in: path
 *          name: flowId
 *          description: Session Flow ID
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Returns session flow object
 *        500:
 *          description: Error while getting session flow
 *
 */
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

/**
 * @openapi
 * 
 * /flows:
 *    get:
 *      summary: Get all session flows
 *      description: This operation returns all session flows from database.
 *      tags: [Flows]
 *      responses:
 *        200:
 *          description: Returns all session flow objects
 *        500:
 *          description: Error while getting all session flows
 *
 */
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

/**
 * @openapi
 * 
 * /flows/{flowId}:
 *    delete:
 *      summary: Delete one session flow (by ID)
 *      description: Given a session flow ID, this operation deletes the respective session flow object from database.
 *      tags: [Flows]
 *      parameters:
 *        - in: path
 *          name: taskId
 *          description: Session Flow ID
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Returns delete session flow operation status
 *        500:
 *          description: Error while deleting session flow
 *
 */
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

/**
 * @openapi
 * 
 * /flows:
 *    post:
 *      summary: Add a new session flow
 *      description: Add a new session flow object to database. Session flows are ordered lists of stages that the user must complete to progress in the experiment.
 *      tags: [Flows]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                sessionFlowId:
 *                  description: Search task identification string (must be unique among all tasks)
 *                  type: string
 *                stages:
 *                  type: array
 *                  items:
 *                    type: object
 *                    description: A list of stages that are part of this session flow
 *            example:
 *              sessionFlowId: flow01
 *              stages: TODO FIX
 *      responses:
 *        200:
 *          description: Returns added task
 *        500:
 *          description: Error while adding task
 *
 */
const addSessionFlow = async (request, response, next) => {
  try {
    let sf = request.body;
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