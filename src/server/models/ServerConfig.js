import Mongoose from 'mongoose';

import { dataDb, userDb } from '../db';

const serverConfigSchema = Mongoose.Schema({
  configName: {   // Use UpperCamelCase for this value
    type: String,
    required: true
  },
  numberValue: {
    type: Number,
    default: 0
  },
  stringValue: {
    type: String,
    default: ''
  },
  objectValue: {
    type: Object,
    default: {}
  }
}, { strict: false });

const ServerConfig = dataDb.model('ServerConfig', serverConfigSchema);

export default ServerConfig;