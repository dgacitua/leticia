import Mongoose from 'mongoose';

import { dataDb, userDb } from '../db.js';

const demographicSchema = Mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  type: {
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

const Demographic = dataDb.model('Demographic', demographicSchema);

export default Demographic;