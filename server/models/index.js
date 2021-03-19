// Adapted from https://bezkoder.com/node-js-mongodb-auth-jwt/
import Mongoose from 'mongoose';

import { dataDb, userDb } from '../db';

import User from './User';
import Role from './Role';
import Action from './Action';
import Answer from './Answer';
import Demographic from './Demographic';
import Form from './Form';
import Keystroke from './Keystroke';
import MouseAction from './MouseAction';
import Question from './Question';
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
import Bookmark from './Bookmark';

const db = {};

db.mongoose = Mongoose;
db.dataDb = dataDb;
db.userDb = userDb;

db.user = User;
db.role = Role;
db.action = Action;
db.answer = Answer;
db.demographic = Demographic;
db.form = Form;
db.keystroke = Keystroke;
db.mouseaction = MouseAction;
db.question = Question;
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
db.bookmark = Bookmark;

db.ROLES = [ 'user', 'admin' ];

const initial = async () => {
  // dgacitua: Create Server configs
  let trc = await ServerConfig.findOneAndUpdate({ configName: 'TaskRequestCount' }, { configName: 'TaskRequestCount' }, { new: true, upsert: true });

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
  });
};

initial();

export default db;