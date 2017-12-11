'use strict';

const mainAcl         = require('../main');
const { Forbidden }   = require(`${basePath}/app/utils/apiErrors`);

module.exports = {
  createOne: async (req, res, next) => {

  },

  updateOne: async (req, res, next) => {
    
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

  getOne: async (req, res, next) => {
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

  getAll: async (req, res, next) => {
    next();
  },

  deleteOne: async (req, res, next) => {

    const userIdRequested   = req.params.userId;
    const userIdCurrent     = req.user._id.toString();

    if(!(userIdRequested === userIdCurrent)) {
      return next();
    }

    next(new Forbidden('can\'t remove yourself'));
  },

  deleteMultiple: async (req, res, next) => {

  }
};