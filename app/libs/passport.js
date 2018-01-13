const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { CryptoService, UserService } = require(`${basePath}/app/services`);

const { BadRequest } = require(`${basePath}/app/utils/apiErrors`);
const crypto = new CryptoService();

const authStrategiesEnum = require(`${basePath}/app/enums/`).AUTH.STRATEGIES;


module.exports = {
  init() {

    passport.serializeUser((user, done) => {
      done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
      UserService.findOne({ query: { _id: id } }, (err, user) => {
        done(err, user);
      });
    });

    /**
     * Local Auth Strategy (Regular)
     */
    passport.use(authStrategiesEnum.USER_LOCAL, new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
    }, (email, password, done) => {

      let userFound = {};
      UserService.findOne({ query: { email }, options: { select: '+password +role' } })
        .then((user) => {
          if (!user) {
            return done(true, false);
          }
          userFound = user;
          return crypto.verifyPassword(password, userFound.password);
        })
        .then((isMatch) => {
          if (isMatch) {
            return done(null, userFound);
          }
          return done(new BadRequest(), false);
        })
        .catch((err) => {
          return done(err);
        });
    }));

    return passport;
  },

  getInstance() {
    return passport;
  },
};
