const UserService = require(`${basePath}/app/services/UserService`);
const config = require(`${basePath}/config/app/`).auth;
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
  constructor() {
    if (!instance) {
      super('Auth Service');
      this._setService();
      instance = this;
    }
    return instance;
  }

  static signOut(user) {
    const userModel = new UserService(user);
    return userModel.update({
      tokens: {
        access_token: null,
        refresh_token: null,
      },
    });
  }

  _setService() {
    this._authProvider = passport;
    this._tokenTypes = tokenTypes;
    this._jwt = jwt;
    this._authEntities = UserService;
    this._authStrategies = authStrategies;
    this._config = config;
  }

  _getStrategies() {
    return this.authStrategies;
  }

  _getConfig() {
    return this._config;
  }

  _getAuthProvider() {
    return this._authProvider;
  }

  _getJwdProvider() {
    return this._jwt;
  }

  _getAuthEntities() {
    return this._authEntities;
  }

  _getTokenTypes() {
    return this._tokenTypes;
  }

  static getStrategies() {
    return authStrategies;
  }

  /**
   * Internal (Private) function to check incoming token
   * @param token
   * @returns {Promise}
   * @private
   */
  async _validateToken(token) {
    const self = this;
    return new Promise((resolve, reject) => {
      return self._getJwdProvider().verify(token, self._getConfig().jwt.secret, (err, jwtPayload) => {
        if (err) {
          reject(new NotAuthorized());
        }
        resolve(jwtPayload);
      });
    });
  }


  /**
  * Verification function to decode and check incoming token
  * Token format - "TYPE long-hashed-token"
  * @param req
  * @param strategy
  * @returns {Promise.<TResult>}
  */
  async _verifyToken(req, tokenType) {
    const self = this;

    if (!req.headers.authorization) {
      throw new NotAuthorized();
    }

    const token = req.headers.authorization.split(' ')[1];
    const jwtPayload = await self._validateToken(token);

    let userSearchQuery = { _id: jwtPayload.id };

    if (tokenType === self._getTokenTypes().REFRESH_TOKEN) {
      userSearchQuery = { 'tokens.refresh_token': token };
    }

    const user = await self._getAuthEntities().findOne(userSearchQuery, '+role +tokens.refresh_token');
    
    if (!(user && user.tokens.refresh_token)) {
      throw new NotAuthorized();
    }

    if (user._id.toString() === jwtPayload.id) {
      req.user = user;
      return user;
    }

    throw new NotAuthorized();

  }

  _authenticate(req, strategy) {
    const self = this;

    return new Promise((resolve, reject) => {

      if (!(strategy && req && Object.keys(req) && Object.keys(req).length)) {
        return reject(new NotAuthorized('auth service failed to authenticate'));
      }

      return self._getAuthProvider().authenticate(strategy, (err, user) => {
        if (user) {
          return resolve(user);
        }
        return reject(new NotAuthorized());
      })(req);
    });
  }

  async verifyAccessToken(req) {
    return this._verifyToken(req, this._getTokenTypes().ACCESS_TOKEN);
  }

  async verifyRefreshToken(req) {
    return this._verifyToken(req, this._getTokenTypes().REFRESH_TOKEN);
  }

  async refreshToken(user) {
    const self = this;
    const accessToken = self._getJwdProvider().sign({ id: user._id }, self._getConfig().jwt.secret, { expiresIn: 3600 });
    const refreshToken = self._getJwdProvider().sign({ id: user._id }, self._getConfig().jwt.secret);

    const UserServiceProvider = self._getAuthEntities();
    const userServiceProvider = new UserServiceProvider(user);

    await userServiceProvider.update({
      tokens: {
        refresh_token: refreshToken,
      },
    });

    return { accessToken, refreshToken };
  }

  /**
   * Perform authentication process using auth provider (Passport)
   * @param req
   * @param strategy
   * @returns {Promise}
   */
  async authenticate(req, strategy) {
    const self = this;
    const user = await self._authenticate(req, strategy);
    const accessToken = self._getJwdProvider().sign({ id: user._id }, self._getConfig().jwt.secret, { expiresIn: 3600 });
    const refreshToken = self._getJwdProvider().sign({ id: user._id }, self._getConfig().jwt.secret);

    const UserServiceProvider = self._getAuthEntities();
    const userServiceProvider = new UserServiceProvider(user);

    const updatedUser = await userServiceProvider.update({
      tokens: {
        refresh_token: refreshToken,
      },
    });

    const mappedUser = updatedUser.toObject();

    delete mappedUser.tokens;
    delete mappedUser.password;

    return { accessToken, refreshToken, user: mappedUser };
  }

};
