// Adapted from https://bezkoder.com/node-js-mongodb-auth-jwt/
import Mongoose from 'mongoose';

const userSchema = Mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  roles: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    }
  ]
});

const User = Mongoose.model('User', userSchema);

export default User;