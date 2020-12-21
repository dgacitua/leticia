// Adapted from https://bezkoder.com/node-js-mongodb-auth-jwt/
import Mongoose from 'mongoose';

import { dataDb, userDb } from '../db';

const roleSchema = Mongoose.Schema({
  name: {
    type: String
  }
});

const Role = dataDb.model('Role', roleSchema);

export default Role;