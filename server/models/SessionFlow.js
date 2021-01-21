import Mongoose from 'mongoose';

import { dataDb, userDb } from '../db';

const sessionFlowSchema = Mongoose.Schema({
  sessionFlowId: {
    type: String,
    required: true,
    unique: true
  },
  stages: {
    type: [ Object ],
    required: true
  }
});

const SessionFlow = dataDb.model('SessionFlow', sessionFlowSchema);

export default SessionFlow;