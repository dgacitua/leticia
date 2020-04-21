import Mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

import { jwtKey } from '../constants';

import './db';

const userSchema = Mongoose.Schema({
  name: {
    type: String,
    trim: true,  
    required: true,
    unique: true
  },
  userId: {
    type: String,
    trim: true,  
    required: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minLength: 7
  },
  tokens: [{
    token: {
      type: String, 
      required: true
    }
  }]
});


userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = bcrypt.hashSync(user.password, 8);
  }

  next();
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, jwtKey);
  // user.tokens = user.tokens.concat({token});
  // keeps only one user session at the time, but keep it as
  // an array.
  user.tokens = [{token}];
  await user.save();
  return token;
}

userSchema.statics.findByCredentials = async (name, password) => {
  const user = await User.findOne({ name });

  if (!user) {
    throw new Error('Invalid login credentials');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error('Invalid login credentials');
  }
  else {
    return user;
  }
}

userSchema.statics.findByName = async (name) => {
  const user = await User.findOne({ name });
  
  if (!user) {
    throw new Error(`User doesn't exist!`);
  }
  else {
    return user;
  }
}

const User = Mongoose.model('User', userSchema);

export default User;