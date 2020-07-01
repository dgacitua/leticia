import Mongoose from 'mongoose';
//import './db';

const mouseActionSchema = Mongoose.Schema({
  userId: {
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
  x_win: {
    type: Number,
    required: false,
  },
  y_win: {
    type: Number,
    required: false,
  },
  w_win: {
    type: Number,
    required: false,
  },
  h_win: {
    type: Number,
    required: false,
  },
  x_doc: {
    type: Number,
    required: false,
  },
  y_doc: {
    type: Number,
    required: false,
  },
  w_doc: {
    type: Number,
    required: false,
  },
  h_doc: {
    type: Number,
    required: false,
  }
});

const MouseAction = Mongoose.model('MouseAction', mouseActionSchema);

export default MouseAction;