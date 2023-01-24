import Mongoose from 'mongoose';

import { consoleLog, consoleError } from './utils.js';
import { mongoDataUrl, mongoUserUrl } from './constants.js';

const dataDb = Mongoose.createConnection(mongoDataUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const userDb = Mongoose.createConnection(mongoUserUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

dataDb
  .then(() => {
    consoleLog('Successfully connect to Data database in MongoDB!');
  })
  .catch((err) => {
    consoleError('MongoDB connection error', err);
    process.exit();
  });

userDb
  .then(() => {
    consoleLog('Successfully connect to User database in MongoDB!');
  })
  .catch((err) => {
    consoleError('MongoDB connection error', err);
    process.exit();
  });

export { dataDb, userDb };