import express from 'express';

import auth from './routes/auth.js';
import user from './routes/user.js';
import forms from './routes/forms.js';
import tasks from './routes/tasks.js';
import actions from './routes/actions.js';
import answers from './routes/answers.js';
import demographic from './routes/demographic.js';
//import participants from './routes/participants.js';
import keystrokes from './routes/keystrokes.js';
import sessionflows from './routes/sessionflows.js';
import userdata from './routes/userdata.js';
import userlog from './routes/userlog.js';
import consent from './routes/consent.js';
import search from './routes/search.js';
import document from './routes/document.js';
import mouseaction from './routes/mouseactions.js';
import scrollaction from './routes/scrollactions.js';
import bookmarks from './routes/bookmarks.js';
import questions from './routes/questions.js';
import events from './routes/browserevents.js';

const router = express.Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/forms', forms);
router.use('/tasks', tasks);
router.use('/actions', actions);
router.use('/answers', answers);
router.use('/demographic', demographic);
//router.use('/participants', participants);
router.use('/keystrokes', keystrokes);
router.use('/flows', sessionflows);
router.use('/userdata', userdata);
router.use('/userlog', userlog);
router.use('/consent', consent);
router.use('/search', search);
router.use('/documents', document);
router.use('/mouseactions', mouseaction);
router.use('/scrollactions', scrollaction);
router.use('/bookmarks', bookmarks);
router.use('/questions', questions);
router.use('/events', events);

export default router;