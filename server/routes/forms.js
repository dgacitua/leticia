import express from 'express';

import { consoleError } from '../utils';

import Form from '../models/Form';
import Question from '../models/Question';

const router = express.Router();

const getForm = async (request, response, next) => {
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

router.get('/:id', getForm);

export default router;