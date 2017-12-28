const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { CryptoService, DbService } = require(`${basePath}/app/services`);

const { NotAuthorized } = require(`${basePath}/app/utils/apiErrors`);
const crypto = new CryptoService();
const UserModel = DbService.models().User;

const authStrategiesEnum = require(`${basePath}/app/enums/`).AUTH.STRATEGIES;


module.exports = {
  init() {

    passport.serializeUser((user, done) => {
      done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
      UserModel.findById(id, (err, user) => {
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
      UserModel.findOne({ email })
        .select('+password +role')
        .lean()
        .then((user) => {
          userFound = user;
          if (!userFound) {
            return done(true, false);
          }
          return crypto.verifyPassword(password, userFound.password);
        })
        .then((isMatch) => {
          if (isMatch) {
            return done(null, userFound);
          }
          return done(new NotAuthorized(), false);
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
