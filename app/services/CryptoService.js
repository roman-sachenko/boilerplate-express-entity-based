const MainService = require('./MainService');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const configDefault = {
  saltRounds: 10,
};

module.exports = class Crypto extends MainService {
  constructor(config) {
    super('Crypto Service');
    this.config = config || configDefault;
    this.encoder = bcrypt;
  }

  static getRandomString(bytes) {
    return crypto.randomBytes(bytes).toString('hex');
  }

  async encode(inputString) {
    if (!inputString) {
      throw ((`${this.name}: string to encode is not provided`).toString());
    }

    return this.encoder.hash(inputString, this.config.saltRounds);
  }

  async verifyPassword(passwordProvided, hashedPassword) {
    return this.encoder.compare(passwordProvided, hashedPassword);
  }
};
