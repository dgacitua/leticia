import express from 'express';

import { consoleError } from '../utils';

import Form from '../models/Forms';
import Question from '../models/Questions';

const router = express.Router();

const getForm = async (request, response, next) => {
  try {
    const { id } = request.query;
    const form = await Form.findOne({ formId: id });
    
    const fn1 = async (arr) => Promise.all(arr.map(el => Question.findOne({ questionId: el })));
    const res = await fn1(form.questions);

    response.status(200).send(res);
  }
  catch (err) {
    consoleError(err);
    response.status(500).send(err);
  }
}

router.get('/', getForm);

export default router;