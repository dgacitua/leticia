import express from 'express';

import auth from './routes/auth';
import forms from './routes/forms';
import tasks from './routes/tasks';
import actions from './routes/actions';
import answers from './routes/answers';
import participants from './routes/participants';

const router = express.Router();

router.use('/auth', auth);
router.use('/forms', forms);
router.use('/tasks', tasks);
router.use('/actions', actions);
router.use('/answers', answers);
router.use('/participants', participants);

export default router;