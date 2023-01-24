import Mongoose from 'mongoose';

import { dataDb, userDb } from '../db.js';

const querySchema = Mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  queryString: {
    type: String,
    default: ''
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
  details: {
    type: Object,
    required: false
  }
});

const Query = dataDb.model('Query', querySchema, 'queries');

export default Query;