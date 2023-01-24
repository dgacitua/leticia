import express from 'express';

import { consoleError } from '../utils.js';

import Question from '../models/Question.js';

const router = express.Router();

/**
 * @openapi
 * 
 * tags:
 *   name: Questions
 *   description: LETICIA's Question Builder
 * 
 */

/**
 * @openapi
 * 
 * /questions/{questionId}:
 *    get:
 *      summary: Get one question (by ID)
 *      description: Given a question ID, this operation returns the respective question object from database.
 *      tags: [Questions]
 *      parameters:
 *        - in: path
 *          name: questionId
 *          description: Question ID
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Returns get question operation status
 *        500:
 *          description: Error while getting question
 *
 */
const getQuestion = async (request, response, next) => {
  try {
    const { id } = request.params;
    const res = await Question.findOne({ questionId: id });

    response.status(200).send(res);
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while getting Question', errorObj: err });
  }
}

/**
 * @openapi
 * 
 * /questions:
 *    get:
 *      summary: Get all questions
 *      description: This operation returns all questions from database.
 *      tags: [Questions]
 *      responses:
 *        200:
 *          description: Returns get all questions operation status
 *        500:
 *          description: Error while getting all questions
 *
 */
const getAllQuestions = async (request, response, next) => {
  try {
    const res = await Question.find();
    response.status(200).send(res);
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while getting Questions', errorObj: err });
  }
}

/**
 * @openapi
 * 
 * /questions/{questionId}:
 *    delete:
 *      summary: Delete one question (by ID)
 *      description: Given a question ID, this operation deletes the respective question object from database.
 *      tags: [Questions]
 *      parameters:
 *        - in: path
 *          name: questionId
 *          description: Question ID
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Returns delete question operation status
 *        500:
 *          description: Error while deleting question
 *
 */
const deleteQuestion = async (request, response, next) => {
  try {
    const { id } = request.params;
    const res = await Question.deleteOne({ questionId: id });

    response.status(200).send(res);
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while deleting Question', errorObj: err });
  }
}

/**
 * @openapi
 * 
 * /questions:
 *    post:
 *      summary: Add a new question
 *      description: Add a new question object to database. Required fields are `questionId`, `type` and `required`. Other fields depend of the question type. See "Experiment Assets" section of LETICIA's documentation to get more info about other question fields.
 *      tags: [Questions]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                questionId:
 *                  description: Question identification string (must be unique among all questions)
 *                  type: string
 *                type:
 *                  description: Question type
 *                  type: string
 *                required:
 *                  description: Value that indicates if question must be mandatory answered in the form
 *                  type: boolean
 *            example:
 *              questionId: q01
 *              type: input
 *              required: true
 *              title: Who is the author of this blog post?
 *              hint: Look at the post properties
 *      responses:
 *        200:
 *          description: Returns added question
 *        500:
 *          description: Error while adding question
 *
 */
const addQuestion = async (request, response, next) => {
  try {
    let question = request.body;
    const res = await Question.create(question);

    response.status(200).send(res);
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while adding Question', errorObj: err });
  }
}

router.get('/:id', getQuestion);
router.get('/', getAllQuestions);
router.delete('/:id', deleteQuestion);
router.post('/', addQuestion);

export default router;