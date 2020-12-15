import Mongoose from 'mongoose';

// TODO

const userLogSchema = Mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  ipAddress: {
    type: String,
    required: false,
  },
  userAgent: {
    type: String,
    required: false
  },
  device: {
    type: String,
    required: false
  },
  operatingSystem: {
    type: String,
    required: false
  },
  browser: {
    type: String,
    required: false
  },
  clientTimestamp: {
    type: Number,
    required: true
  },
  serverTimestamp: {
    type: Number,
    required: true
  },
  details: {
    type: Object,
    required: false
  }
}, { strict: false });

const UserLog = Mongoose.model('UserLog', userLogSchema);

export default UserLog;