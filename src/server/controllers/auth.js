// Adapted from https://bezkoder.com/node-js-mongodb-auth-jwt/
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import hrrs from 'human-readable-random-string';

import config from '../config/auth.js';
import db from '../models/index.js';

import * as Constants from '../constants.js';
import { consoleError, consoleLog } from '../utils.js';

const User = db.user;
const UserData = db.userdata;
const Role = db.role;
const Credential = db.credential;
const SessionFlow = db.sessionflow;

/* MANUAL REGISTER */
export const register = async (req, res) => {
  try {
    consoleLog('Redirected from LETICIA Register', req.body.email);

    let emailUser = {
      email: req.body.email,
      password: req.body.password
    };

    let userExists = await checkUser(emailUser);

    if (userExists) {
      let err = 'Email already registered';
      consoleError('EmailAuthError', err, emailUser.email);

      return res.status(401).send({
        accessToken: null,
        message: err
      });
    }
    else {
      let user = new User({
        username: hrrs(10),
      });

      let credential = new Credential({
        email: emailUser.email,
        password: bcrypt.hashSync(emailUser.password, 8),
        username: user.username
      });
    
      await user.save();
      await credential.save();

      if (Array.isArray(user.roles) && user.roles.length) {
        let roles = await Role.find({ name: { $in: user.roles }}).exec();
        user.roles = roles.map(role => role._id);
        await user.save();
      }
      else {
        let role = await Role.findOne({ name: 'user' }).exec();
        user.roles = [ role._id ];
        await user.save();
      }

      await user.populate('roles').execPopulate();

      let authorities = [];
  
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
      }
  
      let jwtData = {
        id: user._id,
        username: user.username,
        email: credential.email,
        roles: authorities
      };

      let token = jwt.sign({ data: jwtData }, config.secret, { expiresIn: '24h' });
      jwtData.accessToken = token;

      let sessionFlowId = Constants.currentSessionFlow;
      let sessionFlow = await SessionFlow.findOne({ sessionFlowId: sessionFlowId }).exec();
      
      let userdata = new UserData({ username: user.username, state: {}, sessionFlow: {} });
      await userdata.save();

      res.cookie('jwt', JSON.stringify(jwtData));
      res.cookie('sessionflow', JSON.stringify(sessionFlow));
      res.cookie('userdata', JSON.stringify(userdata.state));

      res.status(201).send({ message: 'User Registered Successfully!', email: credential.email });
    }

    /*
    let user = new User({
      username: req.body.username || hrrs(10),
    });
  
    let credential = new Credential({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      username: user.username
    });
  
    await user.save();
    await credential.save();
    
    if (Array.isArray(req.body.roles) && req.body.roles.length) {
      let roles = await Role.find({ name: { $in: req.body.roles }}).exec();
      user.roles = roles.map(role => role._id);
      await user.save();
    }
    else {
      let role = await Role.findOne({ name: 'user' }).exec();
      user.roles = [ role._id ];
      await user.save();
    }

    await user.populate('roles').execPopulate();

    let authorities = [];

    for (let i = 0; i < user.roles.length; i++) {
      authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
    }

    let jwtData = {
      id: user._id,
      username: user.username,
      email: credential.email,
      roles: authorities
    };

    let token = jwt.sign({ data: jwtData }, config.secret, { expiresIn: '24h' });
    jwtData.accessToken = token;

    //res.cookie('jwt', JSON.stringify(jwtData));
    return res.status(200).send(jwtData);
    */
  }
  catch (err) {
    consoleError('RegisterError', err);
    return res.status(500).send({ message: err });
  }
};

