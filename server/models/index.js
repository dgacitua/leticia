// Adapted from https://bezkoder.com/node-js-mongodb-auth-jwt/
import Mongoose from 'mongoose';

import { dataDb, userDb } from '../db';

import User from './User';
import Role from './Role';
import Actions from './Actions';
import Answers from './Answers';
import Demographic from './Demographic';
import Forms from './Forms';
import Keystroke from './Keystroke';
import MouseAction from './MouseAction';
import Questions from './Questions';
import ScrollAction from './ScrollAction';
import SearchTask from './SearchTask';
import Credential from './Credential';
import UserData from './UserData';
import SessionFlow from './SessionFlow';
import UserLog from './UserLog';
import Consent from './Consent';
import Document from './Document';
import Query from './Query';
import TaskRequest from './TaskRequest';
import ServerConfig from './ServerConfig';

const db = {};

db.mongoose = Mongoose;
db.dataDb = dataDb;
db.userDb = userDb;

db.user = User;
db.role = Role;
db.action = Actions;
db.answers = Answers;
db.demographic = Demographic;
db.forms = Forms;
db.keystroke = Keystroke;
db.mouseaction = MouseAction;
db.questions = Questions;
db.scrollaction = ScrollAction;
db.searchtask = SearchTask;
db.credential = Credential;
db.userdata = UserData;
db.sessionflow = SessionFlow;
db.userlog = UserLog;
db.consent = Consent;
db.document = Document;
db.query = Query;
db.taskrequest = TaskRequest;
db.serverconfig = ServerConfig;

db.ROLES = [ 'user', 'admin' ];

const initial = async () => {
  // dgacitua: Create roles
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

    // dgacitua: Create Server configs
    ServerConfig.findOneAndUpdate({ configName: 'TaskRequestCount' }, { configName: 'TaskRequestCount' }, { new: true, upsert: true });
  });
};

initial();

export default db;