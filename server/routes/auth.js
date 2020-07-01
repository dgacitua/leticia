// Adapted from https://bezkoder.com/node-js-mongodb-auth-jwt/
import express from 'express';

import middlewares from '../middlewares/index';
import * as controller from '../controllers/auth';

const router = express.Router();

router.post('/register',
  middlewares.checkHeader,
  [
    middlewares.verifySignup.checkDuplicateUsernameOrEmail,
    middlewares.verifySignup.checkRolesExisted
  ],
  controller.signup
);

router.post('/login', middlewares.checkHeader, controller.signin);

export default router;