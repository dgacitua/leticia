// Adapted from https://bezkoder.com/node-js-mongodb-auth-jwt/
import Mongoose from 'mongoose';

import { dataDb, userDb } from '../db.js';

import User from './User.js';
import Role from './Role.js';
import Action from './Action.js';
import Answer from './Answer.js';
import Demographic from './Demographic.js';
import Form from './Form.js';
import Keystroke from './Keystroke.js';
import MouseAction from './MouseAction.js';
import Question from './Question.js';
import ScrollAction from './ScrollAction.js';
import SearchTask from './SearchTask.js';
import Credential from './Credential.js';
import UserData from './UserData.js';
import SessionFlow from './SessionFlow.js';
import UserLog from './UserLog.js';
import Consent from './Consent.js';
import Document from './Document.js';
import Query from './Query.js';
import TaskRequest from './TaskRequest.js';
import ServerConfig from './ServerConfig.js';
import Bookmark from './Bookmark.js';
import BrowserEvent from './BrowserEvent.js';

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
db.browserevent = BrowserEvent;

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