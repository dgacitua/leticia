// Adapted from https://bezkoder.com/node-js-mongodb-auth-jwt/
import express from 'express';

import middlewares from '../middlewares/index';
import * as controller from '../controllers/user';

const router = express.Router();

router.get('/test/all', middlewares.checkHeader, controller.allAccess);

router.get('/test/user',
  middlewares.checkHeader,
  [ middlewares.authJWT.verifyToken ],
  controller.userBoard
);

router.get('/test/admin',
  middlewares.checkHeader,
  [ middlewares.authJWT.verifyToken, middlewares.authJWT.isAdmin ],
  controller.adminBoard
);

export default router;