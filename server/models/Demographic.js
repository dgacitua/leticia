import Mongoose from 'mongoose';
import './db';

const demographicSchema = Mongoose.Schema({
  userId: {
    type: String,
    required: false // TODO Login
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