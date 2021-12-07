import express from 'express';

import { consoleError } from '../utils';

import Demographic from '../models/Demographic';

const router = express.Router();

/**
 * @openapi
 * 
 * /demographic:
 *    post:
 *      summary: Store a demographic survey response
 *      description: Store in database a demographic survey response.
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
 *                type:
 *                  description: Type of form answered by the user
 *                  type: string
 *                clientTimestamp:
 *                  description: Timestamp in milliseconds (from the Epoch) when the answer is sent, the function `Date.now()` can be used in client-side Javascript to get the timestamp
 *                  type: integer
 *                answers:
 *                  type: array
 *                  description: JSON object array with the user answers
 *                  items:
 *                    type: object
 *            example:
 *              username: befufonike
 *              type: Demographic
 *              clientTimestamp: 1619753228566
 *              answers:
 *                - question: sex
 *                  answer: Female
 *                - question: age
 *                  answer: 32
 *                - question: Handedness
 *                  answer: Left
 *                - question: language
 *                  answer: Spanish
 *                - question: keyboardLayout
 *                  answer: es-LA
 *                - question: searchEngine
 *                  answer: Google
 *                - question: education
 *                  answer: PhD
 *                - question: career
 *                  answer: PhD in Computer Science
 *                - question: isStudent
 *                  answer: Yes
 *                - question: hasDyslexia
 *                  answer: No
 *                - question: hasColorBlindness
 *                  answer: No
 *                - question: country
 *                  answer: Chile
 *                - question: region
 *                  answer: Metropolitana de Santiago
 *                - question: city
 *                  answer: Estación Central
 *      responses:
 *        200:
 *          description: Returns store demographic result
 *        500:
 *          description: Error while storing demographic
 *
 */
const storeDemographic = async (request, response, next) => {
  try {
    let answer = request.body;
    answer.serverTimestamp = Date.now();

    await Demographic.create(answer);
    
    response.status(200).send({ status: 'Demographic Saved!', timestamp: answer.serverTimestamp });
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while storing Answers', errorObj: err });
  }
}

router.post('/', storeDemographic);

export default router;