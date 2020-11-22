// Adapted from https://bezkoder.com/node-js-mongodb-auth-jwt/
import express from 'express';

import middlewares from '../middlewares/index';
import * as controller from '../controllers/auth';

import oauth from '../oauth';

const router = express.Router();

router.post('/login', middlewares.checkHeader, controller.login);

router.post('/register',
  middlewares.checkHeader,
  [
    middlewares.verifySignup.checkDuplicateUsernameOrEmail,
    middlewares.verifySignup.checkRolesExisted
  ],
  controller.register
);

// OAuth Authentication, Just going to this URL will open OAuth screens
router.get('/google', oauth.authenticate('google', { scope: [ 'profile', 'email' ] }));
router.get('/facebook', oauth.authenticate('facebook', { scope: 'email' }));

// Oauth user data comes to these redirectURLs
router.get('/googleRedirect', oauth.authenticate('google'), controller.googleLogin);
router.get('/facebookRedirect', oauth.authenticate('facebook', { scope: 'email' }), controller.facebookLogin);


export default router;