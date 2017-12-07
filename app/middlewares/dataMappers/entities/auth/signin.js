'use strict';

const mainMapper = require('../../main');

module.exports = {
  signin: (req, res, next) => {
    delete req.user.password;
    mainMapper.setEntities(req, { userData: req.user });
    next();
  }
};