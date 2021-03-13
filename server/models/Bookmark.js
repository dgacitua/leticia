import Mongoose from 'mongoose';

import { dataDb, userDb } from '../db';

const bookmarkSchema = Mongoose.Schema({
  username: {
    type: String,
    required: false // TODO login required
  },
  action: {
    type: String,
    required: true,
    trim: true
  },
  task: {
    type: String,
    required: false // TODO flow required
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