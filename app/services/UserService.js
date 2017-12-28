const MainService = require('./MainService');
const _ = require('lodash');
// const { DbService } = require(`${basePath}/app/services`);
// const UserModel     = DbService.models().User;

module.exports = class UserService extends MainService {
  constructor(userData) {
    super('User Service');

    const { CryptoService, DbService } = require(`${basePath}/app/services`);

    this._userProvider = DbService.models().User;
    this._userData = userData;
    this._EncodeService = CryptoService;
  }

  async create() {
    const self = this;

    if (!self._userData.password) {
      self._userData.password = self._EncodeService.getRandomString(4);
    }

    const encodeProvider = new self._EncodeService();
    self._userData.password = await encodeProvider.encode(self._userData.password);

    return new self._userProvider(self._userData).save();
  }

  remove() {
    return this._userData.remove();
  }

  async update(updateData) {
    const updatedUser = _.mergeWith(this._userData, updateData);
    return updatedUser.save();
  }

  async changePassword(newPassword) {
    const encodeProvider = new this._EncodeService();
    this._userData.password = await encodeProvider.encode(newPassword);
    return this._userData.save();
  }
};
