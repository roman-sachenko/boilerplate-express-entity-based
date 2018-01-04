const config = require(`${basePath}/config/app/`);
const authStrategies = require(`${basePath}/app/enums/`).AUTH.STRATEGIES;
const tokenTypes = require(`${basePath}/app/enums/`).AUTH.TOKEN_TYPES;
const { NotAuthorized } = require(`${basePath}/app/utils/apiErrors`);
const MainService = require('./MainService');
const passport = require('passport');
const jwt = require('jsonwebtoken');

let instance = null;

/**
 * auth service using passport module
 */

module.exports = class AuthService extends MainService {
  constructor(authProvider, inputConfig) {
    if (!instance) {
      super('Auth Service');
      const { DbService } = require(`${basePath}/app/services`);
      this.authProvider = authProvider || passport;
      this.config = inputConfig || config;
      this.tokenTypes = tokenTypes;
      this.jwt = jwt;
      this.authEntities = DbService.models();
      this.authStrategies = authStrategies;
      instance = this;
    }
    return instance;
  }

  static getStrategies() {
    return authStrategies;
  }

  static generatePasswordRecoveryToken() {

  }

  _getStrategies() {
    return this.authStrategies;
  }

  /**
   * Internal (Private) function to check incoming token
   * @param token
   * @returns {Promise}
   * @private
   */
  async _verifyToken(token) {
    const  self = this;
    return new Promise((resolve, reject) => {
      return self.jwt.verify(token, self.config.jwt.secret, (err, jwtPayload) => {
        if (err) {
          reject(new NotAuthorized());
        }
        resolve(jwtPayload);
      });
    });
  }

  /**
   * Perform authentication process using auth provider (Passport)
   * @param req
   * @param strategy
   * @returns {Promise}
   */
  authenticate(req, strategy) {
    if (!(strategy && req && Object.keys(req) && Object.keys(req).length)) {
      throw new NotAuthorized('auth service failed to authenticate');
    }

    const self = this;
    return new Promise((resolve, reject) => {
      self.authProvider.authenticate(strategy, (err, user) => {
        if (err) {
          reject(new NotAuthorized());
        } else {
          if (user) {

            const accessToken = self.jwt.sign({ id: user._id }, self.config.jwt.secret, { expiresIn: 3600 });
            const refreshToken = self.jwt.sign({ id: user._id }, self.config.jwt.secret);

            return resolve({ accessToken, refreshToken, user });
          }
          return reject(new NotAuthorized());
        }
      })(req);
    });
  }

  /**
   * Verification function to decode and check incoming token
   * Token format - "TYPE long-hashed-token"
   * @param req
   * @param strategy
   * @returns {Promise.<TResult>}
   */
  async verifyToken(req) {
    const self = this;

    if (!req.headers.authorization) {
      throw new NotAuthorized();
    }

    const token = req.headers.authorization.split(' ')[1];
    // const tokenType = req.headers.authorization.split(' ')[0];
    const jwtPayload = await self._verifyToken(token);
    const user = await self.authEntities.User.findOne({ 'tokens.access_token': token }).select('+role');
    
    if (!user) {
      throw new NotAuthorized();
    }

    if (user._id.toString() === jwtPayload.id) {
      req.user = user;
      return user;
    }

    throw new NotAuthorized();
    
  }
};
