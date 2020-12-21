import Mongoose from 'mongoose';

import { dataDb, userDb } from '../db';

const questionSchema = Mongoose.Schema({
  questionId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
}, { strict: false });

const Question = dataDb.model('Question', questionSchema);

export default Question;