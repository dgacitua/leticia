import Mongoose from 'mongoose';

import { dataDb, userDb } from '../db.js';

const searchTaskSchema = Mongoose.Schema({
  searchTaskId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const SearchTask = dataDb.model('Task', searchTaskSchema);

export default SearchTask;