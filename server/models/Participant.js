import Mongoose from 'mongoose';

const participantSchema = Mongoose.Schema({
  userId: {
    type: String,
    trim: true,  
    required: true,
    unique: true
  },
  registerDate: {
    type: Date,
    required: true
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  browser: {
    type: String
  },
  operatingSystem: {
    type: String
  },
  device: {
    type: String
  },
  finished: {
    type: Boolean,
    default: false
  },
  finishedReason: {
    type: String
  }
});

const Participant = Mongoose.model('participant', participantSchema);

export default Participant;