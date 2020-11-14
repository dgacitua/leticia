import Mongoose from 'mongoose';

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

const UserData = Mongoose.model('UserData', userDataSchema);

export default UserData;