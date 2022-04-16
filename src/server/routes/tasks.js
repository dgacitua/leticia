import express from 'express';

import { consoleLog, consoleError, shuffleArray, permute, roundRobinAllocation } from '../utils';

import SearchTask from '../models/SearchTask';
import TaskRequest from '../models/TaskRequest';
import ServerConfig from '../models/ServerConfig';

const router = express.Router();

/**
 * @openapi
 * 
 * tags:
 *   name: Tasks
 *   description: LETICIA's Search Task Builder
 * 
 */

/**
 * @openapi
 * 
 * /tasks/{taskId}:
 *    get:
 *      summary: Get one task (by ID)
 *      description: Given a task ID, this operation returns the respective task object from database.
 *      tags: [Tasks]
 *      parameters:
 *        - in: path
 *          name: taskId
 *          description: Task ID
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Returns task object
 *        500:
 *          description: Error while getting task
 *
 */
const getTask = async (request, response, next) => {
  try {
    const id = request.params.id || '';
    const task = await SearchTask.findOne({ searchTaskId: id });
    
    response.status(200).send(task);
  }
  catch (err) {
    consoleError({ statusCode: 500, errorMsg: 'Error while getting Tasks', errorObj: err });
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while getting Tasks', errorObj: err });
  }
}

/**
 * @openapi
 * 
 * /tasks:
 *    get:
 *      summary: Get all tasks
 *      description: This operation returns all tasks from database.
 *      tags: [Tasks]
 *      responses:
 *        200:
 *          description: Returns all task objects
 *        500:
 *          description: Error while getting all tasks
 *
 */
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

/**
 * @openapi
 * 
 * /tasks/shuffle:
 *    get:
 *      summary: Get shuffled tasks for an user
 *      description: This operation shuffles the available search tasks for a user using a Round-Robin assignment for balanced distribution. The task order request is saved in database.
 *      tags: [Tasks]
 *      parameters:
 *        - in: query
 *          name: num
 *          description: Number of tasks to shuffle (default is 3)
 *          schema:
 *            type: integer
 *        - in: query
 *          name: username
 *          description: Requester username (default is "Anonymous")
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Returns all task objects
 *        500:
 *          description: Error while getting all tasks
 *
 */
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

/**
 * @openapi
 * 
 * /tasks/{taskId}:
 *    delete:
 *      summary: Delete one task (by ID)
 *      description: Given a task ID, this operation deletes the respective task object from database.
 *      tags: [Tasks]
 *      parameters:
 *        - in: path
 *          name: taskId
 *          description: Task ID
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Returns delete task operation status
 *        500:
 *          description: Error while deleting task
 *
 */
const deleteSearchTask = async (request, response, next) => {
  try {
    const { id } = request.params;
    const res = await SearchTask.deleteOne({ sessionFlowId: id });

    response.status(200).send(res);
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while deleting SearchTask', errorObj: err });
  }
}

/**
 * @openapi
 * 
 * /tasks:
 *    post:
 *      summary: Add a new search task
 *      description: Add a new search task object to database. Search tasks are objectives to complete by the users by doing search queries.  
 *      tags: [Tasks]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                searchTaskId:
 *                  description: Search task identification string (must be unique among all tasks)
 *                  type: string
 *                title:
 *                  description: Title of the search task
 *                  type: string
 *                description:
 *                  description: Description of the search task
 *                  type: string
 *            example:
 *              searchTaskId: task01
 *              title: Special flag
 *              description: Every national flag in the world shares a common geometric characteristic, except for one country. Which country is it?
 *      responses:
 *        200:
 *          description: Returns added task
 *        500:
 *          description: Error while adding task
 *
 */
const addSearchTask = async (request, response, next) => {
  try {
    let st = request.body;
    const res = await SearchTask.create(st);

    response.status(200).send(res);
  }
  catch (err) {
    consoleError(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Error while adding SearchTask', errorObj: err });
  }
}

router.get('/shuffle', getShuffledTasks);
router.get('/:id', getTask);
router.get('/', getAllTasks);
router.delete('/:id', deleteSearchTask);
router.post('/', addSearchTask);


export default router;