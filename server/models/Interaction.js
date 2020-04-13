import Mongoose from 'mongoose';
import './db';

const interactionSchema = Mongoose.Schema({
  userId: {
    type: String,
    required: false // TODO Login
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  source: {
    type: String,
    required: true,
    trim: true
  },
  url: {
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
  description: {
    type: Object,
    required: false
  }
}, { strict: false });

const Interaction = Mongoose.model('Interaction', interactionSchema);

export default Interaction;