import Mongoose from 'mongoose';

import { dataDb, userDb } from '../db.js';

const sessionFlowSchema = Mongoose.Schema({
  sessionFlowId: {
    type: String,
    required: true,
    unique: true
  },
  instructions: {
    type: String,
    required: false
  },
  minQueries: {
    type: Number,
    required: false
  },
  minDocs: {
    type: Number,
    required: false
  },
  stages: {
    type: [ Object ],
    required: true
  }
});

const SessionFlow = dataDb.model('SessionFlow', sessionFlowSchema);

export default SessionFlow;