import Mongoose from 'mongoose';

import { dataDb, userDb } from '../db.js';

const bookmarkSchema = Mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true,
    trim: true
  },
  task: {
    type: String,
    required: true
  },
  docId: {
    type: String,
    required: true
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
});

const Bookmark = dataDb.model('Bookmark', bookmarkSchema);

export default Bookmark;