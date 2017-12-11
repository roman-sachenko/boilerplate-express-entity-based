'use strict';

const MainService         = require('../main');
const bcrypt              = require('bcrypt');
const configDefault   = {
  saltRounds: 10
};

module.exports = class Crypto extends MainService {
  constructor(config) {
    super('Crypto Service');
    this.config   = config || configDefault;
    this.encoder  = bcrypt;
  }

  encode(inputString) {
    let self = this;

    return new Promise((resolve, reject) => {
      if(!inputString) {
        return reject(`${ self.name }: string to encode is not provided`);
      }
      resolve(self.encoder.hash(inputString, self.config.saltRounds))
    });
  }

  verifyPassword(passwordProvided, hashedPassword) {
    let self = this;
    return new Promise((resolve, reject) => {
      self.encoder.compare(passwordProvided, hashedPassword, (err, isMatch) => {
        if(err) {
          return reject(err);
        }
        resolve(isMatch);
      })
    });
  }
};