import Mongoose from 'mongoose';
import { mongoUrl } from './constants';

import db from './models/index';

const Role = db.role;

Mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => {
    console.log('Successfully connect to MongoDB!');
    initial();
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
    process.exit();
  });

const initial = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'user'
      }).save((err) => {
        if (err) {
          console.error('error', err);
        }

        console.log("Added 'user' to roles collection");
      });

      new Role({
        name: 'admin'
      }).save((err) => {
        if (err) {
          console.error('error', err);
        }

        console.log("Added 'admin' to roles collection");
      });
    }
  });
}