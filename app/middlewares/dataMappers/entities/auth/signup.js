'use strict';

const mainMapper    = require('../../main');
const services      = require(`${basePath}/app/services`);

module.exports = {
  regular: (req, res, next) => {
    delete req.body.role;
    mainMapper.setEntities(req, { signUpData: req.body });
    next();
  }
};