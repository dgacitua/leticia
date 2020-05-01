import Mongoose from 'mongoose';

import './db';

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