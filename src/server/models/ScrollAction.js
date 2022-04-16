import Mongoose from 'mongoose';

import { dataDb, userDb } from '../db';

const scrollActionSchema = Mongoose.Schema({
  username: {
    type: String,
    required: true
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
  x_scr: {
    type: Number,
    required: false,
  },
  y_scr: {
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
  w_doc: {
    type: Number,
    required: false,
  },
  h_doc: {
    type: Number,
    required: false,
  }
});

const ScrollAction = dataDb.model('ScrollAction', scrollActionSchema);

export default ScrollAction;