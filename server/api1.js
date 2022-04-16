import express from 'express';

import auth from './routes/auth';
import user from './routes/user';
import forms from './routes/forms';
import tasks from './routes/tasks';
import actions from './routes/actions';
import answers from './routes/answers';
import demographic from './routes/demographic';
//import participants from './routes/participants';
import keystrokes from './routes/keystrokes';
import sessionflows from './routes/sessionflows';
import userdata from './routes/userdata';
import userlog from './routes/userlog';
import consent from './routes/consent';
import search from './routes/search';
import document from './routes/document';
import mouseaction from './routes/mouseactions';
import scrollaction from './routes/scrollactions';
import bookmarks from './routes/bookmarks';
import questions from './routes/questions';
import events from './routes/browserevents';

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