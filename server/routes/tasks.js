import express from 'express';

import { consoleError } from '../utils';

import SearchTask from '../models/SearchTask';

const router = express.Router();

const getTask = async (request, response, next) => {
  try {
    const { id } = request.params;
    const task = await SearchTask.findOne({ searchTaskId: id });
    
    response.status(200).send(task);
  }
  catch (err) {
    consoleError({ statusCode: 500, errorMsg: 'Error while fetching Tasks', errorObj: err });
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while fetching Tasks', errorObj: err });
  }
}

const getAllTasks = async (request, response, next) => {
  try {
    const tasks = await SearchTask.find();
    response.status(200).send(tasks);
  }
  catch (err) {
    consoleError({ statusCode: 500, errorMsg: 'Error while fetching Tasks', errorObj: err });
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while fetching Tasks', errorObj: err });
  }
}

router.get('/:id', getTask);
router.get('/', getAllTasks);

export default router;