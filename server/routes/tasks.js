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
    consoleError(err);
    response.status(500).send(err);
  }
}

const getAllTasks = async (request, response, next) => {
  try {
    const tasks = await SearchTask.find();
    response.status(200).send(tasks);
  }
  catch (err) {
    consoleError(err);
    response.status(500).send(err);
  }
}

router.get('/:id', getTask);
router.get('/', getAllTasks);

export default router;