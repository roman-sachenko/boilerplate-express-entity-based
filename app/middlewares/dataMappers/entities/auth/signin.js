'use strict';

const mainMapper = require('../../main');

module.exports = {
  signin: async (req, res, next) => {
    delete req.user.password;
    mainMapper.setEntities(req, { userData: req.user });
    return next();
  }
};