// Adapted from https://bezkoder.com/node-js-mongodb-auth-jwt/
import Mongoose from 'mongoose';

const roleSchema = Mongoose.Schema({
  name: {
    type: String
  }
});

const Role = Mongoose.model('Role', roleSchema);

export default Role;