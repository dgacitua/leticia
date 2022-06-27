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
 *                instructions:
 *                  description: Search task instructions for users
 *                  type: string
 *                stages:
 *                  description: A list of stages that are part of this session flow (as JSON object array)
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      path:
 *                        description: Relative path for the stage in the frontend, check LETICIA's documentation for the complete list of available stages
 *                        type: string
 *                      params:
 *                        description: Optional URL params
 *                        type: string
 *                      timeLimit:
 *                        description: Time limit (in minutes) of the stage, set it to `-1` for no time limit
 *                        type: integer
 *                      stages:
 *                        description: (Optional) If `path` value is a `challenge`, this value is an array of stages that are part of that challenge
 *                        type: array
 *                        items:
 *                          type: object
 *            example:
 *              sessionFlowId: flow01
 *              instructions: "You must enter 3 queries for each one of the 3 search tasks presented. You have 15 minutes to complete the challenge."
 *              stages:
 *                - path: /consent
 *                  timeLimit: -1
 *                - path: /demographic
 *                  timeLimit: -1
 *                - path: /typing-instructions
 *                  timeLimit: -1
 *                - path: /typing
 *                  timeLimit: -1
 *                - path: /instructions
 *                  params: short
 *                  timeLimit: -1
 *                - path: /short-challenge
 *                  timeLimit: 15
 *                - path: /exit-survey
 *                  timeLimit: -1
 *                - path: /end
 *                  timeLimit: -1
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