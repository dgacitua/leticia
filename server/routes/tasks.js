import express from 'express';

import { consoleLog, consoleError, shuffleArray, permute, roundRobinAllocation } from '../utils';

import SearchTask from '../models/SearchTask';
import TaskRequest from '../models/TaskRequest';
import ServerConfig from '../models/ServerConfig';

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

    // dgacitua: Old Algorithm (fully random)
    /*
    const rawTasks = await SearchTask.find();
    const parsedTasks = shuffleArray(rawTasks.slice(0, num));
    */

    // dgacitua: New Algorithm (Round-Robin assignment)
    const rawTasks = await SearchTask.find();
    const taskRequestNumber = (await ServerConfig.findOneAndUpdate({ configName: 'TaskRequestCount' }, { $inc: { numberValue: 1 }}, { new: true })).numberValue;
    let t1 = rawTasks.slice(0, num);
    let t2 = permute(t1);
    let t3 = roundRobinAllocation(t2, taskRequestNumber);
    let t4 = t3.map(t => t.searchTaskId);

    let taskRequestLog = {
      username: username,
      clientTimestamp: Date.now(),
      serverTimestamp: Date.now(),
      taskRequestNumber: taskRequestNumber,
      taskOrder: t4
    }

    //consoleLog(taskRequestLog);

    await TaskRequest.create(taskRequestLog);

    response.status(200).send(t3);
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