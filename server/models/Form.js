import Mongoose from 'mongoose';

import { dataDb, userDb } from '../db';

const formSchema = Mongoose.Schema({
  formId: {
    type: String,
    required: true
  },
  questions: {
    type: [ String ],
    required: true
  }
});

const Form = dataDb.model('Form', formSchema);

export default Form;