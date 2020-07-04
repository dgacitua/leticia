import Mongoose from 'mongoose';

const answerSchema = Mongoose.Schema({
  username: {
    type: String,
    required: false // TODO Login
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

const Answer = Mongoose.model('Answer', answerSchema);

export default Answer;