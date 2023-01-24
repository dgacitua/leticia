// Adapted from https://bezkoder.com/node-js-mongodb-auth-jwt/
import Mongoose from 'mongoose';

import { dataDb, userDb } from '../db.js';

const userSchema = Mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  roles: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    }
  ]
});

const User = dataDb.model('User', userSchema);

export default User;