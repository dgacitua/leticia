import Mongoose from 'mongoose';

import { dataDb, userDb } from '../db';

const taskRequestSchema = Mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  clientTimestamp: {
    type: Number,
    required: true
  },
  serverTimestamp: {
    type: Number,
    required: true
  },
  taskRequestNumber: {
    type: Number,
    required: true
  },
  taskOrder: {
    type: [ String ],
    required: true
  }
});

const TaskRequest = dataDb.model('TaskRequest', taskRequestSchema);

export default TaskRequest;