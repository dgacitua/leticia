import Mongoose from 'mongoose';

import { dataDb, userDb } from '../db';

// TODO
const browserEventSchema = Mongoose.Schema({
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
    required: true
  },
  details: {
    type: Object,
    required: false
  }
}, { strict: false });

const BrowserEvent = dataDb.model('BrowserEvent', browserEventSchema);

export default BrowserEvent;