/* MANUAL LOGIN */
export const login = async (req, res) => {
  try {
    consoleLog('Redirected from LETICIA Login', req.body.email);

    let emailUser = {
      email: req.body.email,
      password: req.body.password
    };

    let userExists = await checkUser(emailUser);

    if (userExists) {
      let credential = await Credential.findOne({ email: emailUser.email }).exec();

      if (!credential) {
        return res.status(404).send({ message: 'User Not Found' });
      }
      else {
        //await credential.populate('user').execPopulate();
        //await credential.user.populate('roles').execPopulate();

        let user = await User.findOne({ username: credential.username });

        await user.populate('roles').execPopulate();

        let authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
          authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
        }

        let jwtData = {
          id: user._id,
          username: user.username,
          email: credential.email,
          roles: authorities
        };

        let token = jwt.sign({ data: jwtData }, config.secret, { expiresIn: '24h' });
        jwtData.accessToken = token;

        let sessionFlowId = Constants.currentSessionFlow;
        let sessionFlow = await SessionFlow.findOne({ sessionFlowId: sessionFlowId }).exec();
        let userdata = await UserData.findOne({ username: jwtData.username }).exec();

        res.cookie('jwt', JSON.stringify(jwtData));
        res.cookie('sessionflow', JSON.stringify(sessionFlow));
        res.cookie('userdata', JSON.stringify(userdata.state));

        res.status(201).send({ message: 'User Logged In Successfully!', email: credential.email });
      }
    }
    else {
      let err = 'Email is not registered';
      consoleError('EmailAuthError', err, emailUser.email);

      return res.status(401).send({
        accessToken: null,
        message: err
      });
    }

    /*
    let credential = await Credential.findOne({ email: req.body.email }).exec();
    
    if (!credential) {
      return res.status(404).send({ message: 'User Not Found' });
    }
    else {
      await credential.populate('user').execPopulate();
      await credential.user.populate('roles').execPopulate();

      let user = credential.user;
      let passwordIsValid = bcrypt.compareSync(req.body.password, credential.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!'
        });
      }
      else {
        let authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
          authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
        }

        let jwtData = {
          id: user._id,
          username: user.username,
          email: credential.email,
          roles: authorities
        };

        let token = jwt.sign({ data: jwtData }, config.secret, { expiresIn: '24h' });
        jwtData.accessToken = token;
        
        //res.cookie('jwt', JSON.stringify(jwtData));
        return res.status(200).send(jwtData);
      }
    }
    */
  }
  catch (err) {
    consoleError('LoginError', err);
    return res.status(500).send({ message: err });
  }
};

/* GOOGLE LOGIN */
export const googleLogin = async (req, res) => {
  try {
    //consoleLog('Redirected from Google', req.user);

    let oauthUser = {
      //displayName: req.user.displayName,
      //name: req.user.name.givenName,
      email: req.user._json.email,
      provider: req.user.provider
    };

    let userExists = await checkUser(oauthUser);

    // User exists on database
    if (userExists) {
      let credential = await Credential.findOne({ email: oauthUser.email }).exec();

      if (!credential) {
        return res.status(404).send({ message: 'User Not Found' });
      }
      else {
        //await credential.populate('user').execPopulate();
        //await credential.user.populate('roles').execPopulate();

        let user = await User.findOne({ username: credential.username });

        await user.populate('roles').execPopulate();

        let authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
          authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
        }

        let jwtData = {
          id: user._id,
          username: user.username,
          email: credential.email,
          roles: authorities
        };

        let token = jwt.sign({ data: jwtData }, config.secret, { expiresIn: '24h' });
        jwtData.accessToken = token;

        let sessionFlowId = Constants.currentSessionFlow;
        let sessionFlow = await SessionFlow.findOne({ sessionFlowId: sessionFlowId }).exec();
        let userdata = await UserData.findOne({ username: jwtData.username }).exec();

        res.cookie('jwt', JSON.stringify(jwtData));
        res.cookie('sessionflow', JSON.stringify(sessionFlow));
        res.cookie('userdata', JSON.stringify(userdata.state));

        //consoleLog('OAuthLogin', 'Google', jwtData, sessionFlow, userdata.state);

        return res.redirect(`${req.protocol}://${Constants.leticiaHost}:${Constants.leticiaPort}`);
        //return res.status(200).send(jwtData);
      }
    }
    // User doesn't exist (register and login)
    else {
      let user = new User({
        username: hrrs(10),
      });
    
      let credential = new Credential({
        email: oauthUser.email,
        provider: oauthUser.provider,
        username: user.username
      });
    
      await user.save();
      await credential.save();
      
      if (Array.isArray(user.roles) && user.roles.length) {
        let roles = await Role.find({ name: { $in: user.roles }}).exec();
        user.roles = roles.map(role => role._id);
        await user.save();
      }
      else {
        let role = await Role.findOne({ name: 'user' }).exec();
        user.roles = [ role._id ];
        await user.save();
      }
  
      await user.populate('roles').execPopulate();
      
      let authorities = [];
  
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
      }
  
      let jwtData = {
        id: user._id,
        username: user.username,
        email: credential.email,
        roles: authorities
      };
  
      let token = jwt.sign({ data: jwtData }, config.secret, { expiresIn: '24h' });
      jwtData.accessToken = token;

      let sessionFlowId = Constants.currentSessionFlow;
      let sessionFlow = await SessionFlow.findOne({ sessionFlowId: sessionFlowId }).exec();
      
      let userdata = new UserData({ username: user.username, state: {}, sessionFlow: {} });
      await userdata.save();

      res.cookie('jwt', JSON.stringify(jwtData));
      res.cookie('sessionflow', JSON.stringify(sessionFlow));
      res.cookie('userdata', JSON.stringify(userdata.state));
      
      //consoleLog('OAuthRegister', 'Google', jwtData, sessionFlow);

      return res.redirect(`${req.protocol}://${Constants.leticiaHost}:${Constants.leticiaPort}`);
      //return res.status(200).send(jwtData);
    }
  }
  catch (err) {
    consoleError('GoogleAuthError', err);
    return res.status(500).send({ message: err });
  }
};

