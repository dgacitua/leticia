// Adapted from https://medium.com/@rustyonrampage/using-oauth-2-0-along-with-jwt-in-node-express-9e0063d911ed
import Mongoose from 'mongoose';

const credentialSchema = Mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  provider: {
    type: String
  },
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Credential = Mongoose.model('Credential', credentialSchema);

export default Credential;