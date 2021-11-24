import express from 'express';

import { consoleError, consoleLog } from '../utils';

import Form from '../models/Form';
import Question from '../models/Question';

const router = express.Router();

/**
 * @openapi
 * 
 * tags:
 *   name: Forms
 *   description: LETICIA's Form Builder
 * 
 */

/**
 * @openapi
 * 
 * /forms/fetch/{formId}:
 *    get:
 *      summary: Fetch a form (by ID) and its questions
 *      description: Given a form ID, this operation returns the respective form and its associated questions.
 *      tags: [Forms]
 *      parameters:
 *        - in: path
 *          name: formId
 *          description: Form ID
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Returns fetch form operation status
 *        500:
 *          description: Error while fetching form
 *
 */
const fetchForm = async (request, response, next) => {
  try {
    const { id } = request.params;
    const form = await Form.findOne({ formId: id });
    
    const fn1 = async (arr) => Promise.all(arr.map(el => Question.findOne({ questionId: el })));
    const res = await fn1(form.questions);

    response.status(200).send(res);
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while fetching Forms', errorObj: err });
  }
}

/**
 * @openapi
 * 
 * /forms/{formId}:
 *    get:
 *      summary: Get one form (by ID)
 *      description: Given a form ID, this operation returns the respective form object from database.
 *      tags: [Forms]
 *      parameters:
 *        - in: path
 *          name: formId
 *          description: Form ID
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Returns task object
 *        500:
 *          description: Error while getting form
 *
 */
const getForm = async (request, response, next) => {
  try {
    const { id } = request.params;
    const res = await Form.findOne({ formId: id });

    response.status(200).send(res);
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while getting Form', errorObj: err });
  }
}

/**
 * @openapi
 * 
 * /forms:
 *    get:
 *      summary: Get all forms
 *      description: This operation returns all forms from database.
 *      tags: [Forms]
 *      responses:
 *        200:
 *          description: Returns all form objects
 *        500:
 *          description: Error while getting all forms
 *
 */
const getAllForms = async (request, response, next) => {
  try {
    const res = await Form.find();
    response.status(200).send(res);
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while getting Forms', errorObj: err });
  }
}

/**
 * @openapi
 * 
 * /forms/{formId}:
 *    delete:
 *      summary: Delete one form (by ID)
 *      description: Given a form ID, this operation deletes the respective form object from database.
 *      tags: [Forms]
 *      parameters:
 *        - in: path
 *          name: formId
 *          description: Form ID
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Returns delete form operation status
 *        500:
 *          description: Error while deleting form
 *
 */
const deleteForm = async (request, response, next) => {
  try {
    const { id } = request.params;
    const res = await Form.deleteOne({ formId: id });

    response.status(200).send(res);
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while deleting Form', errorObj: err });
  }
}

/**
 * @openapi
 * 
 * /forms:
 *    post:
 *      summary: Add a new form
 *      description: Add a new form object to database.
 *      tags: [Forms]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                formId:
 *                  description: Form identification string (must be unique among all forms)
 *                  type: string
 *                questions:
 *                  type: array
 *                  items:
 *                    type: string
 *                    description: A list of the `questionId`s that are part of this form.
 *            example:
 *              formId: form01
 *              questions: [q01, q02, q03]
 *      responses:
 *        200:
 *          description: Returns added form
 *        500:
 *          description: Error while adding form
 *
 */
const addForm = async (request, response, next) => {
  try {
    let form = request.body;
    const res = await Form.create(form);

    response.status(200).send(res);
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while adding Form', errorObj: err });
  }
}

router.get('/fetch/:id', fetchForm);
router.get('/:id', getForm);
router.get('/', getAllForms);
router.delete('/:id', deleteForm);
router.post('/', addForm);

export default router;