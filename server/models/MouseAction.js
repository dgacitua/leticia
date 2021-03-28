import Mongoose from 'mongoose';

import { dataDb, userDb } from '../db';

const mouseActionSchema = Mongoose.Schema({
  username: {
    type: String,
    required: false // TODO login required
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
    required: false
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
  },
  details: {
    type: Object,
    required: false,
  }
});

const MouseAction = dataDb.model('MouseAction', mouseActionSchema);

export default MouseAction;