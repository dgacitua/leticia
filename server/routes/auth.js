// Adapted from https://bezkoder.com/node-js-mongodb-auth-jwt/
import express from 'express';

import middlewares from '../middlewares/index';
import * as controller from '../controllers/auth';

const router = express.Router();

const checkHeader = (request, response, next) => {
  response.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
};

router.post('/register',
  checkHeader,
  [
    middlewares.verifySignup.checkDuplicateUsernameOrEmail,
    middlewares.verifySignup.checkRolesExisted
  ],
  controller.signup
);

router.post('/login', checkHeader, controller.signin);

export default router;