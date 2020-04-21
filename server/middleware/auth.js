import jwt from 'jsonwebtoken';

import { jwtKey } from '../constants';
import User from '../models/User';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, jwtKey);

    const user = await User.findOne({ _id: data._id, 'tokens.token': token });
    
    if (!user) {
        throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  }
  catch (err) {
    res.status(401).send({ statusCode: 401, errorMsg: 'Unauthorized', errorObj: err });
  }
};

module.exports = auth;