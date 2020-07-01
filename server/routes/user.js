// Adapted from https://bezkoder.com/node-js-mongodb-auth-jwt/
import express from 'express';

import middlewares from '../middlewares/index';
import * as controller from '../controllers/user';

const router = express.Router();

const checkHeader = (request, response, next) => {
  response.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
};

router.get('/test/all', checkHeader, controller.allAccess);

router.get('/test/user',
  checkHeader,
  [ middlewares.authJWT.verifyToken ],
  controller.userBoard
);

router.get('/test/admin',
  checkHeader,
  [ middlewares.authJWT.verifyToken, middlewares.authJWT.isAdmin ],
  controller.adminBoard
);

export default router;

/*
const user = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/test/all', controller.allAccess);

  app.get('/test/user', [authJwt.verifyToken], controller.userBoard);

  app.get(
    '/test/admin',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};

export default user;
*/