/* FACEBOOK LOGIN */
export const facebookLogin = async (req, res) => {
  try {
    //consoleLog('Redirected from Facebook', req.user);

    let oauthUser = {
      //displayName: req.user.displayName,
      //name: req.user._json.name,
      email: req.user._json.email,
      provider: req.user.provider
    };

    let userExists = await checkUser(oauthUser);

    // User exists on database
    if (userExists) {
      let credential = await Credential.findOne({ email: oauthUser.email }).exec();

      if (!credential) {
        return res.status(404).send({ message: 'User Not Found' });
      }
      else {
        //await credential.populate('user').execPopulate();
        //await credential.user.populate('roles').execPopulate();

        let user = await User.findOne({ username: credential.username });
        
        await user.populate('roles').execPopulate();

        let authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
          authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
        }

        let jwtData = {
          id: user._id,
          username: user.username,
          email: credential.email,
          roles: authorities
        };

        let token = jwt.sign({ data: jwtData }, config.secret, { expiresIn: '24h' });
        jwtData.accessToken = token;

        let sessionFlowId = Constants.currentSessionFlow;

        let sessionFlow = await SessionFlow.findOne({ sessionFlowId: sessionFlowId }).exec();
        let userdata = await UserData.findOne({ username: jwtData.username }).exec();

        res.cookie('jwt', JSON.stringify(jwtData));
        res.cookie('sessionflow', JSON.stringify(sessionFlow));
        res.cookie('userdata', JSON.stringify(userdata.state));

        //consoleLog('OAuthLogin', 'Facebook', jwtData, sessionFlow, userdata.state);

        return res.redirect(`${req.protocol}://${Constants.leticiaHost}:${Constants.leticiaPort}`);
        //return res.status(200).send(jwtData);
      }
    }
    // User doesn't exist (register and login)
    else {
      console.log('User doesnt exist in DB!');

      let user = new User({
        username: hrrs(10),
      });
    
      let credential = new Credential({
        email: oauthUser.email,
        provider: oauthUser.provider,
        username: user.username
      });
    
      await user.save();
      await credential.save();
      
      if (Array.isArray(user.roles) && user.roles.length) {
        let roles = await Role.find({ name: { $in: user.roles }}).exec();
        user.roles = roles.map(role => role._id);
        await user.save();
      }
      else {
        let role = await Role.findOne({ name: 'user' }).exec();
        user.roles = [ role._id ];
        await user.save();
      }
  
      await user.populate('roles').execPopulate();
      
      let authorities = [];
  
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
      }
  
      let jwtData = {
        id: user._id,
        username: user.username,
        email: credential.email,
        roles: authorities
      };
  
      let token = jwt.sign({ data: jwtData }, config.secret, { expiresIn: '24h' });
      jwtData.accessToken = token;
      
      let sessionFlowId = Constants.currentSessionFlow;
      let sessionFlow = await SessionFlow.findOne({ sessionFlowId: sessionFlowId }).exec();
      
      let userdata = new UserData({ username: user.username, state: {}, sessionFlow: {} });
      await userdata.save();

      res.cookie('jwt', JSON.stringify(jwtData));
      res.cookie('sessionflow', JSON.stringify(sessionFlow));
      res.cookie('userdata', JSON.stringify(userdata.state));

      //consoleLog('OAuthRegister', 'Facebook', jwtData, sessionFlow);
      
      return res.redirect(`${req.protocol}://${Constants.leticiaHost}:${Constants.leticiaPort}`);
      //return res.status(200).send(jwtData);
    }
  }
  catch (err) {
    consoleError('FacebookAuthError', err);
    return res.status(500).send({ message: err });
  }
};

/* CHECK VALID CREDENTIALS */
export const checkUser = async (userData) => {
  try {
    //consoleLog('Checking User!', userData);
    let credential = await Credential.findOne({ email: userData.email }).exec();
    
    if (credential) {
      let passwordIsValid = (userData.password && credential.password) ? bcrypt.compareSync(userData.password, credential.password) : null;
      let providerIsValid = (userData.provider && credential.provider) ? (userData.provider === credential.provider) : null;

      if (passwordIsValid || providerIsValid) return true;
      else return false;
    }
    else {
      return false;
    }
  }
  catch (err) {
    consoleError('CheckUserError', err);
    return false;
  }
};