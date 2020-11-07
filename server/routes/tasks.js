import express from 'express';

import { consoleError, shuffleArray } from '../utils';

import SearchTask from '../models/SearchTask';

const router = express.Router();

const getTask = async (request, response, next) => {
  try {
    const id = request.params.id || '';
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

const getShuffledTasks = async (request, response, next) => {
  try {
    const num = request.query.num || 3;
    const username = request.query.username || 'Anonymous';

    const rawTasks = await SearchTask.find();
    const parsedTasks = shuffleArray(rawTasks.slice(0, num));

    // TODO save parsed tasks order

    response.status(200).send(parsedTasks);
  }
  catch (err) {
    consoleError({ statusCode: 500, errorMsg: 'Error while fetching Tasks', errorObj: err });
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while fetching Tasks', errorObj: err });
  }
}

router.get('/', getAllTasks);
router.get('/shuffle', getShuffledTasks);
router.get('/:id', getTask);

export default router;