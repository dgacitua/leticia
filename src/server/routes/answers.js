import express from 'express';

import { consoleError } from '../utils';

import Answer from '../models/Answer';

const router = express.Router();

/**
 * @openapi
 * 
 * /answers:
 *    post:
 *      summary: Store a form answer
 *      description: Store in database a user response to a form.
 *      tags: [UserActions]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  description: Username of the user answering the form
 *                  type: string
 *                formId:
 *                  description: ID of the form answered by the user
 *                  type: string
 *                taskId:
 *                  description: ID of the performed task when the user response is sent
 *                  type: string
 *                clientTimestamp:
 *                  description: Timestamp in milliseconds (from the Epoch) when the answer is sent, the function `Date.now()` can be used in client-side Javascript to get the timestamp
 *                  type: integer
 *                answers:
 *                  description: JSON object array with the user answers
 *                  type: array
 *                  items:
 *                    type: object
 *            example:
 *              username: uvaxulaxot
 *              formId: pretask
 *              taskId: task11
 *              clientTimestamp: 1619565217257
 *              answers:
 *                - questionId: pretask1
 *                  answer: 4
 *                - questionId: pretask2
 *                  answer: 5
 *                - questionId: pretask3
 *                  answer: 1
 *      responses:
 *        200:
 *          description: Returns store answer result
 *        500:
 *          description: Error while storing answer
 *
 */
const storeAnswer = async (request, response, next) => {
  try {
    let answer = request.body;
    answer.serverTimestamp = Date.now();

    await Answer.create(answer);
    
    response.status(200).send({ status: 'Answer Saved!', timestamp: answer.serverTimestamp });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while storing Answers', errorObj: err });
  }
}

router.post('/', storeAnswer);

export default router;