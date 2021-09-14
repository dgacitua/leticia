import express from 'express';

import { consoleError } from '../utils';

import Form from '../models/Form';
import Question from '../models/Question';

const router = express.Router();

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

const addForm = async (request, response, next) => {
  try {
    let form = response.body;
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