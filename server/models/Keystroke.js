import Mongoose from 'mongoose';

const keystrokeSchema = Mongoose.Schema({
  username: {
    type: String,
    required: true
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
  target: {
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
    required: false
  },
  which: {
    type: Number,
    required: false
  },
  keyCode: {
    type: Number,
    required: false
  },
  charCode: {
    type: Number,
    required: false
  },
  key: {
    type: String,
    required: false
  },
  char: {
    type: String,
    required: false
  }
});

const Keystroke = Mongoose.model('Keystroke', keystrokeSchema);

export default Keystroke;