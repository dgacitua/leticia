import Mongoose from 'mongoose';

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

const SessionFlow = Mongoose.model('SessionFlow', sessionFlowSchema);

export default SessionFlow;