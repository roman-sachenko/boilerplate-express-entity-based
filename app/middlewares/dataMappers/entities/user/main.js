'use strict';

const { EntityLoaderService } = require(`${basePath}/app/services`);

module.exports = {
  createOne(req, res, next) {

  },

  updateOne(req, res, next) {
    if(!(req.body.password && req.body.confirm_password)) {
      delete req.body.password;
      delete req.body.confirm_password;
    }
    return next();
  },

  getOne(req, res, next) {
    return next();
  },

  getAll(req, res, next) {
    return next();
  },

  deleteOne(req, res, next) {

  },

  deleteMultiple(req, res, next) {

  }
};