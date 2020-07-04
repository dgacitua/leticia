import Mongoose from 'mongoose';

const actionSchema = Mongoose.Schema({
  username: {
    type: String,
    required: false // TODO Login
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  source: {
    type: String,
    required: true,
    trim: true
  },
  url: {
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
  details: {
    type: Object,
    required: false
  }
}, { strict: false });

const Action = Mongoose.model('Action', actionSchema);

export default Action;