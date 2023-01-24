import Mongoose from 'mongoose';

import { dataDb, userDb } from '../db.js';

const answerSchema = Mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  formId: {
    type: String,
    required: true
  },
  taskId: {
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
  answers: {
    type: [ Object ],
    required: true
  }
}, { strict: false });

const Answer = dataDb.model('Answer', answerSchema);

export default Answer;