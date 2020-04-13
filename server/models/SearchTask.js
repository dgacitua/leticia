import Mongoose from 'mongoose';
import './db';

const searchTaskSchema = Mongoose.Schema({
  searchTaskId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const SearchTask = Mongoose.model('Task', searchTaskSchema);

export default SearchTask;