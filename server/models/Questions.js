import Mongoose from 'mongoose';

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

const Question = Mongoose.model('Question', questionSchema);

export default Question;