// Based on https://medium.com/@rustyonrampage/using-oauth-2-0-along-with-jwt-in-node-express-9e0063d911ed
import passport from 'passport';

import PassportJwt from 'passport-jwt';
import PassportGoogle from 'passport-google-oauth20';
import PassportFacebook from 'passport-facebook';

import * as Constants from './constants';
import { checkUser } from './controllers/auth';

const JwtStrategy = PassportJwt.Strategy;
const ExtractJwt = PassportJwt.ExtractJwt;
const GoogleStrategy = PassportGoogle.Strategy;
const FacebookStrategy = PassportFacebook.Strategy;

const passportAgent = passport;
const opts = {};

opts.secretOrKey = Constants.jwtKey;

opts.jwtFromRequest = (req) => {
  let token = null;
  if (req && req.cookies) token = req.cookies['jwt'];
  return token
}

// main authentication, our app will rely on it
passportAgent.use(new JwtStrategy(opts, (jwtPayload, callback) => {
    //console.log("JWT BASED AUTH GETTING CALLED"); // called everytime a protected URL is being served
    if (checkUser(jwtPayload.data)) {
      return callback(null, jwtPayload.data);
    }
    else {
      // user account doesnt exists in the DATA
      return callback(null, false);
    }
}))

passportAgent.use(new GoogleStrategy({
    clientID: Constants.googleClientId,
    clientSecret: Constants.googleClientSecret,
    callbackURL: "http://localhost:3001/v1/auth/googleRedirect"
  },
  (accessToken, refreshToken, profile, callback) => {
    //console.log(accessToken, refreshToken, profile);
    //console.log("GOOGLE BASED OAUTH VALIDATION GETTING CALLED");
    return callback(null, profile);
  }
));

passportAgent.use(new FacebookStrategy({
    clientID: Constants.facebookClientId,
    clientSecret: Constants.facebookClientSecret,
    callbackURL: "http://localhost:3001/v1/auth/facebookRedirect",
    profileFields: ['id', 'displayName', 'email', 'picture']
  },
  (accessToken, refreshToken, profile, callback) => {
    //console.log(profile);
    //console.log("FACEBOOK BASED OAUTH VALIDATION GETTING CALLED");
    return callback(null, profile);
  }
));

// These functions are required for getting data To/from JSON returned from Providers
passportAgent.serializeUser((user, callback) => {
    //console.log('I should have jack');
    callback(null, user);
});

passportAgent.deserializeUser((obj, callback) => {
    //console.log('I wont have jack shit');
    callback(null, obj);
});

export default passportAgent;