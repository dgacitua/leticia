import Mongoose from 'mongoose';
import './db';

const answerSchema = Mongoose.Schema({
  userId: {
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
  }
}, { strict: false });

const Answer = Mongoose.model('Answer', answerSchema);

export default Answer;