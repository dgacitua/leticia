// Adapted from https://bezkoder.com/node-js-mongodb-auth-jwt/
import authJWT from './authJWT.js';
import verifySignup from './verifySignup.js';

const checkHeader = (request, response, next) => {
  response.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
};

const middlewares = {
  checkHeader,
  authJWT,
  verifySignup
};

export default middlewares;