// Adapted from https://bezkoder.com/node-js-mongodb-auth-jwt/
import authJWT from './authJWT';
import verifySignup from './verifySignup';

const middlewares = {
  authJWT,
  verifySignup
};

export default middlewares;