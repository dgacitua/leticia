import express from 'express';

import { string2hash } from '../utils';

import User from '../models/User';
import auth from '../middleware/auth';

const router = express.Router();

const login = async (request, response) => {
  try {
    const { name, password } = request.body;
    const user = await User.findByCredentials(name, password);

    if (!user) {
      return response.status(401).send({ statusCode: 401, errorMsg: 'Invalid credentials!', errorObj: null });
    }

    const token = await user.generateAuthToken();

    response.header('Access-Control-Expose-Headers', 'Authorization');
    response.header('Authorization', `Bearer ${token}`);
    response.end();
  }
  catch (err) {
    response.status(401).send({ statusCode: 401, errorMsg: 'Login failed!', errorObj: err });
  } 
};

const logout = async (request, response) => {
  try {
    // request.user.tokens = request.user.tokens.filter((token) => {
    //   return token.token != request.token;
    // });
    // it may be best to remove all tokens? => yes it may!.
    request.user.tokens = [];
    await request.user.save();
    response.send();
  }
  catch (err) {
    response.status(401).send({ statusCode: 401, errorMsg: 'Logout failed!', errorObj: err });
  }
};

const user = (request, response) => {
  /* remove private info */
  let user = {
    name: request.user.name,
    userId: request.user.userId
  };
  
  response.status(200).send(user);
};

const refresh = async (request, response) => {
  try {
    let user = await User.findByName(email);
    const token = await user.generateAuthToken();

    response.header('Access-Control-Expose-Headers', 'Authorization');
    response.header('Authorization', `Bearer ${token}`);
    response.end();
  }
  catch (err) {
    response.status(401).send({ statusCode: 401, errorMsg: 'Unauthorized', errorObj: err });
  }
};

const register = async (request, response) => {
  try {
    const { name, password } = request.body;

    const userObj = {
      name: name,
      userId: string2hash(name),
      password: password
    };

    const user = await User.create(userObj);
    const token = await user.generateAuthToken();

    response.status(201).send({ user, token });
  }
  catch (err) {
    console.error(err);
    response.status(500).send({ statusCode: 500, errorMsg: 'Register error!', errorObj: err });
  }
};


router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.get('/user', auth, user);
router.get('/refresh', auth, refresh);

export default router;