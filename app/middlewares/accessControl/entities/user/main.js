'use strict';

const mainAcl         = require('../main');
const { Forbidden }   = require(`${basePath}/app/utils/apiErrors`);

module.exports = {
  createOne: (req, res, next) => {

  },

  updateOne: (req, res, next) => {
    
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

  getOne: (req, res, next) => {
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

  getAll: (req, res, next) => {
    next();
  },

  deleteOne: (req, res, next) => {

    const userIdRequested   = req.params.userId;
    const userIdCurrent     = req.user._id.toString();

    if(!(userIdRequested === userIdCurrent)) {
      return next();
    }

    next(new Forbidden('can\'t remove yourself'));
  },

  deleteMultiple: (req, res, next) => {

  }
};