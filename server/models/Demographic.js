import Mongoose from 'mongoose';

const demographicSchema = Mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  type: {
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

const Demographic = Mongoose.model('Demographic', demographicSchema);

export default Demographic;