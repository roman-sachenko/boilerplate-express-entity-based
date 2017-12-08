'use strict';

const passport            = require('passport');
const FacebookStrategy    = require('passport-facebook').Strategy;
const GoogleStrategy      = require('passport-google').Strategy;
const LocalStrategy       = require('passport-local').Strategy;

const { CryptoService, DbService } = require(`${basePath}/app/services`);

const { NotAuthorized }   = require(`${basePath}/app/utils/apiErrors`);
const crypto              = new CryptoService();
const UserModel           = DbService.models().User;

const authStrategiesEnum  = require(`${basePath}/app/enums/`).AUTH.STRATEGIES;


module.exports = {
  init(appConfig) {

    passport.serializeUser((user, done) => {
      done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
      UserModel.findById(id, (err, user) => {
        done(err, user);
      });
    });

    // /**
    //  * Facebook Auth Strategy
    //  */
    // passport.use(authStrategiesEnum.USER_FACEBOOK, new FacebookStrategy({
    //     clientID        : appConfig.social.facebook.appId,
    //     clientSecret    : appConfig.social.facebook.appSecret,
    //     callbackURL     : appConfig.social.facebook.appCallbackUrl
    //   },
    //   (accessToken, refreshToken, profile, done) => {
    //     return done(null, profile);
    //   }
    // ));
    //
    // /**
    //  * Google Auth Strategy
    //  */
    // passport.use(authStrategiesEnum.USER_GOOGLE, new GoogleStrategy({
    //     returnURL   : appConfig.social.google.appCallbackUrl
    //     // realm       : 'http://localhost:3000/'
    //   }, (identifier, done) => {
    //
    //   }
    // ));

    /**
     * Local Auth Strategy (Regular)
     */
    passport.use(authStrategiesEnum.USER_LOCAL, new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
      }, (email, password, done) => {

      let userFound = {};
      UserModel.findOne({ email: email})
        .select('+password +role')
        .lean()
        .then((user) => {
          userFound = user;
          if(!userFound) {
            return done(true, false);
          }
          return crypto.verifyPassword(password, userFound.password);
        })
        .then((isMatch) => {
          if(isMatch) {
            return done(null, userFound);
          }
          done(new NotAuthorized(), false);
        })
        .catch(err => {
          return done(err);
        });

      }
    ));

    return passport;
  },

  getInstance() {
    return passport;
  }
};