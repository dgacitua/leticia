import express from 'express';

import { consoleError } from '../utils';

import Question from '../models/Question';

const router = express.Router();

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

const addQuestion = async (request, response, next) => {
  try {
    let question = response.body;
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