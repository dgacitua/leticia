import Mongoose from 'mongoose';

import { dataDb, userDb } from '../db';

const documentSchema = Mongoose.Schema({
  docId: {
    type: String,
    required: true
  },
  locale: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  snippet: {
    type: String
  },
  body: {
    type: String
  },
  keywords: {
    type: [ String ]
  },
  url: {
    type: String
  }
});

const Document = dataDb.model('Document', documentSchema);

export default Document;