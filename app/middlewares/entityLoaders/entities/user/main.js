'use strict';

const MainLoader    = require('../../main');
const { DbService } = require(`${basePath}/app/services/`);
const { NotFound }  = require(`${basePath}/app/utils/apiErrors`);
const mainHelper    = require(`${basePath}/app/helpers`);
const UserModel     = DbService.models().User;



module.exports = {
  createOne: async (req, res, next) => {
    next();
  },

  updateOne: async (req, res, next) => {

    try {
      const userFound = await UserModel.findOne({ _id: req.params.userId });

      if(!mainHelper.isObjectValid(userFound)) {
        throw new NotFound('user not found');
      }

      MainLoader.setEntities(req, { user: userFound });
      return next();

    } catch(err) {
      return next(err);
    }

  },

  getOne: async (req, res, next) => {

    try {
      const userFound = await UserModel.findOne({ _id: req.params.userId }).lean();

      if(!mainHelper.isObjectValid(userFound)) {
        throw new NotFound('user not found');
      }

      MainLoader.setEntities(req, { user: userFound });
      return next();

    } catch(err) {
      return next(err);
    }
  },

  getAll: async (req, res, next) => {

    try {
      const usersFound = await UserModel.find({}).lean();

      if(!mainHelper.isObjectValid(usersFound)) {
        throw new NotFound('user not found');
      }

      MainLoader.setEntities(req, { users: usersFound });
      return next();

    } catch(err) {
      return next(err);
    }
  },

  deleteOne: async (req, res, next) => {

    try {
      const userFound = await UserModel.findOne({ _id: req.params.userId }).select('_id');

      if(!mainHelper.isObjectValid(userFound)) {
        throw new NotFound('user not found');
      }

      MainLoader.setEntities(req, { user: userFound });
      return next();

    } catch(err) {
      return next(err);
    }

  },

  deleteMultiple: async (req, res, next) => {
    next();
  }
};
