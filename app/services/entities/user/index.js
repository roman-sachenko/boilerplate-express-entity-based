'use strict';

const MainService = require('../main');
const _           = require('lodash');

module.exports = class UserService extends MainService {
  constructor(userData) {
    super('User Service');
    
    const { CryptoService, DbService } = require(`${basePath}/app/services`);

    this._userProvider  = DbService.models()['User'];
    this._userData      = userData;
    this._encodeService = new CryptoService();
  }

  create() {
    let self = this;
    return self._encodeService
      .encode(self._userData.password)
      .then((encryptedPassword) => {
        self._userData.password = encryptedPassword;
        return new self._userProvider(self._userData).save();
      })
  }

  remove() {
    return this._userData.remove();
  }

  update(updateData) {
    const updatedUser = _.mergeWith(this._userData, updateData);
    return updatedUser.save();
  }

  updateActiveStatus(isActive) {
    if(!this._userData.statuses) {
      this._userData.statuses = {};
    }
    this._userData.statuses.is_active = isActive;
    return this._userData;
  }

  changePassword(newPassword) {
    const self = this;
    return self._encodeService
      .encode(newPassword)
      .then((encryptedPassword) => {
        self._userData.password = encryptedPassword;
        return self._userData;
      });
  }
};
