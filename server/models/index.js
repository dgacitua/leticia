// Adapted from https://bezkoder.com/node-js-mongodb-auth-jwt/
import Mongoose from 'mongoose';

import User from './User';
import Role from './Role';
import Actions from './Actions';
import Answers from './Answers';
import Demographic from './Demographic';
import Forms from './Forms';
import Keystroke from './Keystroke';
import MouseAction from './MouseAction';
import Participant from './Participant';
import Questions from './Questions';
import ScrollAction from './ScrollAction';
import SearchTask from './SearchTask';

const db = {};

db.mongoose = Mongoose;

db.user = User;
db.role = Role;
db.action = Actions;
db.answers = Answers;
db.demographic = Demographic;
db.forms = Forms;
db.keystroke = Keystroke;
db.mouseaction = MouseAction;
db.participant = Participant;
db.questions = Questions;
db.scrollaction = ScrollAction;
db.searchtask = SearchTask;

db.ROLES = [ 'user', 'admin' ];

export default db;