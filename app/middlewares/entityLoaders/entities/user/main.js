'use strict';

const services    = require(`${basePath}/app/services/`);
const DbService   = services.DB_SERVICE;


module.exports = {
  createOne: (req, res, next) => {
    next();
  },

  updateOne: (req, res, next) => {
    next();
  },

  getOne: (req, res, next) => {
    next();
  },

  getAll: (req, res, next) => {
    next();
  },

  deleteOne: (req, res, next) => {
    next();
  },

  deleteMultiple: (req, res, next) => {
    next();
  }
};