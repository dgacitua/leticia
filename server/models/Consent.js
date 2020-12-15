import Mongoose from 'mongoose';

const consentSchema = Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
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
  dateOfAcceptance: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

const Consent = Mongoose.model('Consent', consentSchema);

export default Consent;