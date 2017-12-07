'use strict';

const MainService           = require('../main');
const passport              = require('passport');
const jwt                   = require('jsonwebtoken');
const config                = require(`${basePath}/config/app/`);
const authStrategies        = require(`${basePath}/app/enums/`).AUTH.STRATEGIES;
const tokenTypes            = require(`${basePath}/app/enums/`).AUTH.TOKEN_TYPES;
const { NotAuthorized }     = require(`${basePath}/app/utils/apiErrors`);

let instance      = null;

/**
 * auth service using passport module
 */

module.exports = class AuthService extends MainService {
  constructor(authProvider, inputConfig) {
    if(!instance){
      super('Auth Service');
      const services = require(`${basePath}/app/services`);
      this.authProvider   = authProvider || passport;
      this.config         = inputConfig || config;
      this.tokenTypes     = tokenTypes;
      this.jwt            = jwt;
      this.authEntities   = services.DB_SERVICE.models();
      instance = this;
    }
    return instance;
  }

  static getStrategies() {
    return authStrategies;
  }

  _getStrategies() {
    return authStrategies;
  }

  /**
   * Internal (Private) function to check incoming token
   * @param token
   * @returns {Promise}
   * @private
   */
  _verifyToken(token) {
    let self = this;
    return new Promise((resolve, reject) => {
      return self.jwt.verify(token, self.config.jwt.secret, (err, jwt_payload) => {
        if (err) {
          reject(new NotAuthorized());
        }
        resolve(jwt_payload);
      })
    });
  }

  /**
   * Perform authentication process using auth provider (Passport)
   * @param req
   * @param strategy
   * @returns {Promise}
   */
  authenticate(req, strategy) {
    if(!(strategy && req && Object.keys(req) && Object.keys(req).length)) {
      throw new NotAuthorized('auth service failed to authenticate');
    }

    let self = this;
    return new Promise((resolve, reject) => {
      self.authProvider.authenticate(strategy, (err, user) => {
        if (err) {
          reject(err);
        } else {
          if (user) {
            const token = self.jwt.sign({ id: user._id }, self.config.jwt.secret);
            resolve({ token: token, user: user });
          } else {
            reject(new NotAuthorized('Login info incorrect'));
          }
        }
      })(req);
    })
  }

  /**
   * Verification function to decode and check incoming token
   * Token format - "TYPE long-hashed-token"
   * @param req
   * @param strategy
   * @returns {Promise.<TResult>}
   */
  verifyToken(req, strategy) {
    let self = this;

    if(!req.headers.authorization) {
      throw new NotAuthorized();
    }

    const token       = req.headers.authorization.split(' ')[1];
    const tokenType   = req.headers.authorization.split(' ')[0];

    // let { tokenType, token } = req.headers.authorization.split(' ');


    return self._verifyToken(token)
      .then((jwt_payload) => {
        //TODO: add statements according to token types
        // if(self.tokenTypes.REGULAR === tokenType ) {}
        // if(self.tokenTypes.FACEBOOK === tokenType ) {}
        // or switch

        return self.authEntities['User'].findOne({ _id: jwt_payload.id }).select('+role')
      })
      .then(user => {
        if (user) {
          req.user = user;
          return user;
        } else {
          throw new NotAuthorized();
        }
      });
  }
};

