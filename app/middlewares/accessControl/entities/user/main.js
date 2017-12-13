'use strict';

const mainAcl         = require('../main');
const { Forbidden }   = require(`${basePath}/app/utils/apiErrors`);

module.exports = {
  async createOne(req, res, next) {

  },

  async updateOne(req, res, next) {
    
    if(mainAcl.isAdmin(req.user)) {

      return next();
    }

    const userIdRequested   = req.params.userId;
    const userIdCurrent     = req.user._id.toString();

    if(userIdRequested === userIdCurrent) {
      return next();
    }

    next(new Forbidden());
  },

  async getOne(req, res, next) {
    if(mainAcl.isAdmin(req.user)) {
      return next();
    }

    const userIdRequested   = req.params.userId;
    const userIdCurrent     = req.user._id.toString();

    if(userIdRequested === userIdCurrent) {
      return next();
    }

    next(new Forbidden());
  },

  async getAll(req, res, next) {
    next();
  },

  async deleteOne(req, res, next) {

    const userIdRequested   = req.params.userId;
    const userIdCurrent     = req.user._id.toString();

    if(!(userIdRequested === userIdCurrent)) {
      return next();
    }

    next(new Forbidden('can\'t remove yourself'));
  },

  async deleteMultiple(req, res, next) {

  }
};