import Mongoose from 'mongoose';
import './db';

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

const Form = Mongoose.model('Form', formSchema);

export default Form;