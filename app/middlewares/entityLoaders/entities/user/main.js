'use strict';

const MainLoader    = require('../../main');
const { DbService } = require(`${basePath}/app/services/`);
const { NotFound }  = require(`${basePath}/app/utils/apiErrors`);
const mainHelper    = require(`${basePath}/app/helpers`);
const UserModel     = DbService.models().User;



module.exports = {
  createOne: (req, res, next) => {
    next();
  },

  updateOne: (req, res, next) => {

    UserModel
    .findOne({ _id: req.params.userId })
    .then(isUserObjectValid)
    .then((userFound => {
      MainLoader.setEntities(req, { user: userFound });
      return next();
    }))
    .catch((err) => {
      next(err);
    });

  },

  getOne: (req, res, next) => {

    UserModel
    .findOne({ _id: req.params.userId })
    .lean()
    .then(isUserObjectValid)
    .then((userFound => {
      MainLoader.setEntities(req, { user: userFound });
      return next();
    }))
    .catch((err) => {
      next(err);
    });

  },

  getAll: (req, res, next) => {

    UserModel
    .find({})
    .lean()
    .then((usersFound => {
      MainLoader.setEntities(req, { users: usersFound });
      next();
    }))
    .catch((err) => {
      next(err);
    });

  },

  deleteOne: (req, res, next) => {

    UserModel
    .findOne({ _id: req.params.userId })
    .select('_id')
    .then(isUserObjectValid)
    .then((userFound => {
      MainLoader.setEntities(req, { user: userFound });
      return next();
    }))
    .catch((err) => {
      next(err);
    });
  },

  deleteMultiple: (req, res, next) => {
    next();
  }
};

function isUserObjectValid(user) {
  if(mainHelper.isObjectValid(user)) {
    return user
  }
  throw new NotFound('user not found');
}
