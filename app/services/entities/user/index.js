'use strict';

const MainService         = require('../main');
const services            = require(`${basePath}/app/services`);

module.exports = class UserService extends MainService {
  constructor(userData) {
    super('User Service');
    let CryptoService     = require(`${basePath}/app/services`).CRYPTO;
    this._userProvider    = require(`${basePath}/app/services`).DB_SERVICE.models()['User'];
    this._userData        = userData;
    this._encodeService   = new CryptoService();
  }

  create() {
    let self = this;
    return self._encodeService
      .encode(self._userData.password)
      .then((encryptedPassword) => {
        self._userData.password = encryptedPassword;
        return new self._userProvider(self._userData);
      })
  }

  remove() {
    return this._userData.remove();
  }

  update(updateData) {
    let self = this;
    return self._userProvider.findOneAndUpdate(self._userData, updateData, { "new": true });
  }

  updateActiveStatus(isActive) {
    if(!this._userData.statuses) {
      this._userData.statuses = {};
    }
    this._userData.statuses.is_active = isActive;
    return this._userData;
  }

  changePassword(newPassword) {
    let self = this;
    return self._encodeService
      .encode(newPassword)
      .then((encryptedPassword) => {
        self._userData.password = encryptedPassword;
        return self._userData;
      });
  }
};
