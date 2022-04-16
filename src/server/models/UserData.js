import Mongoose from 'mongoose';

import { dataDb, userDb } from '../db';

const userDataSchema = Mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  state: {
    type: Object,
    required: true
  },
  sessionFlow: {
    type: Object,
    required: true
  }
});

const UserData = dataDb.model('UserData', userDataSchema, 'userdata');

export default UserData;