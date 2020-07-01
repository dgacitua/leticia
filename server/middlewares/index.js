// Adapted from https://bezkoder.com/node-js-mongodb-auth-jwt/
import authJWT from './authJWT';
import verifySignup from './verifySignup';

const checkHeader = (request, response, next) => {
  response.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
};

const middlewares = {
  authJWT,
  verifySignup,
  checkHeader
};

export default middlewares;