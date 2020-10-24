import express from 'express';

import auth from './routes/auth';
import user from './routes/user';
import forms from './routes/forms';
import tasks from './routes/tasks';
import actions from './routes/actions';
import answers from './routes/answers';
import demographic from './routes/demographic';
import participants from './routes/participants';
import keystrokes from './routes/keystrokes';

const router = express.Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/forms', forms);
router.use('/tasks', tasks);
router.use('/actions', actions);
router.use('/answers', answers);
router.use('/demographic', demographic);
router.use('/participants', participants);
router.use('/keystrokes', keystrokes);

export default router;